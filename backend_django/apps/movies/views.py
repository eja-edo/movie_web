from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse,HttpResponse
from .models import Movies , Episodes, Moviedirectors, Movieactors 
from apps.core.models import Nations , Genres
from apps.people.models import Directors, Actors
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
from .serializers import MovieSerializer, filmSerializer, bannerSerializer, EpisodeSerializer ,DetailSerializer, VideoSerializer, DirectorSerializer, SearchSerializer
from django.views.decorators.http import require_POST
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from thefuzz import fuzz, process

import re
import os
from django.shortcuts import get_object_or_404
from pathlib import Path
from django.conf import settings

from django.core.paginator import Paginator, EmptyPage

from .models import Movies, Moviegenres, Movieactors, Moviedirectors

from django.db.models import Q

import base64

from rest_framework.pagination import PageNumberPagination
from apps.users.models import Reviews
from apps.users.serializers import ReviewSerializer
from apps.users.views import add_movie_review

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

# def get_thinhhanh_10(request):
#     movies = Movies.objects.order_by('views')[:10]
#     serializer = MovieSerializer(movies , many = True)
#     return JsonResponse(serializer.data , safe = False)

from django.db.models import Count, F, FloatField, ExpressionWrapper

def get_thinhhanh_10(request):
    # Tính toán lượt xem trung bình cho mỗi bộ phim
    movies = Movies.objects.annotate(
        episodes_count=Count('episodes'),  # Sửa từ 'episode_set' thành 'episodes' (related_name mặc định)
        average_views=ExpressionWrapper(
            F('views') / F('episodes_count'), 
            output_field=FloatField()
        )
    ).filter(episodes_count__gt=0)  # Chỉ lấy những bộ phim có ít nhất một tập phim
    
    # Lấy 10 bộ phim có lượt xem trung bình cao nhất
    top_movies = movies.order_by('-average_views')[:10]

    # Chuyển đổi dữ liệu thành JSON sử dụng MovieSerializer
    serializer = MovieSerializer(top_movies, many=True)
    
    return JsonResponse(serializer.data, safe=False)

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
@api_view(['GET'])
def get_video_movie(request, movie_id, episode_id):
    try:
        # Lấy tập phim đang xem
        episode = get_object_or_404(Episodes.objects.select_related('movie'), 
                                    movie_id=movie_id, episode_id=episode_id)

        # Lấy danh sách các tập khác của cùng bộ phim, sắp xếp theo tập
        episodes_list = Episodes.objects.filter(movie_id=movie_id).order_by('episode_id')

        # Serialize dữ liệu
        episode_serializer = VideoSerializer(episode)
        episodes_list_serializer = EpisodeSerializer(episodes_list, many=True)

        return JsonResponse({
            "current_episode": episode_serializer.data,
            "episodes_list": episodes_list_serializer.data
        }, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


#Lấy thông tin chi tiết của phim
def get_movie_details(request, movie_id):
    # Kiểm tra xem movie_id có phải là số nguyên hợp lệ không
    try:
        movie_id = int(movie_id)
        if movie_id <= 0:
            return JsonResponse({'error': 'Invalid movie ID'}, status=400)
    except ValueError:
        return JsonResponse({'error': 'Movie ID must be an integer'}, status=400)

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

#Tìm kiếm phim
from django.db.models import Q, Case, When, Value, IntegerField


def search_movies(request):
    query = request.GET.get('q', '').strip()
    
    if not query:
        return JsonResponse({'error': 'No search query provided'}, status=400)

    # Nếu query quá ngắn, chỉ tìm kiếm đơn giản với ưu tiên title trước
    if len(query) < 3:
        matched_movies = Movies.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query)
        ).annotate(
            match_priority=Case(
                When(title__icontains=query, then=Value(1)),
                default=Value(2),
                output_field=IntegerField()
            )
        ).order_by('match_priority')[:10]
        
        serializer = SearchSerializer(matched_movies, many=True)
        return JsonResponse({"movies": serializer.data}, safe=False)

    # Tìm kiếm chính xác trước
    exact_matches = Movies.objects.filter(title__iexact=query)
    if exact_matches.exists():
        serializer = SearchSerializer(exact_matches, many=True)
        return JsonResponse({"movies": serializer.data}, safe=False)

    # Tìm kiếm gần đúng với title trước
    title_matches = Movies.objects.filter(title__icontains=query)
    
    # Nếu có kết quả từ title thì ưu tiên trả về
    if title_matches.exists():
        # Sắp xếp theo độ tương đồng với title
        title_matches = sorted(
            title_matches,
            key=lambda x: fuzz.ratio(query.lower(), x.title.lower()),
            reverse=True
        )[:10]
        serializer = SearchSerializer(title_matches, many=True)
        return JsonResponse({"movies": serializer.data}, safe=False)

    # Nếu không có kết quả từ title, thực hiện tìm kiếm mở rộng
    movies = Movies.objects.all()
    
    # Tạo danh sách dữ liệu để fuzzy search
    movie_data = [
        (
            movie.movie_id, 
            movie.title, 
            movie.description,
            ', '.join([genre.genre.name for genre in movie.moviegenres_set.all()]),
            ', '.join([actor.actor.name for actor in movie.movieactors_set.all()]),
            ', '.join([director.director.name for director in movie.moviedirectors_set.all()])
        ) for movie in movies
    ]

    # Kết hợp dữ liệu thành một chuỗi để fuzzy search
    combined_data = [
        f"{title} {description} {genres} {actors} {directors}" 
        for _, title, description, genres, actors, directors in movie_data
    ]

    # Thực hiện fuzzy search và ưu tiên kết quả có title khớp trước
    fuzzy_results = process.extractBests(
        query, 
        combined_data, 
        scorer=fuzz.token_set_ratio, 
        score_cutoff=50, 
        limit=20
    )
    
    if not fuzzy_results:
        # Nếu không có kết quả fuzzy, tìm kiếm đơn giản
        matched_movies = Movies.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(moviegenres__genre__name__icontains=query) |
            Q(movieactors__actor__name__icontains=query) |
            Q(moviedirectors__director__name__icontains=query)
        ).distinct()[:10]
    else:
        # Xử lý kết quả fuzzy và ưu tiên title
        try:
            matched_indices = [result[2] for result in fuzzy_results]
        except IndexError:
            try:
                matched_indices = [combined_data.index(result[0]) for result in fuzzy_results]
            except ValueError:
                matched_indices = []

        # Tạo dictionary để lưu điểm số và ưu tiên title
        movie_scores = {}
        for idx in matched_indices:
            movie_id = movie_data[idx][0]
            title_score = fuzz.ratio(query.lower(), movie_data[idx][1].lower())
            overall_score = fuzzy_results[matched_indices.index(idx)][1] if len(fuzzy_results[0]) > 1 else 0
            
            # Ưu tiên title score cao hơn
            combined_score = title_score * 2 + overall_score
            movie_scores[movie_id] = combined_score

        # Sắp xếp theo điểm số
        sorted_movie_ids = sorted(movie_scores.keys(), key=lambda x: movie_scores[x], reverse=True)
        matched_movies = Movies.objects.filter(movie_id__in=sorted_movie_ids[:10])
        
        # Đảm bảo thứ tự như đã sắp xếp
        order = Case(*[When(movie_id=movie_id, then=pos) for pos, movie_id in enumerate(sorted_movie_ids[:10])])
        matched_movies = matched_movies.order_by(order)

    serializer = SearchSerializer(matched_movies, many=True)
    return JsonResponse({"movies": serializer.data}, safe=False)


