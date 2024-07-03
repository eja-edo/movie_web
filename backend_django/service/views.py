from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import Users, Movies , Genres
from datetime import datetime
from django.views.decorators.csrf import csrf_protect



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

@csrf_protect
def submit_data(request):
  if request.method == 'POST':
    name = request.POST.get('name')
    email = request.POST.get('email')

    # Xử lý dữ liệu ở đây

    return JsonResponse({'message': 'Data submitted successfully'}, status=200)
  else:
    return JsonResponse({'error': 'Invalid request'}, status=400)