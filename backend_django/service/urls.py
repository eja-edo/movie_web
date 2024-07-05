from django.urls import path
from . import views
from .views import loginclass


urlpatterns =[
    path('get_thinhhanh/', views.get_thinhhanh_10 , name ='getthinhhanh' ),
    path('get_banner_qc/', views.get_banner_qc, name = 'getbannerqc'),
    path('get_phimhot_10/', views.get_phimhot_10, name = 'getphimhot'),
    path('get_phimhh_10/', views.get_phimhh, name = 'getphimhh'),
    path('get_phimkinhdi_10/', views.get_phimkinhdi, name = 'getphimkinhdi'),
    path('get_phimhanhdong_10/', views.get_phimhd, name = 'getphimhd'),
    path('get_phimtinhcam_10/', views.get_phimtinhcam, name = 'getphimtinhcam'),
    path('login/', views.loginclass.as_view(), name = 'login'),
    path('contact/', views.get_contact, name='contact'),
    path('contact2/', views.get_contact2, name='contact2'),
]