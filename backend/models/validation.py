from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import Mapped, mapped_column

from models.database import Base

class ValidationResult(Base):
    __tablename__ = "validation_results"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    document_id: Mapped[str] = mapped_column(
        String(50),
        ForeignKey("documents.document_id"),
        nullable=False,
    )

    valid: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    review_required: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )

    errors: Mapped[list] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )

    warnings: Mapped[list] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )

    low_confidence_fields: Mapped[list] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )