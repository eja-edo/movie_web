from django.urls import path, include
from . import views
from .views import  UserDetailView , logoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns =[
    path('login/', views.loginPost, name = 'login'),
    path('facebook/login/token/', views.FacebookLoginToken, name='facebook_login_token'),
    path('getDetail/',UserDetailView.as_view(), name='user' ),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    
    path('logout/',logoutView.as_view(),name='logout'),

    path('register/', views.register, name='register'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
]