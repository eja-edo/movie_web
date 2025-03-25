import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.layers import get_channel_layer
import apps.comments.routing  # Import đúng file định tuyến WebSocket
from apps.comments.middleware import JWTAuthMiddlewareStack  # Middleware JWT

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')

django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Xử lý HTTP request
    "websocket": JWTAuthMiddlewareStack(  # ✅ Dùng JWT để xác thực WebSocket
        URLRouter(apps.comments.routing.websocket_urlpatterns)
    ),
})

channel_layer = get_channel_layer()  # Đảm bảo có channel layer
