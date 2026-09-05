from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from models.database import get_db
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
    db: Session = Depends(get_db),
):
    """
    Search land records using one or more fields.

    Supported filters:
    - khasra_no
    - owner_name
    - village
    - district
    """

    if not any([
        khasra_no,
        owner_name,
        village,
        district,
    ]):
        return {
            "count": 0,
            "items": [],
            "message": "Provide at least one search parameter.",
        }

    query = db.query(LandRecord)

    if khasra_no:
        query = query.filter(
            LandRecord.khasra_no.ilike(f"%{khasra_no}%")
        )

    if owner_name:
        query = query.filter(
            LandRecord.owner_name.ilike(f"%{owner_name}%")
        )

    if village:
        query = query.filter(
            LandRecord.village.ilike(f"%{village}%")
        )

    if district:
        query = query.filter(
            LandRecord.district.ilike(f"%{district}%")
        )

    records = (
        query
        .order_by(LandRecord.id.desc())
        .all()
    )

    return {
        "count": len(records),
        "items": [
            {
                "id": record.id,
                "document_id": record.document_id,
                "khasra_no": record.khasra_no,
                "owner_name": record.owner_name,
                "village": record.village,
                "district": record.district,
                "area": record.area,
                "area_unit": record.area_unit,
            }
            for record in records
        ],
    }