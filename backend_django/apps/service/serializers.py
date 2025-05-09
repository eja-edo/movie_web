from rest_framework import serializers
from .models import Movies,Episodes, Genres

class GenreSerializer(serializers.ModelSerializer):
    total_views = serializers.IntegerField()

    class Meta:
        model = Genres
        fields = ['genre_id', 'name', 'total_views']

class MovieSerializer(serializers.ModelSerializer):
    release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField

    class Meta:
        model = Movies
        fields = [
            'movie_id', 'title', 'release_date', 'runtime', 
            'poster_url', 'trailer_url', 'rating', 'views'
        ]

    def get_release_date(self, obj):
        return obj.release_date.date() # Chuyển đổi datetime thành date


class bannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = [
            'movie_id',
            'title',
            'description',
            'trailer_url'
        ]

class DetailSerializer(serializers.ModelSerializer):
    # release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField
    genre = serializers.CharField(source='genre.name') # Lấy tên thể loại
    actors = serializers.ListField(child=serializers.CharField(max_length=100))
    directors = serializers.ListField(child = serializers.CharField(max_length=100))
    episodes_num = serializers.ListField(child = serializers.CharField(max_length=15))
    class Meta:
        model = Movies
        fields = [
            'movie_id','title','description', 'release_date', 'runtime', 
            'poster_url', 'rating', 'genre', 'views','actors','directors','episodes_num'
        ]

    # def get_release_date(self, obj):
    #     return obj['release_date'].date() # Chuyển đổi datetime thành date



class filmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'url_video'
        ]

class episodesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'episode_number'
        ]
 