def search_full_movies(request):
    query = request.GET.get('q', '').strip()
    page = int(request.GET.get('page', 1))  # Mặc định lấy trang 1
    per_page = int(request.GET.get('per_page', 10))  # Số phim mỗi trang

    if not query:
        return JsonResponse({'error': 'No search query provided'}, status=400)

    # 1. Tìm kiếm chính xác trước
    exact_matches = Movies.objects.filter(title__iexact=query)
    if exact_matches.exists():
        paginator = Paginator(exact_matches, per_page)
        current_page = paginator.page(page)
        serializer = MovieSerializer(current_page, many=True)
        return JsonResponse({
            "total_pages": paginator.num_pages,
            "total_videos": paginator.count,
            "page": current_page.number,
            "Title": {"Kết quả hiển thị theo từ khóa": query},
            "results": serializer.data
        }, safe=False)

    # 2. Tìm kiếm gần đúng trong title
    title_matches = Movies.objects.filter(title__icontains=query)
    if title_matches.exists():
        # Sắp xếp theo độ tương đồng với title
        sorted_matches = sorted(
            title_matches,
            key=lambda x: fuzz.ratio(query.lower(), x.title.lower()),
            reverse=True
        )
        # Tạo paginator từ danh sách đã sắp xếp
        paginator = Paginator(sorted_matches, per_page)
        current_page = paginator.page(page)
        serializer = MovieSerializer(current_page, many=True)
        return JsonResponse({
            "total_pages": paginator.num_pages,
            "total_videos": paginator.count,
            "page": current_page.number,
            "Title": {"Kết quả hiển thị theo từ khóa": query},
            "results": serializer.data
        }, safe=False)

    # 3. Nếu query ngắn (<3 ký tự), chỉ tìm trong title và description
    if len(query) < 3:
        matched_movies = Movies.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query)
        ).annotate(
            match_priority=Case(
                When(title__icontains=query, then=Value(1)),
                default=Value(2),
                output_field=IntegerField()
            )
        ).order_by('match_priority')
    else:
        # 4. Tìm kiếm mở rộng với fuzzy search
        movies = Movies.objects.all()
        
        # Chuẩn bị dữ liệu cho fuzzy search
        movie_data = [
            (
                movie.movie_id, 
                movie.title, 
                movie.description,
                ', '.join([genre.genre.name for genre in movie.moviegenres_set.all()]),
                ', '.join([actor.actor.name for actor in movie.movieactors_set.all()]),
                ', '.join([director.director.name for director in movie.moviedirectors_set.all()])
            ) for movie in movies
        ]

        combined_data = [
            f"{title} {description} {genres} {actors} {directors}" 
            for _, title, description, genres, actors, directors in movie_data
        ]

        # Fuzzy search với ưu tiên title
        fuzzy_results = process.extractBests(
            query, 
            combined_data, 
            scorer=fuzz.token_set_ratio, 
            score_cutoff=50,
            limit=100
        )

        # Xử lý kết quả và tính điểm ưu tiên
        movie_scores = {}
        for result in fuzzy_results:
            try:
                if len(result) == 3:  # (text, score, index)
                    idx = result[2]
                else:  # (text, score)
                    idx = combined_data.index(result[0])
                
                movie_id = movie_data[idx][0]
                title_score = fuzz.ratio(query.lower(), movie_data[idx][1].lower())
                overall_score = result[1] if len(result) > 1 else 0
                
                # Ưu tiên title score cao hơn
                combined_score = title_score * 2 + overall_score
                movie_scores[movie_id] = combined_score
            except (IndexError, ValueError):
                continue

        if movie_scores:
            # Sắp xếp theo điểm số
            sorted_movie_ids = sorted(movie_scores.keys(), key=lambda x: movie_scores[x], reverse=True)
            matched_movies = Movies.objects.filter(movie_id__in=sorted_movie_ids)
            
            # Đảm bảo thứ tự như đã sắp xếp
            order = Case(*[When(movie_id=movie_id, then=pos) for pos, movie_id in enumerate(sorted_movie_ids)])
            matched_movies = matched_movies.order_by(order)
        else:
            # Fallback nếu fuzzy search không có kết quả
            matched_movies = Movies.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query) |
                Q(moviegenres__genre__name__icontains=query) |
                Q(movieactors__actor__name__icontains=query) |
                Q(moviedirectors__director__name__icontains=query)
            ).distinct()

    # Phân trang
    paginator = Paginator(matched_movies, per_page)
    try:
        current_page = paginator.page(page)
    except EmptyPage:
        current_page = paginator.page(paginator.num_pages)

    serializer = MovieSerializer(current_page, many=True)

    return JsonResponse({
        "total_pages": paginator.num_pages,
        "total_videos": paginator.count,
        "page": current_page.number,
        "Title": {"Kết quả hiển thị theo từ khóa": query},
        "results": serializer.data
    }, safe=False)
    
