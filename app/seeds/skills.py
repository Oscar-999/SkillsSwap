from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text


def seed_skills():
    for skill in [
       {
            "name": 'Programming',
            "description": 'Creating websites and web applications',
            "price": 15,
            "owner_id": 2,
            "skill_image": "https://assets.entrepreneur.com/content/3x2/2000/1606926283-GettyImages-1129377183.jpg",
            "secondary_image": "https://ourcodeworld.com/public-media/articles/articleocw-5d07e6b3790af.jpg",
            "third_image": "https://i.pinimg.com/originals/e9/e6/d4/e9e6d42ae3c5168a7562368741539424.jpg"
        },
        {
            "name": 'Graphic Design',
            "description": 'Creating visual content and designs',
            "price": 20,
            "owner_id": 3,
            "skill_image": "https://img.freepik.com/free-vector/design-process-concept-landing-page_23-2148313670.jpg",
            "secondary_image": "https://assets-prd.ignimgs.com/2021/12/16/sale-309437-article-image-1639680628904.jpeg",
            "third_image": "https://learn.g2.com/hs-fs/hubfs/iStock-1191609321%20(1).jpg?width=6720&name=iStock-1191609321%20(1).jpg"
        },
        {
            "name": 'Writing',
            "description": 'Content creation',
            "price": 50,
            "owner_id": 1,
            "skill_image": "https://assets.entrepreneur.com/content/3x2/2000/1683118869-GettyImages-850630688.jpg",
            "secondary_image": "",  # Add this field
            "third_image": ""  # Add this field
        },
        {
            "name": 'Video Editor',
            "description": 'Editing videos',
            "price": 30,
            "owner_id": 4,
            "skill_image": "https://austinvisuals.com/wp-content/uploads/Video-editing-Company.png",
            "secondary_image": "https://www.shutterbug.com/images/styles/600_wide/public/Lightroom-Tips-Before-and-After_01-web_0.jpg",
            "third_image": "https://miro.medium.com/v2/resize:fit:1400/1*qzy4de4ND0lU814tw29oew.jpeg"
        },
        {
            "name": 'Photography',
            "description": 'Beautiful photos for a low price',
            "price": 45,
            "owner_id": 5,
            "skill_image": "https://expertphotography.b-cdn.net/wp-content/uploads/2020/07/social-media-for-photographers-follow-1.jpg",
            "secondary_image": "https://iso.500px.com/wp-content/uploads/2015/07/weddings_cover.jpeg",
            "third_image": "https://ichef.bbci.co.uk/news/976/cpsprodpb/14AC1/production/_116237648_cd6dc757-9c27-4a1b-a4ef-367e016a719b.jpg" 
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
