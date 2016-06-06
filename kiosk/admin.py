from django.contrib import admin

# Register your models here.
from .models import Kiosk

class KioskModelAdmin(admin.ModelAdmin):
	list_display = ["url", "created_at", "updated_at"]
	list_filter = ["created_at", "updated_at"]
	search_fields = ["url"]
	list_display_links = ["created_at"]
	list_editable  = ["url"]

	class Meta:
		model = Kiosk

admin.site.register(Kiosk, KioskModelAdmin)