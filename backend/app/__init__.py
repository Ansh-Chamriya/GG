"""GearGuard Backend Application Package"""
from .config import settings
from .database import get_database, init_database, close_database

__version__ = "1.0.0"
__all__ = ["settings", "get_database", "init_database", "close_database"]
