from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

import json

from kiosk.models import Kiosk
from youtube.models import Youtube
from schedule.models import Schedule

# Create your views here.
def kiosk(request):
	return render(request, "kiosk.html")

def data(request):
	data = {}
	kiosk = {}

	last_update = []

	kiosk_objects = Kiosk.objects.all()[:1]
	url = kiosk_objects[0].url
	last_update.append(kiosk_objects[0].updated_at)

	youtube_objects = Youtube.objects.all()
	playlist = []
	for youtube in youtube_objects:
		if youtube.active == True :
			youtube_url = youtube.url
			video_id = youtube_url.split("?v=")
			video_id = video_id[1].split("&")
			playlist.append(video_id[0])
			last_update.append(youtube.updated_at)

	schedule_objects = Schedule.objects.all()
	schedule = []
	for time in schedule_objects:
		schedule.append({'start_time': str(time.start_time), 'end_time': str(time.end_time)})
		last_update.append(time.updated_at)

	last_update = sorted(last_update)
	last_update = str(last_update[-1])

	kiosk['url'] = url
	kiosk['playlist'] = playlist
	kiosk['schedule'] = schedule

	data['kiosk'] = kiosk
	data['last_update'] = last_update

	return HttpResponse(json.dumps(data), content_type="application/json")

