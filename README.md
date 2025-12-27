# GearGuard - Intelligent Maintenance Management System

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black.svg)](https://nextjs.org)
[![Turso](https://img.shields.io/badge/Database-Turso-purple.svg)](https://turso.tech)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org)

A comprehensive equipment maintenance management platform that connects equipment, teams, and maintenance workflows in one unified system. Built with a modern tech stack featuring FastAPI backend and Next.js frontend.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Role-Based Access Control](#role-based-access-control)
- [Authentication](#authentication)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [Team](#team)

---

## Overview

**GearGuard** is designed to solve common maintenance management challenges:
- Lost maintenance requests scattered across emails and spreadsheets
- Lack of real-time visibility into asset health and history
- Unplanned downtime due to reactive maintenance approaches
- Poor coordination between maintenance teams and technicians

The platform provides organizations with tools to:
- Track and manage all equipment and machinery
- Create, assign, and monitor work orders through their lifecycle
- Schedule preventive maintenance with automatic reminders
- Manage spare parts inventory with low stock alerts
- Generate reports and analytics for data-driven decisions
- Control access with granular role-based permissions

---

## Key Features

### Equipment Management
- Central asset database with full equipment profiles
- Track by department, location, or assigned employee
- Warranty tracking, specifications, and documentation
- Health score monitoring (0-100%)
- QR code generation for easy equipment identification
- Equipment categorization with hierarchical categories

### Work Order Management
- Four work order types: Preventive, Corrective, Emergency, Inspection
- Complete status workflow: Pending → In Progress → On Hold → Completed/Cancelled
- Priority levels: Low, Medium, High, Critical
- Task breakdown with individual task tracking
- Comments and attachments for communication
- Parts usage tracking per work order

### Preventive Maintenance Scheduling
- Frequency options: Daily, Weekly, Monthly, Yearly, Meter-based, Custom
- Automatic work order generation from schedules
- Overdue maintenance alerts and notifications
- Checklist templates for standardized procedures

### Team Management
- Create specialized teams (Mechanics, Electricians, IT, etc.)
- Automatic assignment based on equipment category
- Team leader designation and member management
- Workload visibility across team members

### Parts Inventory
- Complete spare parts catalog with specifications
- Stock level tracking with minimum stock alerts
- Usage history tied to work orders
- Equipment-to-parts associations

### Reports & Analytics
- Dashboard with real-time KPIs
- Equipment health reports
- Work order summary and completion rates
- Maintenance cost analysis
- Technician performance metrics
- Downtime analysis
- Export to PDF/Excel

### Calendar & Kanban Views
- Visual calendar for maintenance scheduling
- Drag-and-drop Kanban board for work orders
- Click-to-add maintenance jobs
- Overdue visual indicators

---

## Technology Stack

### Backend

| Component | Technology |
|-----------|------------|
| Framework | FastAPI (Python 3.11+) |
| Database | Turso (LibSQL - SQLite-compatible distributed database) |
| Authentication | JWT with access and refresh tokens |
| Password Hashing | bcrypt (via passlib) |
| Validation | Pydantic v2 |
| API Documentation | OpenAPI/Swagger (auto-generated) |

### Frontend

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1 (React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | Headless UI, Lucide Icons |
| Drag & Drop | dnd-kit |
| Forms | React Hook Form |

---

## Project Structure

```
GearGuard/
├── backend/GG/                   # Backend (FastAPI)
│   ├── backend/
│   │   ├── app/
│   │   │   ├── main.py           # FastAPI entry point
│   │   │   ├── config.py         # Configuration settings
│   │   │   ├── database.py       # Turso connection
│   │   │   ├── api/v1/           # API endpoints
│   │   │   │   ├── auth.py       # Authentication
│   │   │   │   ├── users.py      # User management
│   │   │   │   ├── equipment.py  # Equipment CRUD
│   │   │   │   ├── workorders.py # Work order management
│   │   │   │   ├── schedules.py  # Maintenance schedules
│   │   │   │   ├── parts.py      # Parts inventory
│   │   │   │   ├── locations.py  # Location management
│   │   │   │   ├── teams.py      # Team management
│   │   │   │   ├── reports.py    # Reports & analytics
│   │   │   │   └── ...
│   │   │   ├── core/             # Security & permissions
│   │   │   │   ├── security.py   # JWT handling, password hashing
│   │   │   │   └── permissions.py # RBAC implementation
│   │   │   ├── models/           # Database models
│   │   │   ├── schemas/          # Pydantic schemas
│   │   │   ├── services/         # Business logic
│   │   │   └── repositories/     # Database access layer
│   │   ├── migrations/           # Database schema files
│   │   ├── tests/                # Unit & integration tests
│   │   ├── .env.example          # Environment template
│   │   └── requirements.txt      # Python dependencies
│   ├── ARCHITECTURE.md           # Technical documentation
│   ├── TEAM_REFERENCE.md         # Quick reference guide
│   └── requirements.txt          # Root dependencies
│
├── frontend/                     # Frontend (Next.js)
│   ├── app/
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── equipment/        # Equipment management pages
│   │   │   ├── work-orders/      # Work order pages
│   │   │   ├── schedules/        # Maintenance scheduling
│   │   │   ├── parts/            # Parts inventory
│   │   │   └── locations/        # Location management
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── sign-up/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── lib/
│   │   │   ├── api/              # API client & configuration
│   │   │   ├── auth/             # Auth context & helpers
│   │   │   └── hooks/            # Custom React hooks
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── public/                   # Static assets
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python 3.11+** (for backend)
- **Node.js 18+** (for frontend)
- **Turso account** (free tier available at https://turso.tech)
- **Git**

### Backend Setup

```bash
# Navigate to project root
cd GearGuard

# Clone if you haven't already
git clone https://github.com/Ansh-Chamriya/GG.git
cd GG

# Navigate to backend directory
cd backend/GG/backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate      # Windows
source venv/bin/activate     # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env       # Windows
cp .env.example .env         # Linux/Mac
# Edit .env with your Turso credentials and configuration

# Run database migrations
python run_migrations.py

# Start the development server
uvicorn app.main:app --reload --port 8000
```

Access points:
- **API**: http://localhost:8000
- **API Documentation (Swagger)**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start development server
npm run dev
```

Access the application at: http://localhost:3000

---

## Database Schema

The system uses **27 tables** organized into logical domains:

### Authentication & Users
| Table | Description |
|-------|-------------|
| `users` | User accounts with profiles and credentials |
| `roles` | Role definitions (super_admin, admin, manager, technician, operator, viewer) |
| `permissions` | Permission definitions in resource:action format |
| `role_permissions` | Role-to-permission mappings |
| `sessions` | Active user sessions for JWT refresh token management |
| `password_reset_tokens` | Password recovery tokens |

### Organization & Locations
| Table | Description |
|-------|-------------|
| `organizations` | Multi-tenant organization data |
| `locations` | Hierarchical facility/site locations (site → building → floor → room → area) |
| `teams` | Technician team definitions |
| `team_members` | Team membership |

### Equipment
| Table | Description |
|-------|-------------|
| `equipment` | Main equipment/asset records |
| `equipment_categories` | Hierarchical equipment classification |
| `meter_readings` | Equipment meter/usage tracking |
| `equipment_parts` | Equipment-to-parts associations |
| `maintenance_history` | Equipment maintenance log |

### Maintenance
| Table | Description |
|-------|-------------|
| `maintenance_schedules` | Preventive maintenance schedules |
| `checklist_templates` | Reusable maintenance checklists |

### Work Orders
| Table | Description |
|-------|-------------|
| `work_orders` | Work order management |
| `work_order_tasks` | Task breakdown for work orders |
| `work_order_comments` | Communication on work orders |
| `work_order_checklists` | Completed checklist responses |

### Inventory
| Table | Description |
|-------|-------------|
| `parts_inventory` | Spare parts catalog |
| `parts_usage` | Parts consumption tracking |

### System
| Table | Description |
|-------|-------------|
| `notifications` | User notifications |
| `audit_logs` | System audit trail |
| `reports` | Saved report configurations |
| `dashboards` | Custom dashboard layouts |

---

## API Reference

The API is organized into logical groups with RESTful endpoints. All endpoints are prefixed with `/api/v1/`.

### Authentication (10 endpoints)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | No |
| `POST` | `/auth/login` | User login, returns JWT tokens | No |
| `POST` | `/auth/logout` | Invalidate session | Yes |
| `POST` | `/auth/refresh` | Refresh access token | Yes (Refresh Token) |
| `POST` | `/auth/forgot-password` | Request password reset email | No |
| `POST` | `/auth/reset-password` | Reset password with token | No |
| `GET` | `/auth/verify-email/{token}` | Verify email address | No |
| `GET` | `/auth/me` | Get current user profile | Yes |
| `PUT` | `/auth/me` | Update current user profile | Yes |
| `PUT` | `/auth/me/password` | Change password | Yes |

### Organizations (6 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/organizations` | Create organization | `organization:create` |
| `GET` | `/organizations` | List organizations | `organization:read` |
| `GET` | `/organizations/{id}` | Get organization details | `organization:read` |
| `PUT` | `/organizations/{id}` | Update organization | `organization:update` |
| `DELETE` | `/organizations/{id}` | Delete organization | `organization:delete` |
| `GET` | `/organizations/{id}/stats` | Get organization statistics | `organization:read` |

### Users (8 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/users` | Create user | `user:create` |
| `GET` | `/users` | List users (with filters) | `user:read` |
| `GET` | `/users/{id}` | Get user details | `user:read` |
| `PUT` | `/users/{id}` | Update user | `user:update` |
| `DELETE` | `/users/{id}` | Delete/deactivate user | `user:delete` |
| `PUT` | `/users/{id}/role` | Change user role | `user:manage_roles` |
| `GET` | `/users/{id}/workorders` | Get user's work orders | `user:read` |
| `GET` | `/users/{id}/activity` | Get user activity log | `user:read` |

### Locations (6 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/locations` | Create location | `equipment:create` |
| `GET` | `/locations` | List locations | `equipment:read` |
| `GET` | `/locations/{id}` | Get location details | `equipment:read` |
| `PUT` | `/locations/{id}` | Update location | `equipment:update` |
| `DELETE` | `/locations/{id}` | Delete location | `equipment:delete` |
| `GET` | `/locations/{id}/equipment` | Get equipment at location | `equipment:read` |

### Equipment (13 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/equipment` | Create equipment | `equipment:create` |
| `GET` | `/equipment` | List equipment (with filters) | `equipment:read` |
| `GET` | `/equipment/{id}` | Get equipment details | `equipment:read` |
| `PUT` | `/equipment/{id}` | Update equipment | `equipment:update` |
| `DELETE` | `/equipment/{id}` | Delete equipment | `equipment:delete` |
| `GET` | `/equipment/{id}/history` | Get maintenance history | `equipment:read` |
| `GET` | `/equipment/{id}/workorders` | Get related work orders | `workorder:read` |
| `GET` | `/equipment/{id}/schedules` | Get maintenance schedules | `schedule:read` |
| `GET` | `/equipment/{id}/parts` | Get associated parts | `parts:read` |
| `POST` | `/equipment/{id}/meter-reading` | Add meter reading | `equipment:update` |
| `GET` | `/equipment/{id}/meter-readings` | Get meter readings | `equipment:read` |
| `POST` | `/equipment/{id}/report-issue` | Report equipment issue | `equipment:report_issue` |
| `GET` | `/equipment/{id}/qr` | Generate QR code | `equipment:read` |

### Equipment Categories (5 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/categories` | Create category | `equipment:create` |
| `GET` | `/categories` | List categories | `equipment:read` |
| `GET` | `/categories/{id}` | Get category details | `equipment:read` |
| `PUT` | `/categories/{id}` | Update category | `equipment:update` |
| `DELETE` | `/categories/{id}` | Delete category | `equipment:delete` |

### Maintenance Schedules (8 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/schedules` | Create schedule | `schedule:create` |
| `GET` | `/schedules` | List schedules | `schedule:read` |
| `GET` | `/schedules/{id}` | Get schedule details | `schedule:read` |
| `PUT` | `/schedules/{id}` | Update schedule | `schedule:update` |
| `DELETE` | `/schedules/{id}` | Delete schedule | `schedule:delete` |
| `POST` | `/schedules/{id}/generate-workorder` | Generate work order from schedule | `workorder:create` |
| `GET` | `/schedules/upcoming` | Get upcoming maintenance | `schedule:read` |
| `GET` | `/schedules/overdue` | Get overdue maintenance | `schedule:read` |

### Work Orders (18 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/workorders` | Create work order | `workorder:create` |
| `GET` | `/workorders` | List work orders (with filters) | `workorder:read` |
| `GET` | `/workorders/{id}` | Get work order details | `workorder:read` |
| `PUT` | `/workorders/{id}` | Update work order | `workorder:update` |
| `DELETE` | `/workorders/{id}` | Delete work order | `workorder:delete` |
| `PUT` | `/workorders/{id}/status` | Update status | `workorder:update` |
| `PUT` | `/workorders/{id}/assign` | Assign work order | `workorder:assign` |
| `POST` | `/workorders/{id}/start` | Start work order | `workorder:update` |
| `POST` | `/workorders/{id}/complete` | Complete work order | `workorder:complete` |
| `POST` | `/workorders/{id}/hold` | Put on hold | `workorder:update` |
| `POST` | `/workorders/{id}/cancel` | Cancel work order | `workorder:update` |
| `GET` | `/workorders/{id}/tasks` | Get tasks | `workorder:read` |
| `PUT` | `/workorders/{id}/tasks/{task_id}` | Update task | `workorder:update` |
| `GET` | `/workorders/{id}/comments` | Get comments | `workorder:read` |
| `POST` | `/workorders/{id}/comments` | Add comment | `workorder:update` |
| `POST` | `/workorders/{id}/parts` | Add parts used | `parts:use` |
| `GET` | `/workorders/{id}/checklist` | Get checklist | `workorder:read` |
| `PUT` | `/workorders/{id}/checklist` | Update checklist | `workorder:update` |

### Teams (8 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/teams` | Create team | `user:manage_roles` |
| `GET` | `/teams` | List teams | `user:read` |
| `GET` | `/teams/{id}` | Get team details | `user:read` |
| `PUT` | `/teams/{id}` | Update team | `user:manage_roles` |
| `DELETE` | `/teams/{id}` | Delete team | `user:manage_roles` |
| `POST` | `/teams/{id}/members` | Add team member | `user:manage_roles` |
| `DELETE` | `/teams/{id}/members/{user_id}` | Remove member | `user:manage_roles` |
| `GET` | `/teams/{id}/workorders` | Get team's work orders | `workorder:read` |

### Parts Inventory (9 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/parts` | Create part | `parts:create` |
| `GET` | `/parts` | List parts (with filters) | `parts:read` |
| `GET` | `/parts/{id}` | Get part details | `parts:read` |
| `PUT` | `/parts/{id}` | Update part | `parts:update` |
| `DELETE` | `/parts/{id}` | Delete part | `parts:delete` |
| `POST` | `/parts/{id}/adjust-stock` | Adjust stock level | `parts:update` |
| `GET` | `/parts/{id}/usage-history` | Get usage history | `parts:read` |
| `GET` | `/parts/low-stock` | Get low stock alerts | `parts:read` |
| `POST` | `/parts/{id}/equipment` | Link part to equipment | `parts:update` |

### Checklist Templates (5 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `POST` | `/checklists` | Create template | `schedule:create` |
| `GET` | `/checklists` | List templates | `schedule:read` |
| `GET` | `/checklists/{id}` | Get template details | `schedule:read` |
| `PUT` | `/checklists/{id}` | Update template | `schedule:update` |
| `DELETE` | `/checklists/{id}` | Delete template | `schedule:delete` |

### Notifications (6 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `GET` | `/notifications` | Get user notifications | Own only |
| `PUT` | `/notifications/{id}/read` | Mark as read | Own only |
| `PUT` | `/notifications/read-all` | Mark all as read | Own only |
| `DELETE` | `/notifications/{id}` | Delete notification | Own only |
| `GET` | `/notifications/settings` | Get notification settings | Own only |
| `PUT` | `/notifications/settings` | Update settings | Own only |

### Reports & Analytics (11 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `GET` | `/reports/dashboard` | Get dashboard data | `report:read` |
| `GET` | `/reports/equipment-health` | Equipment health report | `report:read` |
| `GET` | `/reports/workorder-summary` | Work order summary | `report:read` |
| `GET` | `/reports/maintenance-costs` | Maintenance cost report | `report:read` |
| `GET` | `/reports/technician-performance` | Technician performance | `report:read` |
| `GET` | `/reports/downtime` | Downtime analysis | `report:read` |
| `GET` | `/reports/parts-usage` | Parts usage report | `report:read` |
| `POST` | `/reports/custom` | Generate custom report | `report:create` |
| `GET` | `/reports/saved` | Get saved reports | `report:read` |
| `POST` | `/reports/saved` | Save report | `report:create` |
| `GET` | `/reports/export/{format}` | Export report (PDF/Excel) | `report:export` |

### Audit Logs (2 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `GET` | `/audit-logs` | Get audit logs | `audit:read` |
| `GET` | `/audit-logs/{resource}/{id}` | Get resource audit trail | `audit:read` |

### Dashboards (5 endpoints)

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| `GET` | `/dashboards` | Get user dashboards | Own only |
| `POST` | `/dashboards` | Create dashboard | Own only |
| `GET` | `/dashboards/{id}` | Get dashboard | Own only |
| `PUT` | `/dashboards/{id}` | Update dashboard | Own only |
| `DELETE` | `/dashboards/{id}` | Delete dashboard | Own only |

---

## Role-Based Access Control

The system implements a hierarchical role-based access control system with 6 predefined roles:

### Role Hierarchy

| Role | Level | Description |
|------|-------|-------------|
| **Super Admin** | 1 | Full system access across all organizations |
| **Admin** | 2 | Organization-level admin, manages users & settings |
| **Manager** | 3 | Manages equipment, work orders, and technicians |
| **Technician** | 4 | Performs maintenance, updates work orders |
| **Operator** | 5 | Views equipment, reports issues |
| **Viewer** | 6 | Read-only access |

### Permission Matrix

| Resource | Super Admin | Admin | Manager | Technician | Operator | Viewer |
|----------|-------------|-------|---------|------------|----------|--------|
| **Organizations** | CRUD | Read Own | Read Own | Read Own | Read Own | Read Own |
| **Users** | CRUD All | CRUD Org | Read Team | Read Self | Read Self | Read Self |
| **Equipment** | CRUD All | CRUD Org | CRUD Loc | Read+Update | Read+Report | Read |
| **Work Orders** | CRUD All | CRUD Org | CRUD | CRUD Assigned | Create | Read |
| **Schedules** | CRUD All | CRUD Org | CRUD | Read | Read | Read |
| **Parts** | CRUD All | CRUD Org | CRUD | Update Stock | Read | Read |
| **Reports** | CRUD All | CRUD Org | CRUD | Read | Read | Read |
| **Audit Logs** | Read All | Read Org | Read Own | Read Own | — | — |

### Permission Format

Permissions follow the `resource:action` format:
- `equipment:create` - Create new equipment
- `equipment:read` - View equipment details
- `equipment:update` - Update equipment information
- `equipment:delete` - Delete equipment
- `equipment:*` - All equipment permissions (wildcard)

---

## Authentication

The system uses JWT (JSON Web Token) based authentication with access and refresh tokens.

### Token Types

| Token | Expiry | Purpose |
|-------|--------|---------|
| **Access Token** | 15 minutes | API authorization |
| **Refresh Token** | 7 days | Obtain new access tokens |

### Access Token Payload

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "org_id": "organization_id",
  "role": "manager",
  "permissions": ["equipment:read", "workorder:create", "..."],
  "exp": 1703673600,
  "iat": 1703672700,
  "type": "access"
}
```

### Authentication Flow

1. User logs in with email/password
2. Server validates credentials
3. Server returns access token (15min) and refresh token (7 days)
4. Client includes access token in `Authorization` header: `Bearer <access_token>`
5. When access token expires, use refresh token to obtain new tokens
6. On logout, session is invalidated in database

### Usage Example

```bash
# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "yourpassword"}'

# Use access token
curl -X GET "http://localhost:8000/api/v1/equipment" \
  -H "Authorization: Bearer <access_token>"

# Refresh token
curl -X POST "http://localhost:8000/api/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token>"}'
```

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/GG/backend/` directory:

```env
# Application Settings
APP_NAME=GearGuard
APP_ENV=development
DEBUG=true
API_VERSION=v1

# Turso Database (get from https://turso.tech/app)
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
LOCAL_DB_PATH=./local.db

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-key-minimum-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_NAME=GearGuard
SMTP_FROM_EMAIL=noreply@gearguard.com

# File Upload Settings
MAX_UPLOAD_SIZE_MB=10
UPLOAD_DIR=./uploads
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif,pdf,doc,docx

# Logging
LOG_LEVEL=INFO
LOG_FILE=./logs/gearguard.log
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use **Pydantic v2** for request/response validation
- Follow **repository pattern** for database operations
- Use **dependency injection** for services
- Add **logging** throughout the application
- Write **unit and integration tests**

---

## Team

| Name | Role |
|------|------|
| Ansh Chamriya | Developer |

---

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turso Documentation](https://docs.turso.tech/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## License

This project is developed as part of a hackathon project.

---

**Last Updated**: December 2024
