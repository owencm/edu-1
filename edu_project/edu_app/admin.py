from django.contrib import admin
from edu_app.models import SubjQuestion, SubjAnswer, SubjAnswerEvaluation

# Register your models here.

admin.site.register(SubjQuestion)
admin.site.register(SubjAnswer)
admin.site.register(SubjAnswerEvaluation)