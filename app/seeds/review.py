from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    for review in [
        {
            "reviewer_id": 1,
            "skill_id": 2,
            "text": 'Great graphic design work!!',
            'stars': 5

        },
        {
            "reviewer_id": 2,
            "skill_id": 3,
            "text": 'Excellent writing skills!',
            "stars" : 3
        },
        {
            "reviewer_id": 3,
            "skill_id": 4,
            "text": 'Professional video editing!',
            "stars": 2

        },
        {
            "reviewer_id": 4,
            "skill_id": 5,
            "text": 'Amazing photography skills!',
            "stars": 4

        },
        {
            "reviewer_id": 5,
            "skill_id": 1,
            "text": 'Impressive coding expertise!',
            "stars": 1

        },
    ]:
        db.session.add(Review(**review))

    db.session.commit()

def undo_reviews():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
