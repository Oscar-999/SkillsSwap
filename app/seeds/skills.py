from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text


def seed_skills():
    for skill in [
        {
            "name": 'Programming',
            "description": 'Creating websites and web applications',
            "price": 15,
            "owner_id": 2,
            "skill_image": ""
        },
        {
            "name": 'Graphic Design',
            "description": 'Creating visual content and designs',
            "price": 20,
            "owner_id": 3,
            "skill_image": ""
        },
        {
            "name": 'Writing',
            "description": 'Content creation',
            "price": 50,
            "owner_id": 1,
            "skill_image": ""
        },
        {
            "name": 'Video Editor',
            "description": 'Editing videos',
            "price": 30,
            "owner_id": 4,
            "skill_image": ""
        },
        {
            "name": 'Photogrphy',
            "description": 'Beautiful photos for a low price',
            "price": 45,
            "owner_id": 5,
            "skill_image": ""
        },
    ]:
        db.session.add(Skill(**skill))


    db.session.commit()

def undo_skills():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM skills"))

    db.session.commit()
