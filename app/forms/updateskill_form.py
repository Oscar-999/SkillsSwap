from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class UpdateSkillForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    skill_image = FileField("Skill Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    secondary_image = FileField("Secondary Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    third_image = FileField("Third Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description")
    submit = SubmitField("Submit")
