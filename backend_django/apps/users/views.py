from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.conf import settings
from django.contrib.auth.models import User
import json
from .serializers import UserSerializer, RegisterSerializer
from .models import ProfileUser
from rest_framework.response import Response
import requests
from rest_framework import generics, status
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from django.http import JsonResponse


@csrf_exempt
def loginPost(request):
    if request.method == 'POST':
        body_data = json.loads(request.body)
        user_name = body_data.get('username')
        password = body_data.get('password')
        user = authenticate(username=user_name, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

# # Create your views here.
# @csrf_exempt
# def FacebookLoginToken(request):
#     """
#     Nhận access token từ Facebook JS SDK, xác minh và trả về JWT token.
#     """
#     data = json.loads(request.body)
#     access_token = data.get('accessToken')

#     # Xác minh access token với Facebook (Bắt buộc)
#     app_id = settings.SOCIALACCOUNT_PROVIDERS['facebook']['APP']['client_id']
#     app_secret = settings.SOCIALACCOUNT_PROVIDERS['facebook']['APP']['secret']
#     url = f'https://graph.facebook.com/debug_token?input_token={access_token}&access_token={app_id}|{app_secret}'
#     response = requests.get(url)
#     data = response.json()

#     if data.get('data') and data['data'].get('is_valid'):
#         user_url = f'https://graph.facebook.com/me?fields=id,name,email&access_token={access_token}'
#         response = requests.get(user_url)
#         user_data = response.json()
#         email = user_data.get('email')
#         if not email:
#             email = f"{user_data.get('id')}@facebook.com"  # Thay 'example.com' bằng domain của bạn
#         # Tìm hoặc tạo người dùng Django
#         user, created = User.objects.get_or_create(
#             username=user_data.get('id'),
#             defaults={
#                 'email': email,
#                 'first_name': user_data.get('name'),
#             },
#         )

#         # Tạo JWT token
#         refresh = RefreshToken.for_user(user)
#         print(refresh)
#         return JsonResponse({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),

#         },safe =False)
#     else:
#         return Response({'error': 'Access token không hợp lệ.'}, status=400)









@csrf_exempt
def FacebookLoginToken(request):
    data = json.loads(request.body)
    access_token = data.get('accessToken')

    # Xác minh access token với Facebook
    app = SocialApp.objects.get(provider='facebook')
    app_id = app.client_id
    app_secret = app.secret
    url = f'https://graph.facebook.com/debug_token?input_token={access_token}&access_token={app_id}|{app_secret}'
    response = requests.get(url)
    data = response.json()

    if data.get('data') and data['data'].get('is_valid'):
        user_url = f'https://graph.facebook.com/me?fields=id,name,email&access_token={access_token}'
        response = requests.get(user_url)
        user_data = response.json()
        email = user_data.get('email')
        if not email:
            email = f"face{user_data.get('id')}@example.com"  # Thay 'example.com' bằng domain của bạn

        # Tìm hoặc tạo người dùng Django
        user, created = User.objects.get_or_create(
            username=user_data['id'],
            defaults={
                'email': email,
                'first_name': user_data.get('name'),
            },
        )

        # Tạo hoặc lấy SocialAccount
        social_account, created = SocialAccount.objects.get_or_create(
            user=user,
            provider='facebook',
            uid=user_data['id'],
            defaults={
                'extra_data': user_data
            }
        )

        # Tạo hoặc lấy SocialToken
        token, token_created = SocialToken.objects.get_or_create(
            app_id=app.id,
            account=social_account,
            defaults={'token': access_token}
        )

        if not token_created:
            # Nếu token đã tồn tại, bạn có thể cập nhật thông tin của nó
            token.token = access_token
            token.save()

        # Tạo JWT token
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, safe=False)
    else:
        return JsonResponse({'error': 'Access token không hợp lệ.'}, status=400)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        user = serializer.data
        url_avt = ProfileUser.objects.filter(id = user['id']).first()
        if url_avt is not None:
            url_avt = url_avt.get('url_img')
        user['url_avt'] = url_avt
        user.pop('id')
        return Response(user)

class logoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refreshToken  = json.loads(request.body).get('refreshToken')
            token = RefreshToken(refreshToken)
            token.blacklist()
            return Response(status=205)
        except Exception as e:
            return Response(status=400, data={'detail': str(e)})

# @csrf_exempt
# def register(request):
#     data = json.loads(request.body)
#     print(data)

#     # Check if username exists
#     try:
#         User.objects.get(username=data['username'])
#         return JsonResponse({'message': ('Username already exists')}, safe = False)
#     except User.DoesNotExist:
#         print(data)
#         # Create the user (get_or_create is not necessary here)
#         user = User.objects.create(
#             username=data['username'],
#             email=data['email'],
#             password=make_password(data['password1'])
#         )

#         # Generate JWT tokens
#         refresh = RefreshToken.for_user(user)

#         # Return the response
#         return JsonResponse({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }, safe=False)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON'}, status=400)

        # Kiểm tra username trước khi tạo user
        if User.objects.filter(username=data.get('username')).exists():
            return JsonResponse({'message': 'Username already exists'}, status=400)

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            # Gửi email xác thực
            current_site = get_current_site(request)
            mail_subject = 'Activate your account'
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            message = render_to_string('acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': uid,
                'token': token,
            })

            # Sử dụng EmailMultiAlternatives để gửi email HTML
            email = EmailMultiAlternatives(
                mail_subject, "", settings.DEFAULT_FROM_EMAIL, [user.email]
            )
            email.attach_alternative(message, "text/html")
            email.send()

            return JsonResponse(
                {'message': 'Please confirm your email address to complete the registration'},
                status=status.HTTP_201_CREATED
            )

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def activate_account(request, uidb64, token):
    try:
        # Giải mã user ID từ chuỗi uidb64
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    # Kiểm tra token hợp lệ
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True  # Kích hoạt tài khoản
        user.save()
        return HttpResponse("Your account has been activated! You can now log in.")  
    else:
        return HttpResponse("Activation link is invalid!", status=400)


from django.core.mail import send_mail
from django.conf import settings

def send_test_email():
    subject = "Test Email from Django"
    message = "Hello! This is a test email from Django using Gmail SMTP."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = ["duyanhsadg@example.com"]  # Thay bằng email người nhận

    send_mail(subject, message, from_email, recipient_list)
