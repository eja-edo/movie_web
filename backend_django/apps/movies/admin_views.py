from django.contrib import admin
from django.urls import path
from . import reports

# Thêm URL cho các báo cáo vào admin
class ReportAdminSite(admin.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        report_urls = [
            path('reports/dashboard/', self.admin_view(reports.dashboard), name='reports_dashboard'),
            path('reports/movie_statistics/', self.admin_view(reports.movie_statistics), name='reports_movie_statistics'),
            path('reports/episode_statistics/', self.admin_view(reports.episode_statistics), name='reports_episode_statistics'),
            path('reports/actor_statistics/', self.admin_view(reports.actor_statistics), name='reports_actor_statistics'),
            path('reports/director_statistics/', self.admin_view(reports.director_statistics), name='reports_director_statistics'),
            path('reports/comment_statistics/', self.admin_view(reports.comment_statistics), name='reports_comment_statistics'),
        ]
        return report_urls + urls

# Tạo một instance của ReportAdminSite
report_admin_site = ReportAdminSite(name='report_admin')