#Phân trang theo thể loại
def get_movies_by_genre(request):
    genre_id = request.GET.get('genre_id')  # Lọc theo thể loại
    order_by = request.GET.get('order_by', 'title')  # Mặc định sắp xếp theo title
    page = int(request.GET.get('page', 1))  # Mặc định lấy trang 1
    per_page = 10  # Số lượng phim trên mỗi trang

    movies = Movies.objects.all()
    genre_name = "Tất cả thể loại"  # Mặc định nếu không có genre_id hoặc không tìm thấy

    # Lọc theo thể loại nếu có genre_id hợp lệ
    if genre_id:
        genre = Genres.objects.filter(genre_id=genre_id).first()
        if genre:
            movies = movies.filter(moviegenres__genre_id=genre_id)
            genre_name = str(genre.name)

    # Hỗ trợ sắp xếp theo các trường hợp hợp lệ
    valid_order_fields = ['title', '-title', 'release_date', '-release_date']
    if order_by in valid_order_fields:
        movies = movies.order_by(order_by)

    # Phân trang
    paginator = Paginator(movies, per_page)
    total_pages = paginator.num_pages  # Lấy tổng số trang

    try:
        movies_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    # Serialize dữ liệu
    serializer = MovieSerializer(movies_page, many=True)

    return JsonResponse({
        "total_pages": total_pages,
        "total_videos": len(movies_page),
        "page": page,
        "Title": {"Thể Loại": genre_name},
        "results": serializer.data
    }, safe=False)

