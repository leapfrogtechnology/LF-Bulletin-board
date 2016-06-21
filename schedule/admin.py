from django.contrib import admin

# Register your models here.
from .models import Schedule

class ScheduleModelAdmin(admin.ModelAdmin):
	list_display = ["start_time", "end_time", "created_at", "updated_at"]
	list_filter = ["created_at", "updated_at"]
	search_fields = ["start_time", "end_time"]
	list_display_links = ["created_at"]
	list_editable = ["start_time", "end_time"]

	class Meta:
		model = Schedule

admin.site.register(Schedule, ScheduleModelAdmin)
