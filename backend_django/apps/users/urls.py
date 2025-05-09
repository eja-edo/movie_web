from django.urls import path, include
from . import views
from .views import UserDetailView, logoutView, UploadProfileImageView, ChangeUsernameView, ChangePasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.loginPost, name='login'),
    path('facebook/login/token/', views.FacebookLoginToken, name='facebook_login_token'),
    path('getDetail/', UserDetailView.as_view(), name='user'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('logout/', logoutView.as_view(), name='logout'),

    path('register/', views.register, name='register'),
    path('activate/<uidb64>/<token>/', views.activate_account, name='activate'),

    path('wishlist/add/', views.add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/remove/', views.remove_from_wishlist, name='remove_from_wishlist'),
    path('wishlist/', views.get_wishlist, name='get_wishlist'),

    # Reviews endpoints
    path('movies/<int:movie_id>/reviews/', views.get_movie_reviews, name='get_movie_reviews'),
    path('movies/<int:movie_id>/reviews/add/', views.add_movie_review, name='add_movie_review'),
    path('movies/<int:movie_id>/reviews/delete/', views.delete_movie_review, name='delete_movie_review'),

    path('update-profile/', views.update_profile, name='update_profile'),
    path('upload-profile-image/', UploadProfileImageView.as_view(), name='upload-profile-image'),
    path('change-username/', ChangeUsernameView.as_view(), name='change-username'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]