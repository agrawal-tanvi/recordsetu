from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from models.database import Base


class LandRecord(Base):
    __tablename__ = "land_records"

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

    khasra_no: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    khasra_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    owner_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    owner_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    village: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    village_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    district: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    district_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    area: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    area_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )

    area_unit: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    area_unit_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )