from channels.routing import ProtocolTypeRouter, URLRouter
from channels.layers import get_channel_layer
from channels.security.websocket import AllowedHostsOriginValidator
from apps.comments.routing import websocket_urlpatterns as comments_websocket_urlpatterns
from apps.users.routing import websocket_urlpatterns as users_websocket_urlpatterns
from apps.comments.middleware import JWTAuthMiddlewareStack
import os
import django
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')

django.setup()

# Kết hợp tất cả các websocket_urlpatterns
all_websocket_urlpatterns = comments_websocket_urlpatterns + users_websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Xử lý HTTP request
    "websocket": JWTAuthMiddlewareStack(  # ✅ Dùng JWT để xác thực WebSocket
        URLRouter(all_websocket_urlpatterns)
    ),
})

channel_layer = get_channel_layer()  # Đảm bảo có channel layer
