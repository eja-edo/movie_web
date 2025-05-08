from django.urls import path
from . import reports

urlpatterns = [
    path('dashboard/', reports.dashboard, name='reports_dashboard'),
    path('movie_statistics/', reports.movie_statistics, name='reports_movie_statistics'),
    path('episode_statistics/', reports.episode_statistics, name='reports_episode_statistics'),
    path('actor_statistics/', reports.actor_statistics, name='reports_actor_statistics'),
    path('director_statistics/', reports.director_statistics, name='reports_director_statistics'),
    path('comment_statistics/', reports.comment_statistics, name='reports_comment_statistics'),
]
