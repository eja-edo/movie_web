from django.urls import path
from .views import get_genres, get_nations
from . import views
from .views_sitemap import video_sitemap

urlpatterns = [
    path('genres/', get_genres, name='get_genres'),
    path('nations/', get_nations, name='get_nations'),
    path('get_top_genres/', views.get_top_genres, name='get_genre_hot'),

    # Sitemap URLs
    path('', video_sitemap, name='video_sitemap'),
]
