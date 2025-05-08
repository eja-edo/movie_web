from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Reviews, Watchlists, ProfileUser

class ReviewsAdmin(admin.ModelAdmin):
    list_display = ('review_id', 'user', 'movie', 'rating', 'comment', 'create_at')
    search_fields = ('comment', 'user__username', 'movie__title')
    list_filter = ('rating', 'create_at')
    date_hierarchy = 'create_at'
    readonly_fields = ('review_id', 'create_at')
    list_per_page = 25
    # Thay thế autocomplete_fields bằng raw_id_fields để tránh lỗi autocomplete
    raw_id_fields = ['user', 'movie']
    list_display_links = ('review_id', 'user', 'movie')  # Cho phép nhấp vào các trường để chỉnh sửa

class WatchlistsAdmin(admin.ModelAdmin):
    list_display = ('view_id', 'user', 'movie', 'watch_at')
    search_fields = ('user__username', 'movie__title')
    list_filter = ('watch_at',)
    date_hierarchy = 'watch_at'
    readonly_fields = ('view_id', 'watch_at')
    list_per_page = 25
    # Thay thế autocomplete_fields bằng raw_id_fields để tránh lỗi autocomplete
    raw_id_fields = ['user', 'movie']
    list_display_links = ('view_id', 'user', 'movie')  # Cho phép nhấp vào các trường để chỉnh sửa

class ProfileUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'sex', 'dateofbirth', 'numberphone', 'country')
    search_fields = ('id__username', 'numberphone', 'country')
    list_filter = ('sex', 'dateofbirth')
    list_per_page = 25
    # Thay thế autocomplete_fields bằng raw_id_fields để tránh lỗi autocomplete
    raw_id_fields = ['id']
    list_display_links = ('id', 'sex', 'dateofbirth', 'numberphone', 'country')  # Cho phép nhấp vào các trường để chỉnh sửa

admin.site.register(Reviews, ReviewsAdmin)
admin.site.register(Watchlists, WatchlistsAdmin)
admin.site.register(ProfileUser, ProfileUserAdmin)
