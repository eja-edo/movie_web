from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import Movies , Genres , Episodes, Actors, Directors, Moviedirectors, Movieactors ,News
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
from .serializers import MovieSerializer, filmSerializer, bannerSerializer, episodesSerializer ,DetailSerializer, GenreSerializer
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
    
# def get_phimhh(request):
#     movies = Movies.objects.filter(genre__name = 'Phim hoạt hình')[:10]
#     serializer = MovieSerializer(movies , many = True)
#     return JsonResponse(serializer.data , safe = False)

# def get_phimkinhdi(request):
#     movies = Movies.objects.filter(genre__name = 'phim kinh dị')[:10]
#     serializer = MovieSerializer(movies , many = True)
#     return JsonResponse(serializer.data , safe = False)

# def get_phimhd(request):
#     movies = Movies.objects.filter(genre__name = 'phim hành động ')[:10]
#     serializer = MovieSerializer(movies , many = True)
#     return JsonResponse(serializer.data , safe = False)

# def get_phimtinhcam(request):
#     movies = Movies.objects.filter(genre__name = 'phim tình cảm')[:10]
    
#     serializer = MovieSerializer(movies , many = True)
#     return JsonResponse(serializer.data , safe = False)


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



class TestAPIview(APIView):

    def post(self, request):
        return HttpResponse('oke')
        
    def get(self, request):
        return HttpResponse('oke')  # Trả về giá trị của __id

 


# def stream_video_view(request):
#     video_path = request.GET.get('path')  # Đường dẫn tương đối của video
#     if not video_path:
#         return HttpResponse("Missing 'path' parameter", status=400)

#     file_path = os.path.join(settings.STATIC_ROOT, video_path).replace('\\', '/')
#     if not os.path.exists(file_path):
#         return HttpResponse("Video file not found", status=404)

#     # Lấy Range header từ request
#     range_header = request.headers.get('Range', None)
#     file_size = os.path.getsize(file_path)

#     if range_header:
#         range_match = re.match(r"bytes=(\d+)-(\d*)", range_header)
#         if not range_match:
#             return HttpResponse(status=416)  # Requested Range Not Satisfiable

#         start = int(range_match.group(1))
#         end = int(range_match.group(2)) if range_match.group(2) else file_size - 1
#         if start >= file_size:
#             return HttpResponse(status=416)

#         chunk_size = end - start + 1
#         response = StreamingHttpResponse(
#             stream_file(file_path, start, chunk_size),
#             status=206,
#             content_type="video/mp4",
#         )
#         response['Content-Range'] = f"bytes {start}-{end}/{file_size}"
#         response['Accept-Ranges'] = 'bytes'
#         response['Content-Length'] = str(chunk_size)
#     else:
#         response = StreamingHttpResponse(
#             stream_file(file_path, 0, file_size),
#             content_type="video/mp4",
#         )
#         response['Content-Length'] = str(file_size)

#     response['Content-Disposition'] = f'inline; filename="{os.path.basename(file_path)}"'
#     return response

# def stream_file(file_path, start, length):
#     """Generator để đọc từng phần tệp video."""
#     with open(file_path, 'rb') as file:
#         file.seek(start)
#         while length > 0:
#             chunk_size = min(8192, length)
#             data = file.read(chunk_size)
#             if not data:
#                 break
#             yield data
#             length -= chunk_size




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
    


def serve_html(request, id):
    # Lấy bản ghi từ PostgreSQL theo id
    news_item = get_object_or_404(News, news_id=id)

    # Lấy đường dẫn file HTML từ content_url
    file_path = os.path.join(settings.BASE_DIR, news_item.content_url)

    print(f"📌 Checking file path: {file_path}")  # Debug đường dẫn file

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        return HttpResponse(html_content, content_type="text/html")
    else:
        return HttpResponse(f"🚨 File not found: {file_path}", status=404)

from django.http import JsonResponse
from .models import News

def get_news_list(request):
    news_items = News.objects.all().order_by("-publish_date")[:12]  # Lấy 10 bài mới nhất
    news_list = [
        {
            "id": item.news_id,
            "title": item.title,
            "content": item.main_content[:200] + "...",  # Giới hạn nội dung
            "image_url": item.image_url if item.image_url else "",  # Kiểm tra ảnh
        }
        for item in news_items
    ]
    return JsonResponse({"news": news_list}, safe=False)


# def serve_html(request, id=None):  # Cho phép id là None
#     id = 3  # Gán tạm id cố định là 1

#     # Lấy bản ghi từ database
#     news_item = get_object_or_404(News, news_id=id)

#     # Lấy đường dẫn file HTML từ content_url
#     file_path = os.path.join(settings.BASE_DIR, news_item.content_url)

#     print(f"📌 Checking file path: {file_path}")  # Debug đường dẫn file

#     if os.path.exists(file_path):
#         with open(file_path, 'r', encoding='utf-8') as file:
#             html_content = file.read()
#         return HttpResponse(html_content, content_type="text/html")
#     else:
#         return HttpResponse(f"🚨 File not found: {file_path}", status=404)



#  def serve_html(request):
#     # if not file_name.endswith('.html'):
#     #     return HttpResponse("Invalid file type", status=400)
    
#     file_path = os.path.join(settings.BASE_DIR,"static/assets/docx/melo2/melo2.html")
#    # sử dụng đường dẫn thay thế cho path join 

#     # In ra để kiểm tra
#     print(f"📌 Checking file path: {file_path}")

#     if os.path.exists(file_path):
#         with open(file_path, 'r', encoding='utf-8') as file:
#             html_content = file.read()
#         return HttpResponse(html_content, content_type="text/html")
#     else:
#         return HttpResponse(f"🚨 File not found: {file_path}", status=404)

    

# def serve_html(request):
#     # Đường dẫn đến file HTML cần gửi
#     file_path = os.path.join('static', 'assets', 'docx', 'flow.html')

#     # Đọc nội dung file HTML
#     if os.path.exists(file_path):
#         with open(file_path, 'r', encoding='utf-8') as file:
#             html_content = file.read()
#         return HttpResponse(html_content, content_type="text/html")
#     else:
#         return HttpResponse("File not found", status=404)