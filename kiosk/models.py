from django.db import models

# Create your models here.
class Kiosk(models.Model):
	url = models.URLField()
	created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

	def __unicode__(self):
		return self.url

	def __str__(self):
		return self.url