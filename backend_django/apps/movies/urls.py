from django.urls import path, include
from . import views

from .views import GetDetailMovie



urlpatterns =[
    path('get_thinhhanh/', views.get_thinhhanh_10 , name ='getthinhhanh' ),
    path('get_banner_qc/', views.get_banner_qc, name = 'getbannerqc'),
    path('get_phimhot_10/', views.get_phimhot_10, name = 'getphimhot'),
    # path('get_phimhh_10/', views.get_phimhh, name = 'getphimhh'),
    # path('get_phimkinhdi_10/', views.get_phimkinhdi, name = 'getphimkinhdi'),
    # path('get_phimhanhdong_10/', views.get_phimhd, name = 'getphimhd'),
    # path('get_phimtinhcam_10/', views.get_phimtinhcam, name = 'getphimtinhcam'),
    path('get_films_by_genre10/', views.get_films_by_genre10 , name = 'getFilmsByGenre10'),

    path('detailMovie/', GetDetailMovie.as_view(), name='detail'),
    path('searchkeys/',views.searchview, name = 'searchkey'),
    path('get_top_genres/', views.get_top_genres, name = 'get_genre_hot'),
]


