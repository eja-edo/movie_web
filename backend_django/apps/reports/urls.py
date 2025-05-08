from django.urls import path
from . import views

app_name = 'reports'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('movie_statistics/', views.movie_statistics, name='movie_statistics'),
    path('episode_statistics/', views.episode_statistics, name='episode_statistics'),
    path('actor_statistics/', views.actor_statistics, name='actor_statistics'),
    path('director_statistics/', views.director_statistics, name='director_statistics'),
    path('comment_statistics/', views.comment_statistics, name='comment_statistics'),
]
