from rest_framework import serializers
from .models import Movies, Moviegenres, Movieactors, Moviedirectors, Episodes

from rest_framework import serializers
from apps.core.models import Nations, Genres, Monopolys
from apps.people.models import Actors, Directors

class NationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nations
        fields = ["nation_id", "name"]

class monopolySerializer(serializers.ModelSerializer):
    class Meta:
        model = Monopolys
        fields = ["monopoly_id", "name"]


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actors
        fields = ["actor_id", "name"]

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Directors
        fields = ["director_id", "name"]




class MovieSerializer(serializers.ModelSerializer):
    release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField
    monopoly = monopolySerializer()

    class Meta:
        model = Movies
        fields = [
            'movie_id', 'title', 'release_date', 'runtime',
            'poster_url', 'trailer_url', 'rating', 'views', 'monopoly'
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

# class DetailSerializer(serializers.ModelSerializer):
#     # release_date = serializers.SerializerMethodField() # Sử dụng SerializerMethodField
#     genre = serializers.CharField(source='genre.name') # Lấy tên thể loại
#     actors = serializers.ListField(child=serializers.CharField(max_length=100))
#     directors = serializers.ListField(child = serializers.CharField(max_length=100))
#     episodes_num = serializers.ListField(child = serializers.CharField(max_length=15))
#     class Meta:
#         model = Movies
#         fields = [
#             'movie_id','title','description', 'release_date', 'runtime', 
#             'poster_url', 'rating', 'genre', 'views','actors','directors','episodes_num'
#         ]

    # def get_release_date(self, obj):
    #     return obj['release_date'].date() # Chuyển đổi datetime thành date



class filmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'url_video'
        ]

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodes
        fields =[
            'episode_id','episode_number'
        ]

class VideoSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source='movie.title', read_only=True)  # Lấy tiêu đề phim từ khóa ngoại

    class Meta:
        model = Episodes
        fields = ['episode_id', 'url_video', 'movie_id', 'movie_title']


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = ['movie_id', 'title', 'poster_url']



class DetailSerializer(serializers.ModelSerializer):
    nation = NationSerializer()  # Lấy thông tin quốc gia

    genres = serializers.SerializerMethodField()  # Lấy danh sách thể loại
    actors = serializers.SerializerMethodField()  # Lấy danh sách diễn viên
    directors = serializers.SerializerMethodField()  # Lấy danh sách đạo diễn
    episodes = EpisodeSerializer(many=True, read_only=True, source='episodes_set')  # Lấy tập phim

    release_date = serializers.SerializerMethodField()  # Chuyển đổi datetime thành date

    class Meta:
        model = Movies
        fields = ["movie_id", "title", 'release_date', "nation", 'runtime', 
                  'poster_url', 'rating', 'views', "genres", "actors", "directors", 'episodes']

    def get_release_date(self, obj):
        return obj.release_date.date() if obj.release_date else None  # Tránh lỗi nếu ngày rỗng

    def get_genres(self, obj):
        return [{"genre_id": item.genre.genre_id, "name": item.genre.name} for item in obj.moviegenres_set.all()]  # Lấy danh sách thể loại

    def get_actors(self, obj):
        return [{"actor_id": item.actor.actor_id, "name": item.actor.name} for item in obj.movieactors_set.all()]  # Lấy danh sách diễn viên

    def get_directors(self, obj):
        return [{"director_id": item.director.director_id, "name": item.director.name} for item in obj.moviedirectors_set.all()]  # Lấy danh sách đạo diễn


