from django.db import models

# Create your models here.
class Schedule(models.Model):
	start_time = models.TimeField()
	end_time = models.TimeField()
	created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

	def __unicode__(self):
		return ''

	def __str__(self):
		return ''

