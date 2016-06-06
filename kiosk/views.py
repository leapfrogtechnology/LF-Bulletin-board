from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

import json

from kiosk.models import Kiosk

# Create your views here.
def kiosk(request):
	return render(request, "kiosk.html")

def data(request):
	data = {}
	kiosk = {}

	objects = Kiosk.objects.all()[:1]

	kiosk['url'] = objects[0].url
	data['kiosk'] = kiosk
	data['last_update'] = str(objects[0].updated_at)

	return HttpResponse(json.dumps(data), content_type="application/json")

