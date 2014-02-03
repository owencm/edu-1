from django.db import models

# Create your models here.

class SubjQuestion(models.Model):
	question_text = models.CharField(max_length=200, default='What is the answer?')
	def __unicode__(self):  # Python 3: def __str__(self):
		return self.question_text

class SubjAnswer(models.Model):
	question = models.ForeignKey(SubjQuestion)
	answer_text = models.TextField(default='This is the answer')
	def __unicode__(self):  # Python 3: def __str__(self):
		return self.answer_text

class SubjAnswerEvaluation(models.Model):
	answer = models.ForeignKey(SubjAnswer)
	score = models.FloatField(default=0.5)
	def __unicode__(self):  # Python 3: def __str__(self):
		return unicode(self.score)