import psycopg2
import random
from faker import Faker

fake = Faker('en_IN')

# Replace with your actual Supabase / PostgreSQL database connection string
DATABASE_URL = "postgresql://postgres:26018recordetu@db.xtnicauvfkehfqrvwzfu.supabase.co:5432/postgres"

def seed_database():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    print("Inserting 100 land records into PostgreSQL...")

    for _ in range(100):
        status = random.choices(
            population=['active', 'discrepancy_flagged', 'pending_validation'],
            weights=[0.80, 0.15, 0.05],
            k=1
        )[0]

        khasra_no = f"{random.randint(1, 999)}/{random.randint(1, 20)}"
        owner_name = fake.name()
        village = fake.city()
        district = "Ghaziabad"
        area = round(random.uniform(0.5, 10.0), 4)
        area_unit = "Hectares"

        cursor.execute("""
            INSERT INTO land_records (khasra_no, owner_name, village, district, area, area_unit, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (khasra_no, owner_name, village, district, area, area_unit, status))

    conn.commit()
    cursor.close()
    conn.close()
    print("Database seeding completed!")

if __name__ == "__main__":
    seed_database()