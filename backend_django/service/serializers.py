from rest_framework import serializers
from .models import Movies,Episodes
from django.contrib.auth.models import User




class MovieSerializer(serializers.ModelSerializer):
    release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField
    genre = serializers.CharField(source='genre.name') # Lấy tên thể loại

    class Meta:
        model = Movies
        fields = [
            'movie_id', 'title', 'release_date', 'runtime', 
            'poster_url', 'trailer_url', 'rating', 'genre', 'views'
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
    title = serializers.CharField(source = 'movie.title')
    class Meta:
        model = Episodes
        fields =[
            'title','url_video'
        ]

class episodesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'episode_number'
        ]
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']