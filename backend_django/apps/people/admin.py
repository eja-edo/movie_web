from django.contrib import admin
from .models import Actors, Directors

class ActorsAdmin(admin.ModelAdmin):
    list_display = ('actor_id', 'name')
    search_fields = ('name', 'actor_id')
    list_per_page = 25
    ordering = ('name',)
    list_display_links = ('actor_id', 'name')  # Cho phép nhấp vào các trường để chỉnh sửa

class DirectorsAdmin(admin.ModelAdmin):
    list_display = ('director_id', 'name')
    search_fields = ('name', 'director_id')
    list_per_page = 25
    ordering = ('name',)
    list_display_links = ('director_id', 'name')  # Cho phép nhấp vào các trường để chỉnh sửa

admin.site.register(Actors, ActorsAdmin)
admin.site.register(Directors, DirectorsAdmin)

