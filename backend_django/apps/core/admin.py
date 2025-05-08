from django.contrib import admin
from .models import Genres, Monopolys, Nations

class GenresAdmin(admin.ModelAdmin):
    list_display = ('genre_id', 'name')
    search_fields = ('name', 'genre_id')
    list_per_page = 25
    ordering = ('name',)
    list_display_links = ('genre_id', 'name')  # Cho phép nhấp vào các trường để chỉnh sửa

class MonopolysAdmin(admin.ModelAdmin):
    list_display = ('monopoly_id', 'name')
    search_fields = ('name', 'monopoly_id')
    list_per_page = 25
    ordering = ('name',)
    list_display_links = ('monopoly_id', 'name')  # Cho phép nhấp vào các trường để chỉnh sửa

class NationsAdmin(admin.ModelAdmin):
    list_display = ('nation_id', 'name')
    search_fields = ('name', 'nation_id')
    list_per_page = 25
    ordering = ('name',)
    list_display_links = ('nation_id', 'name')  # Cho phép nhấp vào các trường để chỉnh sửa

admin.site.register(Genres, GenresAdmin)
admin.site.register(Monopolys, MonopolysAdmin)
admin.site.register(Nations, NationsAdmin)

