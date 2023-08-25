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
        {
            "name": 'Animator',
            "description": 'I will animate anything you want i specialize with superheros',
            "price": 88,
            "owner_id": 6,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/bbbf94b9810944e1976f0361811cb386.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/ac4bcfdebc5446a0a60629df3f1409d1.jpg",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/5066397b43384551aa471adfd684a823.jpg"
        },

        {
            "name": 'StockBroker',
            "description": 'I will manage your portfolio and make you money',
            "price": 88,
            "owner_id": 7,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/da7b17aabd274fcd8f356aa964579295.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/8ef452950bf846778ce011bf88daa9a2.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/210d8e3eec7948689b21416d885946fb.jpeg"
        },
          {
            "name": 'PrivateDriver',
            "description": 'I will drive you anywhere you want',
            "price": 100,
            "owner_id": 7,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/47b143ea0aaf4fb58c6c9123b5acd363.png",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/36c432749f0341789a05155c6e51ebc9.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/7b563764e8c44c1c9f64f8cbd889a47c.png"
        },
        {
            "name": 'RealEstateAgent',
            "description": 'I will help you find your dream home',
            "price": 1000,
            "owner_id": 8,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/0d5f084de2334ef4900e1b88ff453b3a.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/fae7063b432540168e75e493ba50da0e.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/56208f4e376b43b3a253c395e14d5d34.jpg"
        },
        {
            "name": 'Assistant',
            "description": 'I will help you with whatever tasks you need to make your life easier',
            "price": 50,
            "owner_id": 9,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/b5de8a37386a4e048f04ccdbbc773d5d.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/eec61ee4be054fcb9fa9b56a460554ba.jpg",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/1d8f1f31b09a410ba721009762817455.jpg"
        },
         {
            "name": 'SongWriter/GhostWriter',
            "description": 'I will help you with writing a song that you can sing or rap to',
            "price": 50,
            "owner_id": 10,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/e356719f6beb453383399564ced65c50.png",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/b176e7f313874c5c92e9d9fea986e8c5.jpg",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/38b8cb415be742d49db609233baf1c1b.jpg"
        },
          {
            "name": 'Tutor',
            "description": 'I will tutor you with whatever homework you need help with',
            "price": 55,
            "owner_id": 12,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/bf71dc1e6b2c488ca3b099e3e4d3baae.png",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/de13db076cce4bbfb88435e8afef1a9a.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/5713c9bb8be14c2ab45111bfce2a5618.jpg"
        },
        {
            "name": 'VideogameCoach',
            "description": 'I will help train you get better at fps shooters',
            "price": 95,
            "owner_id": 11,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/14a61871f08e41ea8111a63f9d11d18b.png",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/b43f435afbef4d17be69c1befad2d8d3.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/5fb8e9eec2cf42a9bc227d5b6c3b269d.jpg"
        },
        {
            "name": 'Gotham Knight',
            "description": 'I protect the city',
            "price": 999,
            "owner_id": 20,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/e9b5341026cf428497c4aa949dfdecb9.png",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/604517f1d211401c914fa05b1093559a.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/24a32b00eeaa457aab742737b6ec57c0.png"
        },
        {
            "name": 'Gardner',
            "description": 'I wil come to your garden and plant whatever you want',
            "price": 79,
            "owner_id": 22,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/0787fafc20614837bf77363ae94f249c.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/9dbee5f0209f4810ac6223d6d22fda07.jpg",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/24a32b00eeaa457aab742737b6ec57c0.png"
        },
        {
            "name": 'Hairstylist',
            "description": 'I wil come to your house and do your hair',
            "price": 29,
            "owner_id": 17,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/d72323b0078243d59f98fd2946811a46.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/281ed1bfd7f14400a8a83d3a2470d6cb.jpg",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/9d400becbe9f4daa97214e5d5bfcbdd6.jpg"
        },
        {
            "name": 'House Cleaner',
            "description": 'I wil clean anything',
            "price": 29,
            "owner_id": 14,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/1a1efd760aa0448ca5d0e73e41e244b4.jpeg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/4508d83370e44807b84c4666e1b02d24.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/36a2474522f84aceb7994f2ad6b84a3e.png"
        },
        {
            "name": 'Basketball Coach',
            "description": 'I wil coach you to be the best basketball player',
            "price": 29,
            "owner_id": 13,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/b2bca0c24f134036baa206cdf2f05281.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/3b7fbbcbeed743719f6e3322c69140c0.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/8865b0a382a4406a954deb09a5c2023f.jpg"
        },
        {
            "name": 'Soccer Coach',
            "description": 'I will make you the best striker the best forward a true goal scorer',
            "price": 29,
            "owner_id": 18,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/281876dfaebd464abee09a53271d2875.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/55a7e325cbd54931ab35f500dd3bde0c.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/22c652ba118342ab86c57df63274da04.png"
        },
        {
            "name": 'Videogame Carry',
            "description": 'I will carry you to victory in any game you want',
            "price": 29,
            "owner_id": 16,
            "skill_image": "https://skills-swap.s3.us-east-2.amazonaws.com/bf82e2a96f8e4ae6b3a162c294f0fa76.jpg",
            "secondary_image": "https://skills-swap.s3.us-east-2.amazonaws.com/e744375f5226416b987ec268070154f2.png",
            "third_image": "https://skills-swap.s3.us-east-2.amazonaws.com/74413aca6d384d558ab3d007506eba87.png"
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
