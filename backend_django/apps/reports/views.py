from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Sum, Avg
from django.utils import timezone
from datetime import timedelta
from apps.movies.models import Movies, Episodes, Movieactors, Moviedirectors, Moviegenres
from apps.comments.models import Comments
from django.db.models.functions import TruncMonth, TruncDay, TruncYear

# Create your views here.

@login_required
def dashboard(request):
    """Trang tổng quan báo cáo"""
    # Tổng số phim
    total_movies = Movies.objects.count()

    # Tổng số tập phim
    total_episodes = Episodes.objects.count()

    # Tổng số bình luận
    total_comments = Comments.objects.count()

    # Phim có lượt xem cao nhất
    top_movie_by_views = Movies.objects.order_by('-views').first()

    # Phim có đánh giá cao nhất
    top_movie_by_rating = Movies.objects.order_by('-rating').first()

    # Phim mới nhất
    latest_movie = Movies.objects.order_by('-release_date').first()

    # Thống kê phim theo tháng
    movies_by_month = Movies.objects.annotate(
        month=TruncMonth('release_date')
    ).values('month').annotate(
        count=Count('movie_id')
    ).order_by('-month')[:6]

    context = {
        'title': 'Tổng quan',
        'total_movies': total_movies,
        'total_episodes': total_episodes,
        'total_comments': total_comments,
        'top_movie_by_views': top_movie_by_views,
        'top_movie_by_rating': top_movie_by_rating,
        'latest_movie': latest_movie,
        'movies_by_month': movies_by_month,
    }

    return render(request, 'reports/dashboard.html', context)

@login_required
def movie_statistics(request):
    """Hiển thị thống kê về phim"""
    # Tổng số phim
    total_movies = Movies.objects.count()

    # Phim có lượt xem cao nhất
    top_movies_by_views = Movies.objects.order_by('-views')[:10]

    # Phim có đánh giá cao nhất
    top_movies_by_rating = Movies.objects.order_by('-rating')[:10]

    # Phim mới nhất
    latest_movies = Movies.objects.order_by('-release_date')[:10]

    # Thống kê theo quốc gia
    movies_by_nation = Movies.objects.values('nation__name').annotate(
        count=Count('movie_id')
    ).order_by('-count')

    # Thống kê theo độc quyền
    movies_by_monopoly = Movies.objects.values('monopoly__name').annotate(
        count=Count('movie_id')
    ).order_by('-count')

    # Thống kê theo năm phát hành
    movies_by_year = Movies.objects.annotate(
        year=TruncYear('release_date')
    ).values('year').annotate(
        count=Count('movie_id')
    ).order_by('-year')

    context = {
        'title': 'Thống kê phim',
        'total_movies': total_movies,
        'top_movies_by_views': top_movies_by_views,
        'top_movies_by_rating': top_movies_by_rating,
        'latest_movies': latest_movies,
        'movies_by_nation': movies_by_nation,
        'movies_by_monopoly': movies_by_monopoly,
        'movies_by_year': movies_by_year,
    }

    return render(request, 'reports/movie_statistics.html', context)

@login_required
def episode_statistics(request):
    """Hiển thị thống kê về tập phim"""
    # Tổng số tập phim
    total_episodes = Episodes.objects.count()

    # Số tập phim trung bình mỗi phim
    avg_episodes_per_movie = Episodes.objects.values('movie').annotate(
        count=Count('episode_id')
    ).aggregate(Avg('count'))

    # Phim có nhiều tập nhất
    movies_with_most_episodes = Episodes.objects.values('movie__title').annotate(
        count=Count('episode_id')
    ).order_by('-count')[:10]

    # Tập phim mới nhất
    latest_episodes = Episodes.objects.order_by('-release_date')[:10]

    context = {
        'title': 'Thống kê tập phim',
        'total_episodes': total_episodes,
        'avg_episodes_per_movie': avg_episodes_per_movie,
        'movies_with_most_episodes': movies_with_most_episodes,
        'latest_episodes': latest_episodes,
    }

    return render(request, 'reports/episode_statistics.html', context)

@login_required
def actor_statistics(request):
    """Hiển thị thống kê về diễn viên"""
    # Diễn viên tham gia nhiều phim nhất
    top_actors = Movieactors.objects.values('actor__name').annotate(
        count=Count('movie', distinct=True)
    ).order_by('-count')[:10]

    context = {
        'title': 'Thống kê diễn viên',
        'top_actors': top_actors,
    }

    return render(request, 'reports/actor_statistics.html', context)

@login_required
def director_statistics(request):
    """Hiển thị thống kê về đạo diễn"""
    # Đạo diễn làm nhiều phim nhất
    top_directors = Moviedirectors.objects.values('director__name').annotate(
        count=Count('movie', distinct=True)
    ).order_by('-count')[:10]

    context = {
        'title': 'Thống kê đạo diễn',
        'top_directors': top_directors,
    }

    return render(request, 'reports/director_statistics.html', context)

@login_required
def comment_statistics(request):
    """Hiển thị thống kê về bình luận"""
    # Tổng số bình luận
    total_comments = Comments.objects.count()

    # Phim có nhiều bình luận nhất
    top_commented_movies = Comments.objects.values('episode__movie__title').annotate(
        count=Count('comment_id')
    ).order_by('-count')[:10]

    # Người dùng bình luận nhiều nhất
    top_commenters = Comments.objects.values('user__username').annotate(
        count=Count('comment_id')
    ).order_by('-count')[:10]

    # Thống kê bình luận theo thời gian
    comments_by_month = Comments.objects.annotate(
        month=TruncMonth('created_at')
    ).values('month').annotate(
        count=Count('comment_id')
    ).order_by('-month')[:12]

    context = {
        'title': 'Thống kê bình luận',
        'total_comments': total_comments,
        'top_commented_movies': top_commented_movies,
        'top_commenters': top_commenters,
        'comments_by_month': comments_by_month,
    }

    return render(request, 'reports/comment_statistics.html', context)
