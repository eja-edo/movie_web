import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.apps import apps
from asgiref.sync import sync_to_async
from django.core.exceptions import ObjectDoesNotExist

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Kết nối WebSocket và tham gia phòng chat."""
        self.episode_id = self.scope['url_route']['kwargs']['episode_id']
        self.room_group_name = f"comments_{self.episode_id}"

        # Thêm user vào group của tập phim
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        """Rời khỏi group khi disconnect."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        """Xử lý tin nhắn từ client gửi đến."""
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            print("[WebSocket] Lỗi: Dữ liệu nhận được không hợp lệ!")
            return  # Bỏ qua nếu không phải JSON hợp lệ

        message = data.get('message')
        user_id = data.get('user_id')

        if not message or not user_id:
            print("[WebSocket] Lỗi: Thiếu dữ liệu message hoặc user_id!")
            return  # Bỏ qua nếu thiếu dữ liệu

        # Lấy user từ database
        user = await self.get_user(user_id)
        if not user:
            print(f"[WebSocket] Lỗi: User ID {user_id} không tồn tại!")
            return  # Bỏ qua nếu user không tồn tại

        # Lưu bình luận vào database
        await self.save_comment(user, self.episode_id, message)

        # Gửi tin nhắn đến tất cả client trong phòng
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user_id': user.id,
                'username': user.username  # Gửi thêm tên user
            }
        )

    async def get_user(self, user_id):
        """Lấy user từ database một cách an toàn."""
        try:
            User = await sync_to_async(apps.get_model)('auth', 'User')
            return await sync_to_async(User.objects.get)(id=user_id)
        except ObjectDoesNotExist:
            return None

    async def save_comment(self, user, episode_id, message):
        """Lưu bình luận vào database."""
        try:
            Comment = await sync_to_async(apps.get_model)('comments', 'Comments')
            await sync_to_async(Comment.objects.create)(
                user=user,
                episode_id=episode_id,
                content=message
            )
        except Exception as e:
            print(f"[WebSocket] Lỗi khi lưu bình luận: {e}")

    async def chat_message(self, event):
        """Gửi tin nhắn đến client."""
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'user_id': event['user_id'],
            'username': event['username']
        }))
