import jwt
from django.conf import settings
from channels.auth import AuthMiddlewareStack
from channels.middleware import BaseMiddleware
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async
from channels.exceptions import DenyConnection

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token", [None])[0]

        if not token:
            print("🚫 Không có token, từ chối kết nối WebSocket")
            raise DenyConnection("Token is required")

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = await sync_to_async(User.objects.get)(id=payload["user_id"])
            scope["user"] = user  # Lưu user vào scope
            print(f"✅ Xác thực thành công: {user.username}")
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
            print("❌ Token không hợp lệ")
            raise DenyConnection("Unauthorized")

        return await super().__call__(scope, receive, send)

def JWTAuthMiddlewareStack(inner):
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))


