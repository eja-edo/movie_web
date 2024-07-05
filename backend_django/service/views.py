from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import Users, Movies , Genres
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




# Create a class-based view with CORS configuration
class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        response['Access-Control-Allow-Origin'] = '*'  # Thay đổi thành domain frontend nếu cần
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

        return response



# Create your views here.
def get_thinhhanh_10(request):
    movies = Movies.objects.order_by('views')[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)
    
def get_phimhot_10(request):
    movies = Movies.objects.all()[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)


def get_banner_qc(request):

    movies = Movies.objects.all()[:5]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id': movie.movie_id,
            'name':movie.title,
            'description':movie.description,
            'trailer_url':movie.trailer_url,
        })
    return JsonResponse(movies_data, safe= False)
    
def get_phimhh(request):
    movies = Movies.objects.all().filter(genre__name = 'Phim hoạt hình')[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)

def get_phimkinhdi(request):
    movies = Movies.objects.all().filter(genre__name = 'phim kinh dị')[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)

def get_phimhd(request):
    movies = Movies.objects.all().filter(genre__name = 'phim hành động ')[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)

def get_phimtinhcam(request):
    movies = Movies.objects.all().filter(genre__name = 'phim tình cảm')[:10]
    movies_data = []
    for movie in movies:
        movies_data.append({
            'id' : movie.movie_id,
            'title' : movie.title,
            'description' : movie.description,
            'release_date' : movie.release_date.date(),
            'runtime' : movie.runtime,
            'poster_url' : movie.poster_url,
            'trailer_url' : movie.trailer_url,
            'movies.rating' : movie.rating,
            'genre' : movie.genre.name,
            'views' : movie.views,
        })
    return JsonResponse(movies_data, safe=False)

@csrf_exempt
def get_contact(request):
    body_data = json.loads(request.body)
    response = HttpResponse("Cookie đã được tạo!")
    response.set_cookie('name', body_data['name'], max_age=3600)  # Tạo cookie có tên 'my_cookie', giá trị 'my_cookie_value' và thời hạn 1 giờ
    return response
    
def get_contact2(request):
    body_data = json.loads(request.body)
     # Tạo cookie có tên 'my_cookie', giá trị 'my_cookie_value' và thời hạn 1 giờ
    return JsonResponse([body_data.name], safe = False)
    
class loginclass(View):
    def get(self, request):
        return render(request, 'login/login.html')
    
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password') 
        # Tạo payload cho token JWT
        payload = jwt_payload_handler(username)
        # Mã hóa token JWT
        token = jwt_encode_handler(payload)
        return Response({
            'token': token,
           'user_id': user.pk,
            'username': user.username
            }, status=status.HTTP_200_OK)

