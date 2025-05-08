from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Report

# Register your models here.
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'report_type', 'created_at', 'view_report')
    list_filter = ('report_type', 'created_at')
    search_fields = ('title', 'description')

    def view_report(self, obj):
        if obj.report_type == 'dashboard':
            url = reverse('reports:dashboard')
        elif obj.report_type == 'movie':
            url = reverse('reports:movie_statistics')
        elif obj.report_type == 'episode':
            url = reverse('reports:episode_statistics')
        elif obj.report_type == 'actor':
            url = reverse('reports:actor_statistics')
        elif obj.report_type == 'director':
            url = reverse('reports:director_statistics')
        elif obj.report_type == 'comment':
            url = reverse('reports:comment_statistics')
        else:
            url = '#'

        return format_html('<a href="{}" target="_blank">Xem báo cáo</a>', url)

    view_report.short_description = 'Báo cáo'

admin.site.register(Report, ReportAdmin)

# Thêm liên kết đến trang báo cáo trong admin
class ReportLinkAdmin(admin.ModelAdmin):
    def get_urls(self):
        from django.urls import path
        from . import views

        urls = super().get_urls()
        custom_urls = [
            path('reports/', views.dashboard, name='reports_index'),
        ]
        return custom_urls + urls
