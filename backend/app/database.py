"""
GearGuard Backend - Database Connection Module
Handles Turso/LibSQL database connections with embedded replicas.
"""
import libsql_experimental as libsql
from functools import lru_cache
from typing import Optional, Any, List, Tuple
from contextlib import contextmanager
import logging

from .config import settings

logger = logging.getLogger(__name__)


class Database:
    """
    Database connection manager for Turso/LibSQL.
    Supports embedded replicas for offline-first capabilities.
    """
    
    def __init__(self):
        self._connection: Optional[Any] = None
        self._cursor: Optional[Any] = None
    
    def connect(self) -> Any:
        """
        Establish database connection with embedded replica.
        Returns the connection object.
        """
        if self._connection is None:
            try:
                # Connect with embedded replica for local caching
                self._connection = libsql.connect(
                    settings.LOCAL_DB_PATH,
                    sync_url=settings.TURSO_DATABASE_URL,
                    auth_token=settings.TURSO_AUTH_TOKEN
                )
                # Initial sync from remote
                self._connection.sync()
                logger.info("Database connected successfully with embedded replica")
            except Exception as e:
                logger.error(f"Failed to connect to database: {e}")
                # Fallback to local-only mode
                self._connection = libsql.connect(settings.LOCAL_DB_PATH)
                logger.warning("Connected in local-only mode")
        
        return self._connection
    
    def get_cursor(self) -> Any:
        """Get a database cursor."""
        conn = self.connect()
        return conn.cursor()
    
    def execute(
        self, 
        query: str, 
        params: Tuple = ()
    ) -> Any:
        """
        Execute a single query.
        
        Args:
            query: SQL query string
            params: Query parameters
            
        Returns:
            Query result
        """
        conn = self.connect()
        try:
            result = conn.execute(query, params)
            return result
        except Exception as e:
            logger.error(f"Query execution failed: {e}\nQuery: {query}")
            raise
    
    def execute_many(
        self, 
        query: str, 
        params_list: List[Tuple]
    ) -> None:
        """
        Execute a query with multiple parameter sets.
        
        Args:
            query: SQL query string
            params_list: List of parameter tuples
        """
        conn = self.connect()
        cursor = conn.cursor()
        try:
            cursor.executemany(query, params_list)
            conn.commit()
        except Exception as e:
            logger.error(f"Batch execution failed: {e}")
            raise
    
    def fetch_one(
        self, 
        query: str, 
        params: Tuple = ()
    ) -> Optional[Tuple]:
        """
        Execute query and fetch one result.
        
        Args:
            query: SQL query string
            params: Query parameters
            
        Returns:
            Single row or None
        """
        result = self.execute(query, params)
        return result.fetchone()
    
    def fetch_all(
        self, 
        query: str, 
        params: Tuple = ()
    ) -> List[Tuple]:
        """
        Execute query and fetch all results.
        
        Args:
            query: SQL query string
            params: Query parameters
            
        Returns:
            List of rows
        """
        result = self.execute(query, params)
        return result.fetchall()
    
    def commit(self) -> None:
        """Commit current transaction."""
        if self._connection:
            self._connection.commit()
    
    def rollback(self) -> None:
        """Rollback current transaction."""
        if self._connection:
            self._connection.rollback()
    
    def sync(self) -> None:
        """
        Sync local replica with remote Turso database.
        Call this after important writes to ensure durability.
        """
        if self._connection:
            try:
                self._connection.sync()
                logger.debug("Database synced with remote")
            except Exception as e:
                logger.error(f"Database sync failed: {e}")
    
    def close(self) -> None:
        """Close database connection."""
        if self._connection:
            self.sync()  # Final sync before close
            self._connection.close()
            self._connection = None
            logger.info("Database connection closed")
    
    @contextmanager
    def transaction(self):
        """
        Context manager for database transactions.
        
        Usage:
            with db.transaction():
                db.execute(...)
                db.execute(...)
        """
        try:
            yield self
            self.commit()
            self.sync()  # Sync after successful transaction
        except Exception:
            self.rollback()
            raise
    
    def run_migrations(self, migrations_dir: str = "migrations") -> None:
        """
        Run SQL migration files from the migrations directory.
        
        Args:
            migrations_dir: Path to migrations directory
        """
        import os
        from pathlib import Path
        
        migrations_path = Path(migrations_dir)
        if not migrations_path.exists():
            logger.warning(f"Migrations directory not found: {migrations_dir}")
            return
        
        # Get all .sql files sorted by name
        sql_files = sorted(migrations_path.glob("*.sql"))
        
        for sql_file in sql_files:
            logger.info(f"Running migration: {sql_file.name}")
            try:
                with open(sql_file, "r", encoding="utf-8") as f:
                    sql_content = f.read()
                
                # Execute each statement separately
                statements = sql_content.split(";")
                for statement in statements:
                    statement = statement.strip()
                    if statement:
                        self.execute(statement)
                
                self.commit()
                logger.info(f"Migration completed: {sql_file.name}")
            except Exception as e:
                logger.error(f"Migration failed for {sql_file.name}: {e}")
                raise
        
        self.sync()
        logger.info("All migrations completed successfully")


# Singleton database instance
_db_instance: Optional[Database] = None


def get_database() -> Database:
    """
    Get the singleton database instance.
    Creates a new instance if one doesn't exist.
    """
    global _db_instance
    if _db_instance is None:
        _db_instance = Database()
    return _db_instance


def init_database() -> Database:
    """
    Initialize database connection and run migrations.
    Call this during application startup.
    """
    db = get_database()
    db.connect()
    return db


def close_database() -> None:
    """
    Close database connection.
    Call this during application shutdown.
    """
    global _db_instance
    if _db_instance:
        _db_instance.close()
        _db_instance = None
