from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64
import os
import urllib.parse
from decouple import config


SECRET_KEY = config('ENCRYPTION_KEY')

def safe_encode(s):
    """Mã hóa chuỗi chỉ sử dụng các ký tự an toàn"""
    # Chuyển đổi base64 thành chuỗi an toàn
    safe_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    result = ''
    for c in s:
        if c in safe_chars:
            result += c
        else:
            # Chuyển đổi ký tự không an toàn thành mã hex
            result += f'_{ord(c):02x}'
    return result

def safe_decode(s):
    """Giải mã chuỗi từ các ký tự an toàn"""
    result = ''
    i = 0
    while i < len(s):
        if s[i] == '_' and i + 2 < len(s):
            # Giải mã hex thành ký tự gốc
            hex_code = s[i+1:i+3]
            result += chr(int(hex_code, 16))
            i += 3
        else:
            result += s[i]
            i += 1
    return result

def encrypt_id(id_value):
    """
    Mã hóa ID sử dụng AES và chuyển đổi thành chuỗi an toàn
    """
    try:
        # Chuyển đổi ID thành bytes
        id_bytes = str(id_value).encode('utf-8')
        
        # Tạo IV ngẫu nhiên
        iv = get_random_bytes(AES.block_size)
        
        # Tạo cipher với khóa và IV
        cipher = AES.new(SECRET_KEY.encode('utf-8'), AES.MODE_CBC, iv)
        
        # Mã hóa dữ liệu
        padded_data = pad(id_bytes, AES.block_size)
        encrypted_data = cipher.encrypt(padded_data)
        
        # Kết hợp IV và dữ liệu đã mã hóa
        combined = iv + encrypted_data
        
        # Chuyển đổi sang base64 và mã hóa an toàn
        base64_str = base64.b64encode(combined).decode('utf-8')
        return safe_encode(base64_str)
    except Exception as e:
        print(f"Lỗi mã hóa: {str(e)}")
        return None

def decrypt_id(encrypted_id):
    """
    Giải mã ID đã được mã hóa từ chuỗi an toàn
    """
    try:
        # Giải mã chuỗi an toàn
        base64_str = safe_decode(encrypted_id)
        
        # Chuyển đổi từ base64 về bytes
        combined = base64.b64decode(base64_str)
        
        # Tách IV và dữ liệu đã mã hóa
        iv = combined[:AES.block_size]
        encrypted_data = combined[AES.block_size:]
        
        # Tạo cipher với khóa và IV
        cipher = AES.new(SECRET_KEY.encode('utf-8'), AES.MODE_CBC, iv)
        
        # Giải mã dữ liệu
        decrypted_data = cipher.decrypt(encrypted_data)
        unpadded_data = unpad(decrypted_data, AES.block_size)
        
        # Chuyển đổi về string
        return unpadded_data.decode('utf-8')
    except Exception as e:
        print(f"Lỗi giải mã: {str(e)}")
        return None

def encrypt_list_ids(id_list):
    """
    Mã hóa danh sách các ID
    """
    return [encrypt_id(id_value) for id_value in id_list]

def decrypt_list_ids(encrypted_id_list):
    """
    Giải mã danh sách các ID đã mã hóa
    """
    return [decrypt_id(encrypted_id) for encrypted_id in encrypted_id_list] 