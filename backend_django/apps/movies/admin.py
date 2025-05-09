from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Banners, Episodes, Movieactors, Moviedirectors, Moviegenres, Movies
from apps.core.models import Nations, Monopolys
from apps.people.models import Actors, Directors

# Đăng ký ReportAdmin sẽ được thực hiện ở cuối file



class MoviesAdmin(admin.ModelAdmin):
    list_display = ('movie_id', 'title', 'release_date', 'rating', 'get_monopoly', 'get_nation', 'views')
    search_fields = ('title', 'description', 'movie_id')
    list_filter = ('release_date', 'nation', 'rating', 'views', 'monopoly')
    ordering = ('-release_date',)
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    list_per_page = 20
    date_hierarchy = 'release_date'
    readonly_fields = ('movie_id',)
    # Sử dụng autocomplete_fields
    autocomplete_fields = ['monopoly', 'nation']
    list_display_links = ('movie_id', 'title')  # Cho phép nhấp vào movie_id hoặc title để chỉnh sửa

    def get_monopoly(self, obj):
        """Hiển thị tên của Monopoly thay vì đối tượng"""
        if obj.monopoly:
            return obj.monopoly.name
        return '-'
    get_monopoly.short_description = 'Monopoly'
    get_monopoly.admin_order_field = 'monopoly__name'

    def get_nation(self, obj):
        """Hiển thị tên của Nation thay vì đối tượng"""
        if obj.nation:
            return obj.nation.name
        return '-'
    get_nation.short_description = 'Nation'
    get_nation.admin_order_field = 'nation__name'

class MoviegenresAdmin(admin.ModelAdmin):
    list_display = ('mg_id', 'get_movie', 'get_genre')
    list_filter = ('genre',)
    search_fields = ('movie__title', 'genre__name')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    autocomplete_fields = ['movie', 'genre']  # Sử dụng autocomplete_fields
    list_per_page = 25
    readonly_fields = ('mg_id',)
    list_display_links = ('mg_id',)  # Cho phép nhấp vào mg_id để chỉnh sửa

    def get_movie(self, obj):
        """Hiển thị tên của Movie thay vì đối tượng"""
        if obj.movie:
            return obj.movie.title
        return '-'
    get_movie.short_description = 'Movie'
    get_movie.admin_order_field = 'movie__title'

    def get_genre(self, obj):
        """Hiển thị tên của Genre thay vì đối tượng"""
        if obj.genre:
            return obj.genre.name
        return '-'
    get_genre.short_description = 'Genre'
    get_genre.admin_order_field = 'genre__name'

class MovieactorsAdmin(admin.ModelAdmin):
    list_display = ('ma_id', 'get_movie', 'get_actor', 'role')
    search_fields = ('movie__title', 'actor__name', 'role')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    autocomplete_fields = ['movie', 'actor']  # Sử dụng autocomplete_fields
    list_filter = ('actor',)
    list_per_page = 25
    readonly_fields = ('ma_id',)
    list_display_links = ('ma_id', 'role')  # Cho phép nhấp vào ma_id hoặc role để chỉnh sửa

    def get_movie(self, obj):
        """Hiển thị tên của Movie thay vì đối tượng"""
        if obj.movie:
            return obj.movie.title
        return '-'
    get_movie.short_description = 'Movie'
    get_movie.admin_order_field = 'movie__title'

    def get_actor(self, obj):
        """Hiển thị tên của Actor thay vì đối tượng"""
        if obj.actor:
            return obj.actor.name
        return '-'
    get_actor.short_description = 'Actor'
    get_actor.admin_order_field = 'actor__name'

class MoviedirectorsAdmin(admin.ModelAdmin):
    list_display = ('md_id', 'get_movie', 'get_director')
    search_fields = ('movie__title', 'director__name')
    autocomplete_fields = ['movie', 'director']  # Sử dụng autocomplete_fields thay vì raw_id_fields
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    list_filter = ('director',)
    list_per_page = 25
    readonly_fields = ('md_id',)
    list_display_links = ('md_id',)  # Cho phép nhấp vào md_id để chỉnh sửa

    def get_movie(self, obj):
        """Hiển thị tên của Movie thay vì đối tượng"""
        if obj.movie:
            return obj.movie.title
        return '-'
    get_movie.short_description = 'Movie'
    get_movie.admin_order_field = 'movie__title'

    def get_director(self, obj):
        """Hiển thị tên của Director thay vì đối tượng"""
        if obj.director:
            return obj.director.name
        return '-'
    get_director.short_description = 'Director'
    get_director.admin_order_field = 'director__name'

class EpisodesAdmin(admin.ModelAdmin):
    list_display = ('episode_id', 'get_movie', 'episode_number', 'runtime', 'release_date')
    list_filter = ('release_date', 'movie')
    search_fields = ('movie__title', 'episode_number', 'description')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    autocomplete_fields = ['movie']  # Sử dụng autocomplete_fields thay vì raw_id_fields
    date_hierarchy = 'release_date'
    list_per_page = 20
    readonly_fields = ('episode_id',)
    list_display_links = ('episode_id', 'episode_number')  # Cho phép nhấp vào episode_id hoặc episode_number để chỉnh sửa

    def get_movie(self, obj):
        """Hiển thị tên của Movie thay vì đối tượng"""
        if obj.movie:
            return obj.movie.title
        return '-'
    get_movie.short_description = 'Movie'
    get_movie.admin_order_field = 'movie__title'

class BannersAdmin(admin.ModelAdmin):
    list_display = ('banner_id', 'title', 'get_movie', 'is_active', 'start_date', 'end_date')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('title', 'movie__title', 'description')
    # Đã loại bỏ list_editable để sử dụng trang chỉnh sửa chi tiết
    autocomplete_fields = ['movie']  # Sử dụng autocomplete_fields thay vì raw_id_fields
    date_hierarchy = 'start_date'
    list_per_page = 15
    readonly_fields = ('banner_id',)
    list_display_links = ('banner_id', 'title')  # Cho phép nhấp vào banner_id hoặc title để chỉnh sửa

    def get_movie(self, obj):
        """Hiển thị tên của Movie thay vì đối tượng"""
        if obj.movie:
            return obj.movie.title
        return '-'
    get_movie.short_description = 'Movie'
    get_movie.admin_order_field = 'movie__title'

admin.site.register(Movies, MoviesAdmin)
admin.site.register(Moviegenres, MoviegenresAdmin)
admin.site.register(Movieactors, MovieactorsAdmin)
admin.site.register(Moviedirectors, MoviedirectorsAdmin)
admin.site.register(Episodes, EpisodesAdmin)
admin.site.register(Banners, BannersAdmin)

# Thêm URL cho các báo cáo
admin.site.site_url = None  # Ẩn nút "View site"
