from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from models.database import get_db
from models.document import Document
from models.land_record import LandRecord


router = APIRouter(
    prefix="/api",
    tags=["Search"],
)


@router.get("/search")
def search_land_records(
    khasra_no: str | None = Query(default=None),
    owner_name: str | None = Query(default=None),
    village: str | None = Query(default=None),
    district: str | None = Query(default=None),
    q: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    """
    Search land records using one or more fields or a general query.

    Supported filters:
    - khasra_no
    - owner_name
    - village
    - district
    - q (general keyword search)
    """

    khasra_val = khasra_no if isinstance(khasra_no, str) and khasra_no.strip() else None
    owner_val = owner_name if isinstance(owner_name, str) and owner_name.strip() else None
    village_val = village if isinstance(village, str) and village.strip() else None
    district_val = district if isinstance(district, str) and district.strip() else None
    q_val = q if isinstance(q, str) and q.strip() else None

    query = db.query(LandRecord)

    if q_val:
        query = query.filter(
            or_(
                LandRecord.khasra_no.ilike(f"%{q_val}%"),
                LandRecord.owner_name.ilike(f"%{q_val}%"),
                LandRecord.village.ilike(f"%{q_val}%"),
                LandRecord.district.ilike(f"%{q_val}%"),
                LandRecord.document_id.ilike(f"%{q_val}%"),
            )
        )

    if khasra_val:
        query = query.filter(
            LandRecord.khasra_no.ilike(f"%{khasra_val}%")
        )

    if owner_val:
        query = query.filter(
            LandRecord.owner_name.ilike(f"%{owner_val}%")
        )

    if village_val:
        query = query.filter(
            LandRecord.village.ilike(f"%{village_val}%")
        )

    if district_val:
        query = query.filter(
            LandRecord.district.ilike(f"%{district_val}%")
        )

    records = (
        query
        .order_by(LandRecord.id.desc())
        .limit(100)
        .all()
    )

    items = []
    for record in records:
        doc = db.query(Document).filter(Document.document_id == record.document_id).first()
        status = doc.status if doc else "DIGITIZED"
        items.append({
            "id": record.id,
            "document_id": record.document_id,
            "khasra_no": record.khasra_no,
            "owner_name": record.owner_name,
            "village": record.village,
            "district": record.district,
            "area": record.area,
            "area_unit": record.area_unit,
            "status": status,
        })

    return {
        "count": len(items),
        "items": items,
    }