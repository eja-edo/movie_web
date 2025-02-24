from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import Movies , Genres , Episodes, Moviedirectors, Movieactors 
from apps.people.models import Directors, Actors
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
from .serializers import MovieSerializer, filmSerializer, bannerSerializer, EpisodeSerializer ,DetailSerializer, VideoSerializer, DirectorSerializer
from django.views.decorators.http import require_POST
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated


import re
import os
from django.shortcuts import get_object_or_404
from pathlib import Path
from django.conf import settings

from django.core.paginator import Paginator, EmptyPage

from .models import Movies, Moviegenres, Movieactors, Moviedirectors

# Create your views here.
def normalize_string(s):
    # Chuyển đổi về chữ thường
    s = s.lower()
    # Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    s = s.strip()
    # Loại bỏ khoảng trắng thừa giữa các từ
    s = re.sub(r'\s+', ' ', s)
    s = s.title()
    return s

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

@csrf_exempt
def get_films_by_genre10(request):
    data = json.loads(request.body)
    genre_id = data.get('genre_id')
    movies = Movies.objects.filter(moviegenres__genre_id=genre_id)[:10]


    if movies:  # Kiểm tra xem danh sách phim có rỗng hay không
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"message": "Không tìm thấy phim với thể loại này"}, status=404)


#Lấy video của tập film
def get_video_movie(request, movie_id, episode_id):
    try:
        episode = get_object_or_404(Episodes.objects.select_related('movie'), 
                                    movie_id=movie_id, episode_id=episode_id)
        serializer = VideoSerializer(episode)
        return JsonResponse(serializer.data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


#Lấy thông tin chi tiết của phim
def get_movie_details(request, movie_id):
    # Kiểm tra xem movie_id có phải là số nguyên hợp lệ không
    try:
        movie_id = int(movie_id)
        if movie_id <= 0:
            return Response({'error': 'Invalid movie ID'}, status=400)
    except ValueError:
        return Response({'error': 'Movie ID must be an integer'}, status=400)

    # Truy vấn dữ liệu và xử lý lỗi nếu không tìm thấy phim
    movie = get_object_or_404(
        Movies.objects.prefetch_related(
            'moviegenres_set__genre',  
            'movieactors_set__actor',  
            'moviedirectors_set__director',  
            'episodes_set'  
        ).select_related('nation'),
        movie_id=movie_id
    )

    serializer = DetailSerializer(movie)
    return JsonResponse(serializer.data, safe=False)

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
    

#Lấy danh sách phim theo thể loại
def get_movies_by_genre(request):
    genre_id = request.GET.get('genre_id')  # Lọc theo thể loại
    order_by = request.GET.get('order_by', 'title')  # Mặc định sắp xếp theo title
    page = request.GET.get('page', 1)  # Mặc định lấy trang 1
    per_page = 10  # Số lượng phim trên mỗi trang

    movies = Movies.objects.all()

    # Lọc theo thể loại nếu có genre_id
    if genre_id:
        movies = movies.filter(moviegenres__genre_id=genre_id)

    # Hỗ trợ sắp xếp theo các trường hợp hợp lệ
    valid_order_fields = ['title', '-title', 'release_date', '-release_date']
    if order_by in valid_order_fields:
        movies = movies.order_by(order_by)

    # Phân trang
    paginator = Paginator(movies, per_page)
    try:
        movies_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    # Serialize dữ liệu
    serializer = MovieSerializer(movies_page, many=True)
    return JsonResponse({
        "count": paginator.count,
        "next": movies_page.next_page_number() if movies_page.has_next() else None,
        "previous": movies_page.previous_page_number() if movies_page.has_previous() else None,
        "results": serializer.data
    }, safe=False)
