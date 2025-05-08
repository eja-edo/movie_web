from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Comments
from django.contrib.auth.models import User
from apps.movies.models import Episodes

class CommentsAdmin(admin.ModelAdmin):
    list_display = ('comment_id', 'get_user', 'get_episode', 'content', 'created_at')
    search_fields = ('content', 'user__username', 'episode__movie__title')
    list_filter = ('created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('comment_id', 'created_at')
    list_per_page = 25
    # Sử dụng autocomplete_fields thay vì raw_id_fields
    autocomplete_fields = ['user', 'episode']
    list_display_links = ('comment_id', 'content')

    def get_user(self, obj):
        """Hiển thị tên của User thay vì đối tượng"""
        if obj.user:
            return obj.user.username
        return '-'
    get_user.short_description = 'User'
    get_user.admin_order_field = 'user__username'

    def get_episode(self, obj):
        """Hiển thị tên của Episode thay vì đối tượng"""
        if obj.episode:
            return f"{obj.episode.movie.title} - Tập {obj.episode.episode_number}"
        return '-'
    get_episode.short_description = 'Episode'
    get_episode.admin_order_field = 'episode__episode_number'

admin.site.register(Comments, CommentsAdmin)
