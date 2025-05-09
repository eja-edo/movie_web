from django.urls import path
from .views import get_genres , get_nations
from . import views

urlpatterns = [
    path('genres/', get_genres, name='get_genres'),
    path('nations/', get_nations, name='get_nations'),
    path('get_top_genres/', views.get_top_genres, name = 'get_genre_hot'),
]
