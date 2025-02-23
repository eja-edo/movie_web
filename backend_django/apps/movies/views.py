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
from .serializers import MovieSerializer, filmSerializer, bannerSerializer, EpisodeSerializer ,DetailSerializer, GenreSerializer
from django.views.decorators.http import require_POST
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated

from django.db.models import Sum
import re
import os
from django.shortcuts import get_object_or_404
from pathlib import Path
from django.conf import settings


from .models import Movies, Moviegenres, Movieactors, Moviedirectors
from .serializers import DetailSerializer, GenreSerializer, ActorSerializer, DirectorSerializer

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


def get_top_genres(request):
    # Truy vấn lấy 5 thể loại có nhiều lượt xem nhất
    top_genres = (
        Genres.objects
        .annotate(total_views=Sum('moviegenres__movie__views'))  # Tổng lượt xem
        .order_by('-total_views')  # Sắp xếp giảm dần
        [:5]  # Giới hạn 5 thể loại
    )
    # Sử dụng serializer để chuyển đổi queryset thành JSON
    if top_genres:
        serializer = GenreSerializer(top_genres, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"message": "Không có thể loại phù hợp"}, status=404)

# class GetDetailMovie(APIView):
#     def post(self, request):
#         try:
#             data = request.data
#             movie_id = data.get('movie_id')
#             movie = Movies.objects.get(movie_id=int(movie_id))
#             director_ids = Moviedirectors.objects.filter(movie_id=movie_id).values_list('director_id', flat=True)
#             directors = Directors.objects.filter(director_id__in=director_ids).values_list('name', flat=True)
#             actor_ids = Movieactors.objects.filter(movie_id=movie_id).values_list('actor_id', flat=True)
#             actors = Actors.objects.filter(actor_id__in=actor_ids).values_list('name', flat=True)
#             episodes_num = Episodes.objects.filter(movie_id=movie_id).values_list('episode_number',flat=True)
#             movie_data = { # Loại bỏ 'movie': movie
#                 'movie_id': movie.movie_id,  # Truyền movie_id vào data
#                 'title': movie.title, # Truyền các trường dữ liệu từ movie vào movie_data
#                 'description': movie.description,
#                 'release_date': movie.release_date,
#                 'runtime': movie.runtime,
#                 'poster_url': movie.poster_url,
#                 'rating': movie.rating,
#                 'genre': movie.genre.name, 
#                 'views': movie.views,
#                 'directors': list(directors),
#                 'actors': list(actors),
#                 'episodes_num':list(episodes_num)
#             }
#             serializer = DetailSerializer(data=movie_data)
#             if serializer.is_valid():
#                 return Response(serializer.data)
#             else:
#                 return Response(serializer.errors, status=400)

#         except Movies.DoesNotExist:
#             return Response({"error": "Movie not found"}, status=404)
#         except Exception as e:
#             return Response({"error": str(e)}, status=500)



def get_movie_details(request, movie_id):
    try:
        movie = Movies.objects.prefetch_related(
            'moviegenres_set__genre',  # Lấy danh sách thể loại
            'movieactors_set__actor',  # Lấy danh sách diễn viên
            'moviedirectors_set__director',  # Lấy danh sách đạo diễn
            'episodes_set'  # Lấy danh sách tập phim
        ).select_related('nation').get(movie_id=movie_id)

        serializer = DetailSerializer(movie)
        return JsonResponse(serializer.data, safe=False)
    except Movies.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)


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
    