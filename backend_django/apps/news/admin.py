from django.contrib import admin
from .models import News

class NewsAdmin(admin.ModelAdmin):
    list_display = ('news_id', 'title', 'created_at', 'is_active')
    search_fields = ('title', 'content')
    list_filter = ('created_at', 'is_active')
    date_hierarchy = 'created_at'
    readonly_fields = ('news_id', 'created_at')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    list_per_page = 20
    list_display_links = ('news_id', 'title')  # Cho phép nhấp vào các trường để chỉnh sửa

admin.site.register(News, NewsAdmin)
