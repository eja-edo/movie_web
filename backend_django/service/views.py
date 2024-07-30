from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import AuthUser, Movies , Genres , Episodes, Actors, Directors, Moviedirectors, Movieactors, ProfileUser
from datetime import datetime
from django.views.decorators.csrf import csrf_protect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.views import View
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.middleware.csrf import CsrfViewMiddleware
import json
import requests
from .serializers import MovieSerializer, filmSerializer, bannerSerializer, episodesSerializer ,DetailSerializer, UserSerializer
from django.views.decorators.http import require_POST
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.conf import settings
from django.contrib.auth.models import User
import re


def normalize_string(s):
    # Chuyển đổi về chữ thường
    s = s.lower()
    # Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    s = s.strip()
    # Loại bỏ khoảng trắng thừa giữa các từ
    s = re.sub(r'\s+', ' ', s)
    s = s.title()
    return s


# # Create a class-based view with CORS configuration
# class CorsMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         response = self.get_response(request)

#         response['Access-Control-Allow-Origin'] = '*'  # Thay đổi thành domain frontend nếu cần
#         response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#         response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

#         return response



# Create your views here.
def get_thinhhanh_10(request):
    movies = Movies.objects.order_by('views')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)


def get_phimhot_10(request):
    movies = Movies.objects.all()[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)


def get_banner_qc(request):

    movies = Movies.objects.all()[:5]
    serializer = bannerSerializer(movies, many = True)
    return JsonResponse(serializer.data, safe = False)
    
def get_phimhh(request):
    movies = Movies.objects.filter(genre__name = 'Phim hoạt hình')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimkinhdi(request):
    movies = Movies.objects.filter(genre__name = 'phim kinh dị')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimhd(request):
    movies = Movies.objects.filter(genre__name = 'phim hành động ')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimtinhcam(request):
    movies = Movies.objects.filter(genre__name = 'phim tình cảm')[:10]
    
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

@csrf_exempt 
def loginPost(request):
    body_data = json.loads(request.body)
    user_name = body_data.get('username')
    password = body_data.get('password') 
    my_user = authenticate(username = user_name , password = password)
    if my_user is None:
        return HttpResponse("don't have user name")
        
    data = {
    'username': user_name,
    'password': password,
    }

    # Gọi API /api/token để lấy token mới
    response = requests.post('http://localhost:8000/service/api/token/', data=data)
    if response.status_code == 200:
        return JsonResponse(response.json(), safe = False)
    else:
        return HttpResponse("cannot get token")


class TestAPIview(APIView):

    def post(self, request):
        return HttpResponse('oke')
        
    def get(self, request):
        return HttpResponse('oke')  # Trả về giá trị của __id

 
class getFilm(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            movie_id = data.get('movie_id')
            episode_num = data.get('episode_num')

            if movie_id is None:
                return Response({"error": "Thiếu movie_id"}, status=status.HTTP_400_BAD_REQUEST)

            movie_id = int(movie_id)

            # Lấy tất cả tập phim thuộc movie_id
            episodes = Episodes.objects.filter(movie_id=movie_id)
            # Nếu người dùng cung cấp episode_num
            if episode_num is not None:
                film = episodes.filter(episode_number=episode_num)
                if not film.exists():
                    return Response({"error": "Không tìm thấy tập phim"}, status=status.HTTP_404_NOT_FOUND)
            else:
                # Nếu không cung cấp episode_num, mặc định lấy tập đầu tiên
                film = episodes[:1]
                if not film.exists():
                    return Response({"error": "Không tìm thấy tập phim"}, status=status.HTTP_404_NOT_FOUND)

            
            film_serializer = filmSerializer(film.first())
            print(film)
            # Lấy danh sách số tập
            episodes_number = episodes.values_list('episode_number', flat=True)

            return Response({'episode_data': film_serializer.data, 'episodes_number': list(episodes_number)}, status=status.HTTP_200_OK)

        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetDetailMovie(APIView):
    def post(self, request):
        try:
            data = request.data
            movie_id = data.get('movie_id')
            movie = Movies.objects.get(movie_id=int(movie_id))
            director_ids = Moviedirectors.objects.filter(movie_id=movie_id).values_list('director_id', flat=True)
            directors = Directors.objects.filter(director_id__in=director_ids).values_list('name', flat=True)
            actor_ids = Movieactors.objects.filter(movie_id=movie_id).values_list('actor_id', flat=True)
            actors = Actors.objects.filter(actor_id__in=actor_ids).values_list('name', flat=True)
            episodes_num = Episodes.objects.filter(movie_id=movie_id).values_list('episode_number',flat=True)
            print(1)
            movie_data = { # Loại bỏ 'movie': movie
                'movie_id': movie.movie_id,  # Truyền movie_id vào data
                'title': movie.title, # Truyền các trường dữ liệu từ movie vào movie_data
                'description': movie.description,
                'release_date': movie.release_date,
                'runtime': movie.runtime,
                'poster_url': movie.poster_url,
                'rating': movie.rating,
                'genre': movie.genre.name, 
                'views': movie.views,
                'directors': list(directors),
                'actors': list(actors),
                'episodes_num':list(episodes_num)
            }
            print(movie_data)
            serializer = DetailSerializer(data=movie_data)
            if serializer.is_valid():
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=400)

        except Movies.DoesNotExist:
            return Response({"error": "Movie not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# class FacebookLogin(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter
#     callback_url = "http://localhost:3000/login"
#     client_class = OAuth2Client

# @csrf_exempt
# def FacebookLoginToken(request):
#     login_view = FacebookLogin.as_view()
#     response = login_view(request)
#     user = request.user
#     print(user)
#     refresh = RefreshToken.for_user(user)
#     print(refresh.access_token)
#     return JsonResponse({
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     })
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

@csrf_exempt
def searchview(request):
    try:
        data = json.loads(request.body)
        keys = data.get('keys')
        normalized_keys = normalize_string(keys)

        movies = Movies.objects.filter(
            title__istartswith=normalized_keys
        ).values_list('title', flat=True)
        return JsonResponse({'movies': list(movies)}, safe=False)
    except Exception as e:
        return Response(status=400, data={'detail': str(e)})