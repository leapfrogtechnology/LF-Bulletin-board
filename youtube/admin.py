from django.contrib import admin

# Register your models here.
from .models import Youtube

class YoutubeModelAdmin(admin.ModelAdmin):
	list_display = ["url", "active", "created_at", "updated_at"]
	list_filter = ["created_at", "updated_at"]
	search_fields = ["url"]
	list_display_links = ["created_at"]
	list_editable = ["url", "active"]

	class Meta:
		model = Youtube

admin.site.register(Youtube, YoutubeModelAdmin)