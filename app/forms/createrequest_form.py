from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class CreateRequestForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    budget = IntegerField("Budget", validators=[DataRequired()])
    # image = FileField("Req Image", validators=[
    #                   FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField("Description")
    submit = SubmitField("Submit")
