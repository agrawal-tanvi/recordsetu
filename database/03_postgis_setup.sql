-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add Polygon Geometry column to land_records
ALTER TABLE land_records 
ADD COLUMN IF NOT EXISTS geom geometry(Polygon, 4326);

-- Update sample geometry for existing land_records (Synthetic bounding box near Ghaziabad region)
UPDATE land_records
SET geom = ST_SetSRID(
    ST_MakeEnvelope(
        77.40 + (random() * 0.05), 
        28.65 + (random() * 0.05), 
        77.41 + (random() * 0.05), 
        28.66 + (random() * 0.05)
    ), 
    4326
)
WHERE geom IS NULL;