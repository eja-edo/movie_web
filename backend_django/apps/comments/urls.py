from django.urls import path
from . import views

urlpatterns = [
    path('<int:episode_id>/', views.get_comments, name='get_comments'),
    path('<int:episode_id>/add/', views.add_comment, name='add_comment'),
] 