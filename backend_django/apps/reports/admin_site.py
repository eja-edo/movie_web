from django.contrib.admin import AdminSite
from django.urls import path
from . import views

class ReportAdminSite(AdminSite):
    site_header = 'Báo cáo'
    site_title = 'Báo cáo'
    index_title = 'Báo cáo'
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('reports/dashboard/', self.admin_view(views.dashboard), name='reports_dashboard'),
            path('reports/movie_statistics/', self.admin_view(views.movie_statistics), name='reports_movie_statistics'),
            path('reports/episode_statistics/', self.admin_view(views.episode_statistics), name='reports_episode_statistics'),
            path('reports/actor_statistics/', self.admin_view(views.actor_statistics), name='reports_actor_statistics'),
            path('reports/director_statistics/', self.admin_view(views.director_statistics), name='reports_director_statistics'),
            path('reports/comment_statistics/', self.admin_view(views.comment_statistics), name='reports_comment_statistics'),
        ]
        return custom_urls + urls

report_admin_site = ReportAdminSite(name='report_admin')
