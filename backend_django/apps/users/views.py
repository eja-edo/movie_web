from django.shortcuts import render
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
from .serializers import UserSerializer
from .models import ProfileUser
from rest_framework.response import Response
import requests


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

# Create your views here.
@csrf_exempt
def FacebookLoginToken(request):
    """
    Nhận access token từ Facebook JS SDK, xác minh và trả về JWT token.
    """
    data = json.loads(request.body)
    access_token = data.get('accessToken')

    # Xác minh access token với Facebook (Bắt buộc)
    app_id = settings.SOCIALACCOUNT_PROVIDERS['facebook']['APP']['client_id']
    app_secret = settings.SOCIALACCOUNT_PROVIDERS['facebook']['APP']['secret']
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
            username=user_data.get('id'),
            defaults={
                'email': email,
                'first_name': user_data.get('name'),
            },
        )

        # Tạo JWT token
        refresh = RefreshToken.for_user(user)
        print(refresh)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),

        },safe =False)
    else:
        return Response({'error': 'Access token không hợp lệ.'}, status=400)

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


