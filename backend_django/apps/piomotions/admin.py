from django.contrib import admin
from .models import Codemonopoly, Codes

class CodemonopolyAdmin(admin.ModelAdmin):
    list_display = ('cm_id', 'monopoly', 'code')
    search_fields = ('monopoly__name', 'code__code')
    list_filter = ('monopoly',)
    list_per_page = 25
    # Thay thế autocomplete_fields bằng raw_id_fields để tránh lỗi autocomplete
    raw_id_fields = ['monopoly', 'code']
    list_display_links = ('cm_id', 'monopoly', 'code')  # Cho phép nhấp vào các trường để chỉnh sửa

class CodesAdmin(admin.ModelAdmin):
    list_display = ('code_id', 'code', 'description', 'is_active', 'created_at', 'expired_at')
    search_fields = ('code', 'code_id', 'description')
    list_filter = ('is_active', 'created_at', 'expired_at')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    date_hierarchy = 'created_at'
    list_per_page = 25
    list_display_links = ('code_id', 'code', 'description')  # Cho phép nhấp vào các trường để chỉnh sửa

admin.site.register(Codemonopoly, CodemonopolyAdmin)
admin.site.register(Codes, CodesAdmin)