#phân trang theo quốc gia
def get_movies_by_nation(request):
    nation_id = request.GET.get('nation_id')  # Lọc theo quốc gia
    order_by = request.GET.get('order_by', 'title')  # Mặc định sắp xếp theo title
    page = int(request.GET.get('page', 1))  # Mặc định lấy trang 1
    per_page = 10  # Số lượng phim trên mỗi trang

    movies = Movies.objects.all()
    nation_name = "Tất cả quốc gia"  # Mặc định nếu không có nation_id hoặc không tìm thấy

    # Lọc theo quốc gia nếu có nation_id hợp lệ
    if nation_id:
        nation = Nations.objects.filter(nation_id=nation_id).first()
        if nation:
            movies = movies.filter(nation_id=nation_id)
            nation_name = str(nation.name)  # Chuyển thành chuỗi để tránh lỗi JSON

    # Hỗ trợ sắp xếp theo các trường hợp hợp lệ
    valid_order_fields = ['title', '-title', 'release_date', '-release_date']
    if order_by in valid_order_fields:
        movies = movies.order_by(order_by)

    # Phân trang
    paginator = Paginator(movies, per_page)
    total_pages = paginator.num_pages  # Lấy tổng số trang

    try:
        movies_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    # Serialize dữ liệu
    serializer = MovieSerializer(movies_page, many=True)

    return JsonResponse({
        "total_pages": total_pages,
        "total_videos": len(movies_page),
        "page": page,
        "Title": {"Quốc gia": nation_name},  # Đảm bảo đây là chuỗi hợp lệ
        "results": serializer.data
    }, json_dumps_params={'ensure_ascii': False}, safe=False)




