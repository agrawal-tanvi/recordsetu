import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

backend_dir = Path(__file__).resolve().parent.parent
default_db_file = backend_dir / "recordsetu.db"

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{default_db_file.as_posix()}",
)

# Standardize legacy postgres:// prefix from cloud providers (Render, Railway, etc.)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)


connect_args = {}

if DATABASE_URL.startswith("sqlite"):
    connect_args = {
        "check_same_thread": False,
    }


engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


from models.document import Document
from models.land_record import LandRecord
from models.validation import ValidationResult
from models.audit import AuditLog

Base.metadata.create_all(bind=engine)