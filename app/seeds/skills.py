from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text
from .users import marnie, bobbie, finn, jawa, rico, picard, spock, mccoy, worf, sisko, spiderman, msmarvel, unknown, demo1, demo2

def seed_skills():
    skill1 = Skill(
        name='Web Development',
        description='Creating websites and web applications',
        skill_image='',
        Price=100
    )

    skill2 = Skill(
        name='Graphic Design',
        description='Creating visual content and designs',
        skill_image='',
        price=80
    )

    skill3 = Skill(
        name='Video Editor',
        description='Creating websites and web applications',
        skill_image='',
        Price=100
    )

    skill4 = Skill(
        name='Graphic Design',
        description='Creating visual content and designs',
        skill_image='',
        price=80
    )

    db.session.add(skill1)
    db.session.add(skill2)
    db.session.add(skill3)
    db.session.add(skill4)
    db.session.commit()

def undo_skills():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM skills"))

    db.session.commit()
