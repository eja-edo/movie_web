from django.urls import path, include
from . import views
from .views import  TestAPIview , getFilm , GetDetailMovie
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns =[
    path('get_thinhhanh/', views.get_thinhhanh_10 , name ='getthinhhanh' ),
    path('get_banner_qc/', views.get_banner_qc, name = 'getbannerqc'),
    path('get_phimhot_10/', views.get_phimhot_10, name = 'getphimhot'),
    # path('get_phimhh_10/', views.get_phimhh, name = 'getphimhh'),
    # path('get_phimkinhdi_10/', views.get_phimkinhdi, name = 'getphimkinhdi'),
    # path('get_phimhanhdong_10/', views.get_phimhd, name = 'getphimhd'),
    # path('get_phimtinhcam_10/', views.get_phimtinhcam, name = 'getphimtinhcam'),
    path('get_films_by_genre10/', views.get_films_by_genre10 , name = 'getFilmsByGenre10'),


    path('test/',TestAPIview.as_view(), name = 'test'),
    path('film/',getFilm.as_view(),name='getfilm'),
    path('detailMovie/', GetDetailMovie.as_view(), name='detail'),
    path('searchkeys/',views.searchview, name = 'searchkey'),
]