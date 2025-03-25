from django.urls import re_path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/comments/(?P<episode_id>\w+)/$', ChatConsumer.as_asgi()),
]
