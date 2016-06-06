from django.conf.urls import url
from django.contrib import admin

from .views import (kiosk, data)

urlpatterns = [
	url(r'^data$', data, name="data"),
	url(r'^$', kiosk, name="kiosk"),
]