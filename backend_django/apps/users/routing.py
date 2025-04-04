from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/email-verification/(?P<uid>\w+)/$', consumers.EmailVerificationConsumer.as_asgi()),
]