def get_movies_by_actor(request):
    actor_id = request.GET.get('actor_id')  # Lọc theo diễn viên
    order_by = request.GET.get('order_by', 'title')  # Sắp xếp theo tiêu chí, mặc định là title
    page = int(request.GET.get('page', 1))  # Trang mặc định là 1
    per_page = 10  # Số phim mỗi trang

    movies = Movies.objects.all()
    actor_name = "Tất cả diễn viên"  # Mặc định nếu không có actor_id hoặc không tìm thấy

    # Lọc theo diễn viên nếu có actor_id hợp lệ
    if actor_id:
        actor = Actors.objects.filter(actor_id=actor_id).first()
        if actor:
            movies = movies.filter(movie_id__in=Movieactors.objects.filter(actor_id=actor_id).values_list('movie_id', flat=True))
            actor_name = str(actor.name)  # Chuyển thành chuỗi để tránh lỗi JSON

    # Hỗ trợ sắp xếp theo các trường hợp hợp lệ
    valid_order_fields = ['title', '-title', 'release_date', '-release_date']
    if order_by in valid_order_fields:
        movies = movies.order_by(order_by)

    # Phân trang
    paginator = Paginator(movies, per_page)
    total_pages = paginator.num_pages  # Lấy tổng số trang

    try:
        movies_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    # Serialize dữ liệu
    serializer = MovieSerializer(movies_page, many=True)

    return JsonResponse({
        "total_pages": total_pages,
        "total_videos": len(movies_page),
        "page": page,
        "Title": {"Diễn viên": actor_name},  # Đảm bảo đây là chuỗi hợp lệ
        "results": serializer.data
    }, json_dumps_params={'ensure_ascii': False}, safe=False)


def get_movies_by_director(request):
    director_id = request.GET.get('director_id')  # Lọc theo đạo diễn
    order_by = request.GET.get('order_by', 'title')  # Sắp xếp theo tiêu chí, mặc định là title
    page = int(request.GET.get('page', 1))  # Trang mặc định là 1
    per_page = 10  # Số phim mỗi trang

    movies = Movies.objects.all()
    director_name = "Tất cả đạo diễn"  # Mặc định nếu không có director_id hoặc không tìm thấy

    # Lọc theo đạo diễn nếu có director_id hợp lệ
    if director_id:
        director = Directors.objects.filter(director_id=director_id).first()
        if director:
            movies = movies.filter(movie_id__in=Moviedirectors.objects.filter(director_id=director_id).values_list('movie_id', flat=True))
            director_name = str(director.name)  # Chuyển thành chuỗi để tránh lỗi JSON

    # Hỗ trợ sắp xếp theo các trường hợp hợp lệ
    valid_order_fields = ['title', '-title', 'release_date', '-release_date']
    if order_by in valid_order_fields:
        movies = movies.order_by(order_by)

    # Phân trang
    paginator = Paginator(movies, per_page)
    total_pages = paginator.num_pages  # Lấy tổng số trang

    try:
        movies_page = paginator.page(page)
    except EmptyPage:
        return JsonResponse({"error": "Page not found"}, status=404)

    # Serialize dữ liệu
    serializer = MovieSerializer(movies_page, many=True)

    return JsonResponse({
        "total_pages": total_pages,
        "total_videos": len(movies_page),
        "page": page,
        "Title": {"Đạo diễn": director_name},  # Đảm bảo đây là chuỗi hợp lệ
        "results": serializer.data
    }, json_dumps_params={'ensure_ascii': False}, safe=False)


class ReviewPagination(PageNumberPagination):
    page_size = 10  # Số lượng review mỗi trang
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes([AllowAny])
def get_movie_reviews(request, movie_id):
    reviews = Reviews.objects.filter(movie_id=movie_id).order_by('-create_at')
    paginator = ReviewPagination()
    result_page = paginator.paginate_queryset(reviews, request)
    serializer = ReviewSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
def increase_movie_views(request, movie_id):
    try:
        # Lấy đối tượng movie từ cơ sở dữ liệu
        movie = Movies.objects.get(movie_id=movie_id)
        
        # Tăng số lượt xem
        movie.views = (movie.views or 0) + 1  # Nếu movie.views là None thì sử dụng 0
        movie.save()

        return Response({"message": "Lượt xem của phim đã được tăng lên."}, status=status.HTTP_200_OK)
    
    except Movies.DoesNotExist:
        return Response({"error": "Phim không tồn tại."}, status=status.HTTP_404_NOT_FOUND)


