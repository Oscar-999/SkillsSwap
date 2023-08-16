from app.models import db, ServiceRequest, environment, SCHEMA
from sqlalchemy.sql import text

def seed_service_requests():
    for servicerequest in [
        {
            "user_id": 2,
            "skill_id": 1,
            "description": "Need help with a coding project",
            "budget": 100,
            "name": "Coding Project",
            "req_image": ""
        },
        {
            "user_id": 3,
            "skill_id": 2,
            "description": "Design a logo for my business",
            "budget": 80,
            "name": "Logo Design",
            "req_image": ""
        },
        {
            "user_id": 4,
            "skill_id": 3,
            "description": "Write articles for my website",
            "budget": 50,
            "name": "Content Writing",
            "req_image": ""
        },
        {
            "user_id": 5,
            "skill_id": 4,
            "description": "Edit a video for my YouTube channel",
            "budget": 120,
            "name": "Video Editing",
            "req_image": ""
        },
        {
            "user_id": 1,
            "skill_id": 5,
            "description": "Capture photos for my event",
            "budget": 150,
            "name": "Event Photography",
            "req_image": ""
        }
    ]:
        db.session.add(ServiceRequest(**servicerequest))

    db.session.commit()

def undo_service_requests():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.service_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM service_requests"))

    db.session.commit()
