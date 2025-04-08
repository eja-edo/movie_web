from django.urls import path, include
from . import views




urlpatterns =[
    path('get_thinhhanh/', views.get_thinhhanh_10 , name ='getthinhhanh' ),
    path('get_banner_qc/', views.get_banner_qc, name = 'getbannerqc'),
    path('get_phimhot_10/', views.get_phimhot_10, name = 'getphimhot'),
    # path('get_phimhh_10/', views.get_phimhh, name = 'getphimhh'),
    # path('get_phimkinhdi_10/', views.get_phimkinhdi, name = 'getphimkinhdi'),
    # path('get_phimhanhdong_10/', views.get_phimhd, name = 'getphimhd'),
    # path('get_phimtinhcam_10/', views.get_phimtinhcam, name = 'getphimtinhcam'),
    path('get_films_by_genre10/', views.get_films_by_genre10 , name = 'getFilmsByGenre10'),

    path('get_movie_details/<str:movie_id>/', views.get_movie_details, name='detail'),


    path('searchkeys/',views.search_movies, name = 'searchkey'),
    path('search_full_movies/',views.search_full_movies, name = 'searchkey'),

    path('<int:movie_id>/episodes/<int:episode_id>/', views.get_video_movie, name='get_video_movie'),

    path('genres/', views.get_movies_by_genre, name='get_movies_by_genre'),
    path('nations/', views.get_movies_by_nation, name='get_movies_by_nation'),
    path('actors/', views.get_movies_by_actor, name='get_movies_by_actor'),
    path('directors/', views.get_movies_by_director, name='get_movies_by_director'),

    path('<int:movie_id>/reviews/', views.get_movie_reviews, name='get_movie_reviews'),
    
    path('<int:movie_id>/increase-views/', views.increase_movie_views, name='increase_movie_views'),

]


