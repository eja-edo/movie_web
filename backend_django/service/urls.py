from django.urls import path, include
from . import views
from .views import  TestAPIview , getFilm , GetDetailMovie , UserDetailView , logoutView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns =[
    path('get_thinhhanh/', views.get_thinhhanh_10 , name ='getthinhhanh' ),
    path('get_banner_qc/', views.get_banner_qc, name = 'getbannerqc'),
    path('get_phimhot_10/', views.get_phimhot_10, name = 'getphimhot'),
    path('get_phimhh_10/', views.get_phimhh, name = 'getphimhh'),
    path('get_phimkinhdi_10/', views.get_phimkinhdi, name = 'getphimkinhdi'),
    path('get_phimhanhdong_10/', views.get_phimhd, name = 'getphimhd'),
    path('get_phimtinhcam_10/', views.get_phimtinhcam, name = 'getphimtinhcam'),
    path('login/', views.loginPost, name = 'login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/',TestAPIview.as_view(), name = 'test'),
    path('film/',getFilm.as_view(),name='getfilm'),
    path('facebook/login/token/', views.FacebookLoginToken, name='facebook_login_token'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('detailMovie/', GetDetailMovie.as_view(), name='detail'),
    path('user/',UserDetailView.as_view(), name='user' ),
    path('logout/',logoutView.as_view(),name='logout'),
    path('searchkeys/',views.searchview, name = 'searchkey'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)