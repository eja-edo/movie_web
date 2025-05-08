from django.urls import path
from . import reports

app_name = 'admin'

urlpatterns = [
    path('reports/dashboard/', reports.dashboard, name='movies_reports_dashboard'),
    path('reports/movie_statistics/', reports.movie_statistics, name='movies_reports_movie_statistics'),
    path('reports/episode_statistics/', reports.episode_statistics, name='movies_reports_episode_statistics'),
    path('reports/actor_statistics/', reports.actor_statistics, name='movies_reports_actor_statistics'),
    path('reports/director_statistics/', reports.director_statistics, name='movies_reports_director_statistics'),
    path('reports/comment_statistics/', reports.comment_statistics, name='movies_reports_comment_statistics'),
]
