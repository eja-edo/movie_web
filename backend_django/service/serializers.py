from rest_framework import serializers
from .models import Movies,Episodes

class MovieSerializer(serializers.ModelSerializer):
    release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField
    genre = serializers.CharField(source='genre.name') # Lấy tên thể loại

    class Meta:
        model = Movies
        fields = [
            'movie_id', 'title', 'description', 'release_date', 'runtime', 
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

class filmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'movie_id','episode_number','url_video'
        ]
    