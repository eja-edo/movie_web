from .encryption_utils import encrypt_id, decrypt_id, safe_encode, safe_decode
import json
from django.urls import resolve
import re
import base64

class IDEncryptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.encrypt_fields = ['id', 'user_id', 'movie_id', 'category_id', 'comment_id']
        self.decrypt_fields = ['id', 'user_id', 'movie_id', 'category_id', 'comment_id']
        self.id_pattern = re.compile(r'/([^/]+)/$')

    def __call__(self, request):
        print(f"🌐 Request PATH TRƯỚC khi giải mã: {request.path}")
        
        self._decrypt_url_path(request)
        self._decrypt_query_params(request)
        
        print(f"✅ Request PATH SAU khi giải mã: {request.path}")  

        response = self.get_response(request)

        if hasattr(response, 'content') and response.get('Content-Type', '').startswith('application/json'):
            try:
                data = json.loads(response.content.decode('utf-8'))
                self._encrypt_response_data(data)
                response.content = json.dumps(data).encode('utf-8')
            except json.JSONDecodeError:
                print("⚠️ Không thể đọc JSON response")

        return response

    def _is_encrypted(self, s):
        try:
            print(f"\n🔍 Kiểm tra mã hóa cho: {s}")
            print(f"1. Kiểm tra có phải là số không...")
            if str(s).isdigit():
                print("   ❌ Là số, không phải ID đã mã hóa")
                return False
                
            print(f"2. Kiểm tra định dạng mã hóa an toàn...")
            try:
                decoded = safe_decode(s)
                if not re.match(r'^[A-Za-z0-9+/=]+$', decoded):
                    print("   ❌ Không phải định dạng base64 hợp lệ")
                    return False
            except:
                print("   ❌ Không phải định dạng mã hóa an toàn hợp lệ")
                return False
                
            print(f"3. Thử giải mã...")
            decrypted = decrypt_id(s)
            is_valid = decrypted is not None and str(decrypted).isdigit()
            print(f"   {'✅' if is_valid else '❌'} Kết quả giải mã: {decrypted}")
            return is_valid
        except Exception as e:
            print(f"⚠️ Lỗi kiểm tra mã hóa {s}: {e}")
            return False

    def _decrypt_url_path(self, request):
        path = request.path
        print(f"\n🔍 Phân tích URL path: {path}")
        
        match = self.id_pattern.search(path)
        new_path = path

        if match:
            potential_id = match.group(1)
            print(f"1. Tìm thấy ID tiềm năng: {potential_id}")
            print(f"2. Vị trí trong URL: {match.span()}")
            
            if self._is_encrypted(potential_id):
                decrypted_id = decrypt_id(potential_id)
                if decrypted_id:
                    new_path = new_path.replace(potential_id, decrypted_id)
                    print(f"3. ✅ Giải mã thành công: {potential_id} -> {decrypted_id}")
                else:
                    print(f"3. ❌ Giải mã thất bại: {potential_id}")
            else:
                print(f"3. ❌ Không phải ID đã mã hóa: {potential_id}")
        else:
            print("1. ❌ Không tìm thấy ID trong URL")

        if new_path != path:
            request.path = new_path
            request.path_info = new_path
            print(f"🔄 URL đã được cập nhật: {new_path}")
        else:
            print("ℹ️ URL không thay đổi")

    def _decrypt_query_params(self, request):
        query_params = request.GET.copy()
        print(f"\n🔍 Phân tích Query Parameters: {dict(query_params)}")
        
        for key in query_params:
            if key in self.decrypt_fields:
                value = query_params[key]
                print(f"\n1. Kiểm tra parameter: {key}={value}")
                
                if self._is_encrypted(value):
                    decrypted_id = decrypt_id(value)
                    if decrypted_id:
                        query_params[key] = decrypted_id
                        print(f"2. ✅ Giải mã thành công: {value} -> {decrypted_id}")
                    else:
                        print(f"2. ❌ Giải mã thất bại: {value}")
                else:
                    print(f"2. ❌ Không phải ID đã mã hóa: {value}")
            else:
                print(f"\n1. Bỏ qua parameter không cần giải mã: {key}")
        
        request.GET = query_params
        print(f"\n📝 Query Parameters sau khi xử lý: {dict(query_params)}")

    def _encrypt_response_data(self, data):
        if isinstance(data, dict):
            for key, value in data.items():
                if key in self.encrypt_fields and value is not None:
                    print(f"\n🔍 Kiểm tra trường cần mã hóa: {key}={value}")
                    if isinstance(value, (int, str)) and str(value).isdigit():
                        encrypted_value = encrypt_id(value)
                        print(f"1. ✅ Mã hóa thành công: {value} -> {encrypted_value}")
                        if encrypted_value is not None:
                            data[key] = encrypted_value
                    else:
                        print(f"1. ❌ Giá trị không phải số: {value}")
                elif isinstance(value, (dict, list)):
                    self._encrypt_response_data(value)
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, (dict, list)):
                    self._encrypt_response_data(item)

    def _decrypt_request_data(self, data):
        if isinstance(data, dict):
            for key, value in data.items():
                if key in self.decrypt_fields and value is not None:
                    print(f"\n🔍 Kiểm tra trường cần giải mã: {key}={value}")
                    if self._is_encrypted(value):
                        decrypted_value = decrypt_id(value)
                        print(f"1. ✅ Giải mã thành công: {value} -> {decrypted_value}")
                        data[key] = decrypted_value
                    else:
                        print(f"1. ❌ Không phải ID đã mã hóa: {value}")
                elif isinstance(value, (dict, list)):
                    self._decrypt_request_data(value)
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, (dict, list)):
                    self._decrypt_request_data(item)
