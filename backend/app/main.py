"""
GearGuard Backend - Main Application Entry Point
FastAPI application configuration and startup.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
import logging
import sys
import uuid
import os
from app.config import settings
from app.database import init_database, close_database, get_database, Database
from app.api.v1.router import api_router
from app.core.exceptions import GearGuardException, to_http_exception

# ===========================================
# Logging Configuration
# ===========================================

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ]
)

logger = logging.getLogger(__name__)
print("Debug log : ", os.environ.get('DEBUG', 'not set'))

# ===========================================
# Super Admin Creation
# ===========================================

async def create_super_admin_if_not_exists(db: Database) -> None:
    """Create super admin user if it doesn't exist."""
    from passlib.context import CryptContext
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    # Check if super admin email is configured
    if not settings.SUPER_ADMIN_EMAIL or not settings.SUPER_ADMIN_PASSWORD:
        logger.info("Super admin credentials not configured, skipping creation")
        return
    
    # Check if super admin already exists
    result = db.fetch_one(
        "SELECT id FROM users WHERE email = ?",
        (settings.SUPER_ADMIN_EMAIL,)
    )
    
    if result:
        logger.info(f"Super admin user already exists: {settings.SUPER_ADMIN_EMAIL}")
        return
    
    # Create default organization for super admin if it doesn't exist
    org_id = "org_system"
    org_result = db.fetch_one(
        "SELECT id FROM organizations WHERE id = ?",
        (org_id,)
    )
    
    if not org_result:
        logger.info("Creating system organization for super admin...")
        db.execute(
            """
            INSERT INTO organizations (id, name, slug, is_active)
            VALUES (?, ?, ?, ?)
            """,
            (org_id, "System", "system", True)
        )
        logger.info("System organization created")
    
    # Create super admin user
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    password_hash = pwd_context.hash(settings.SUPER_ADMIN_PASSWORD)
    
    logger.info(f"Creating super admin user: {settings.SUPER_ADMIN_EMAIL}")
    db.execute(
        """
        INSERT INTO users (
            id, email, password_hash, first_name, last_name,
            role_id, organization_id, is_active, is_verified
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            user_id,
            settings.SUPER_ADMIN_EMAIL,
            password_hash,
            "Super",
            "Admin",
            "role_super_admin",
            org_id,
            True,
            True
        )
    )
    
    logger.info(f"Super admin user created successfully: {settings.SUPER_ADMIN_EMAIL}")


# ===========================================
# Application Lifespan
# ===========================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Handles startup and shutdown events.
    """
    # Startup
    logger.info("Starting GearGuard Backend...")
    
    try:
        # Initialize database connection
        db = init_database()
        logger.info("Database connection established")
        
        # Run migrations (in development, or when RUN_MIGRATIONS is set for first deploy)
        import os
        run_migrations = settings.is_development or os.getenv("RUN_MIGRATIONS", "").lower() == "true"
        if run_migrations:
            try:
                db.run_migrations("migrations")
                logger.info("Database migrations completed")
            except Exception as e:
                # Don't block startup on migration failures - tables may already exist
                logger.warning(f"Migration skipped or failed (this may be OK if tables already exist): {e}")
        
        # Create super admin user if it doesn't exist
        try:
            await create_super_admin_if_not_exists(db)
        except Exception as e:
            logger.warning(f"Super admin creation skipped or failed: {e}")
        
        logger.info(f"GearGuard Backend started successfully in {settings.APP_ENV} mode")
        
        yield
        
    finally:
        # Shutdown
        logger.info("Shutting down GearGuard Backend...")
        close_database()
        logger.info("Database connection closed")
        logger.info("GearGuard Backend shutdown complete")


# ===========================================
# FastAPI Application
# ===========================================

app = FastAPI(
    title="GearGuard API",
    description="""
    ## 🛡️ GearGuard - The Ultimate Maintenance Tracker
    
    A comprehensive backend API for managing equipment maintenance, work orders, 
    and team operations with role-based access control.
    
    ### Features
    - **Equipment Management**: Track all your equipment and assets
    - **Work Orders**: Create and manage maintenance work orders
    - **Preventive Maintenance**: Schedule recurring maintenance tasks
    - **Parts Inventory**: Manage spare parts and track usage
    - **Team Management**: Organize technicians into teams
    - **Reports & Analytics**: Generate insights and performance metrics
    - **Role-Based Access**: Secure access with granular permissions
    
    ### Authentication
    All endpoints (except auth) require a valid JWT Bearer token.
    Include the token in the Authorization header: `Bearer <token>`
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)


# ===========================================
# CORS Middleware
# ===========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Total-Count", "X-Page", "X-Page-Size"],
)


# ===========================================
# Exception Handlers
# ===========================================

@app.exception_handler(GearGuardException)
async def gearguard_exception_handler(request: Request, exc: GearGuardException):
    """Handle custom GearGuard exceptions."""
    http_exc = to_http_exception(exc)
    return JSONResponse(
        status_code=http_exc.status_code,
        content=http_exc.detail,
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic validation errors."""
    errors = []
    for error in exc.errors():
        errors.append({
            "field": ".".join(str(loc) for loc in error["loc"]),
            "message": error["msg"],
            "type": error["type"],
        })
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "message": "Validation error",
            "code": "VALIDATION_ERROR",
            "details": {"errors": errors}
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.exception(f"Unhandled exception: {exc}")
    
    if settings.is_development:
        # Include error details in development
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(exc),
                "code": "INTERNAL_ERROR",
                "details": {"type": type(exc).__name__}
            },
        )
    else:
        # Generic error in production
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": "An unexpected error occurred",
                "code": "INTERNAL_ERROR",
                "details": {}
            },
        )


# ===========================================
# API Routes
# ===========================================

# Include versioned API router
app.include_router(api_router, prefix="/api/v1")


# ===========================================
# Health & Info Endpoints
# ===========================================

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "name": settings.APP_NAME,
        "version": "1.0.0",
        "description": "The Ultimate Maintenance Tracker API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    # Check database connection
    db_healthy = False
    try:
        db = get_database()
        db.execute("SELECT 1")
        db_healthy = True
    except Exception as e:
        logger.error(f"Health check - Database unhealthy: {e}")
    
    status_code = status.HTTP_200_OK if db_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
    
    return JSONResponse(
        status_code=status_code,
        content={
            "status": "healthy" if db_healthy else "unhealthy",
            "version": "1.0.0",
            "environment": settings.APP_ENV,
            "checks": {
                "database": "ok" if db_healthy else "error",
            }
        }
    )


@app.get("/ready", tags=["Health"])
async def readiness_check():
    """
    Readiness check for Kubernetes/container orchestration.
    """
    return {"status": "ready"}


# ===========================================
# Serverless Handler (Vercel/AWS Lambda)
# ===========================================

try:
    from mangum import Mangum
    handler = Mangum(app, lifespan="off")
except ImportError:
    # Mangum not available, running locally
    handler = None
