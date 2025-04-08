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
from rest_framework.decorators import api_view, permission_classes
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
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.movies.models import Movies


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

        # Kiểm tra username và email trước khi tạo user
        if User.objects.filter(username=data.get('username')).exists():
            return JsonResponse({'message': 'Username already exists'}, status=400)
        
        if User.objects.filter(email=data.get('email')).exists():
            return JsonResponse({'message': 'Email already exists'}, status=400)

        serializer = RegisterSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()

            # Gửi email xác thực
            current_site = get_current_site(request)
            mail_subject = 'Activate your account'
            uid = urlsafe_base64_encode(force_bytes(user.pk))  # Lấy uid từ user
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

            # 🔹 **Tạo JWT token**
            refresh = RefreshToken.for_user(user)  # Tạo token làm mới
            access = refresh.access_token  # Token truy cập

            # Trả về uid thay cho websocket_key
            return JsonResponse({
                'message': 'Vui lòng kiểm tra email của bạn để xác nhận tài khoản!',
                'uid': uid,  # Thay websocket_key bằng uid
                'refresh': str(refresh),  # ✅ Trả về token làm mới
                'access': str(access)     # ✅ Trả về token truy cập
            }, status=status.HTTP_201_CREATED)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def activate_account(request, uidb64, token):
    try:
        # Giải mã UID từ Base64
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        # Kích hoạt tài khoản
        user.is_active = True
        user.save()
        
        # Gửi thông báo qua WebSocket nếu tài khoản được kích hoạt
        channel_layer = get_channel_layer()
        try:
            # Gửi thông báo đến group WebSocket với key là uid
            async_to_sync(channel_layer.group_send)(
                uidb64,  # Sử dụng UID thay vì user.id
                {
                    "type": "email_verified",
                    "message": "Email đã được xác nhận thành công!"
                }
            )
            print(f"Đã gửi thông báo xác nhận email tới nhóm: email_verification_{uid}")  # Debug
            
        except Exception as e:
            print(f"❌ Lỗi khi gửi WebSocket: {e}")
        
        return JsonResponse({
            'message': 'Email đã được xác nhận thành công!'
        })
    else:
        return JsonResponse({
            'message': 'Link xác nhận không hợp lệ hoặc đã hết hạn!'
        }, status=400)


from django.core.mail import send_mail
from django.conf import settings

def send_test_email():
    subject = "Test Email from Django"
    message = "Hello! This is a test email from Django using Gmail SMTP."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = ["duyanhsadg@example.com"]  # Thay bằng email người nhận

    send_mail(subject, message, from_email, recipient_list)


from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Wishlist
from .serializers import WishlistSerializer
from apps.movies.models import Movies
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    try:
        data = json.loads(request.body)
        movie_id = data.get('movie_id')
        if not movie_id:
            return Response({'error': 'movie_id là bắt buộc'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            movie = Movies.objects.get(pk=movie_id)
        except Movies.DoesNotExist:
            return Response({'error': 'Phim không tồn tại'}, status=status.HTTP_404_NOT_FOUND)
        
        # Tạo data để serializer
        data = {
            'movie': movie.movie_id,
            'user': request.user.id
        }
        
        serializer = WishlistSerializer(data=data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from .serializers import WishlistMovieSerializer
from django.core.paginator import Paginator

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wishlist(request):
    try:
        # Lấy query parameters
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 20)
        
        # Query và phân trang
        wishlist_items = Wishlist.objects.filter(
            user=request.user
        ).select_related('movie').order_by('-created_at')
        
        paginator = Paginator(wishlist_items, page_size)
        page_obj = paginator.get_page(page)
        
        # Serialize dữ liệu
        serializer = WishlistMovieSerializer(page_obj, many=True)
        
        # Chỉ lấy danh sách movie từ kết quả
        movies_data = [item['movie'] for item in serializer.data]
        
        return Response({
            'success': True,
            'page': page_obj.number,
            'total_pages': paginator.num_pages,
            'total_items': paginator.count,
            'data': movies_data  # Chỉ trả về data movie
        })
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

from .models import Reviews
from .serializers import ReviewSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_movie_review(request, movie_id):
    try:
        print(f"Processing review for movie_id: {movie_id}")
        print(f"Request data: {request.data}")
        
        user = request.user
        movie = Movies.objects.get(movie_id=movie_id)
        print(f"Found movie: {movie.title}")
        
        # Try to get existing review
        try:
            review = Reviews.objects.get(movie=movie, user=user)
            print(f"Found existing review: {review.review_id}")
            serializer = ReviewSerializer(review, data=request.data, partial=True, context={'request': request})
        except Reviews.DoesNotExist:
            print("No existing review found, creating new one")
            data = {
                'rating': request.data.get('rating'),
                'comment': request.data.get('comment')
            }
            print(f"New review data: {data}")
            serializer = ReviewSerializer(data=data, context={'request': request, 'movie_id': movie_id})
            
        if serializer.is_valid():
            print("Serializer is valid")
            review = serializer.save()
            print(f"Review saved with ID: {review.review_id}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Movies.DoesNotExist:
        print(f"Movie with ID {movie_id} not found")
        return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        import traceback
        print(f"Error in add_movie_review: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_movie_review(request, movie_id):
    user = request.user
    try:
        review = Reviews.objects.get(movie_id=movie_id, user=user)
        review.delete()
        return Response({"message": "Review đã được xóa thành công."}, status=status.HTTP_200_OK)
    except Reviews.DoesNotExist:
        return Response({"error": "Review không tồn tại hoặc không thuộc về bạn."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_movie_reviews(request, movie_id):
    try:
        reviews = Reviews.objects.filter(movie_id=movie_id).order_by('-create_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
