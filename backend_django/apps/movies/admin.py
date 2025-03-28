from django.contrib import admin
from .models import Banners, Episodes, Movieactors, Moviedirectors, Moviegenres, Movies

@admin.register(Movies)
class MoviesAdmin(admin.ModelAdmin):
    list_display = ('movie_id', 'title', 'description', 'release_date', 'runtime', 'poster_url', 'trailer_url', 
                    'rating', 'monopoly', 'nation', 'views')
    search_fields = ('title',)
    list_filter = ('release_date', 'nation', 'rating', 'views', 'monopoly')
    ordering = ('-release_date',)

@admin.register(Moviegenres)
class MovieGenresAdmin(admin.ModelAdmin):
    list_display = ('mg_id', 'movie', 'genre')
    list_filter = ('genre',)
    search_fields = ('movie__title', 'genre__name')


@admin.register(Movieactors)
class MovieActorsAdmin(admin.ModelAdmin):
    list_display = ('ma_id', 'movie', 'actor', 'role')
    search_fields = ('movie__title', 'actor__name', 'role')

@admin.register(Moviedirectors)
class MovieDirectorsAdmin(admin.ModelAdmin):
    list_display = ('md_id', 'movie', 'director')
    search_fields = ('movie__title', 'director__name')

@admin.register(Episodes)
class EpisodesAdmin(admin.ModelAdmin):
    list_display = ('episode_id', 'movie', 'episode_number', 'description', 'runtime', 'release_date', 'url_video')
    list_filter = ('release_date',)
    search_fields = ('movie__title', 'episode_number')

@admin.register(Banners)
class BannersAdmin(admin.ModelAdmin):
    list_display = ('banner_id', 'title', 'description', 'url_banner', 'movie', 'is_active', 'start_date', 'end_date', 'created_at', 'updated_at')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('title', 'movie__title')
