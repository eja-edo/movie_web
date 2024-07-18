from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import AuthUser, Movies , Genres , Episodes
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
from .serializers import MovieSerializer,filmSerializer,bannerSerializer
from django.views.decorators.http import require_POST


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
    movies = Movies.objects.all().filter(genre__name = 'Phim hoạt hình')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimkinhdi(request):
    movies = Movies.objects.all().filter(genre__name = 'phim kinh dị')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimhd(request):
    movies = Movies.objects.all().filter(genre__name = 'phim hành động ')[:10]
    serializer = MovieSerializer(movies , many = True)
    return JsonResponse(serializer.data , safe = False)

def get_phimtinhcam(request):
    movies = Movies.objects.all().filter(genre__name = 'phim tình cảm')[:10]
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
            movie_id = int(data.get('movie_id'))
            episode_num = data.get('episode_num')

            if episode_num is not None:
                episode_num = int(episode_num)
            else:
                episode_num = 1

            films = Episodes.objects.filter(movie_id=movie_id, episode_number=episode_num)
            serializer = filmSerializer(films, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)  # Sử dụng Response của DRF

        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)