import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class EmailVerificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Kết nối WebSocket để xác nhận email bằng uid."""
        try:
            # Lấy uid từ URL route kwargs
            self.uid = self.scope['url_route']['kwargs'].get('uid')
            if not self.uid:
                await self.close()
                return

            # Sử dụng uid làm room group name
            self.room_group_name = self.uid

            # Thêm vào group và chấp nhận kết nối
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            print(f"[EmailVerification] ✅ WebSocket kết nối thành công với UID {self.uid}")

        except Exception as e:
            print(f"[EmailVerification] ❌ Lỗi kết nối: {str(e)}")
            await self.close()

    async def disconnect(self, close_code):
        """Ngắt kết nối khỏi group."""
        try:
            # Ngắt kết nối khỏi nhóm
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
            print(f"[EmailVerification] ✅ Ngắt kết nối WebSocket với UID {self.uid}")

        except Exception as e:
            print(f"[EmailVerification] ❌ Lỗi khi ngắt kết nối: {str(e)}")

    async def email_verified(self, event):
        """Gửi thông báo xác nhận email thành công đến client."""
        try:
            # Gửi thông báo qua WebSocket
            await self.send(text_data=json.dumps({
                'type': 'email_verified',
                'message': 'Email đã được xác nhận thành công!'
            }))
            print(f"[EmailVerification] ✅ Đã gửi xác nhận email với UID {self.uid}")
            
            # Chờ một chút trước khi đóng kết nối
            await asyncio.sleep(2)
            await self.close()
            print(f"[EmailVerification] ✅ Đã ngắt kết nối sau khi xác nhận email với UID {self.uid}")
            
        except Exception as e:
            print(f"[EmailVerification] ❌ Lỗi khi xử lý xác nhận email: {str(e)}")
            await self.close()
