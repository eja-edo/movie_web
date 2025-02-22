from django.urls import path, include
from . import views



urlpatterns =[
    path('get-html/<int:id>/', views.serve_html, name='serve_html'),
    path("get-news/", views.get_news_list, name="get_news_list"),  # Định tuyến API
]


