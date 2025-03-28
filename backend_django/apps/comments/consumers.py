import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.apps import apps
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Kết nối WebSocket và tham gia phòng chat."""
        self.episode_id = self.scope['url_route']['kwargs']['episode_id']
        self.room_group_name = f"comments_{self.episode_id}"
        
        # Kiểm tra xem user có hợp lệ không
        self.user = self.scope.get("user")
        if not self.user or self.user.is_anonymous:
            print("[WebSocket] ❌ User không xác thực!")
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        """Ngắt kết nối khỏi phòng."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        """Xử lý tin nhắn từ client."""
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            print("[WebSocket] ❌ JSON không hợp lệ!")
            return

        message = data.get("message")
        if not message:
            print("[WebSocket] ❌ Thiếu nội dung tin nhắn!")
            return

        # Lưu bình luận vào database
        await self.save_comment(self.user, self.episode_id, message)

        # Gửi tin nhắn đến tất cả client trong phòng
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "username": self.user.username
            }
        )

    @sync_to_async
    def save_comment(self, user, episode_id, message):
        """Lưu bình luận vào database."""
        Comment = apps.get_model('comments', 'Comments')
        Comment.objects.create(user=user, episode_id=episode_id, content=message)

    async def chat_message(self, event):
        """Gửi tin nhắn đến client."""
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "username": event["username"]
        }))
