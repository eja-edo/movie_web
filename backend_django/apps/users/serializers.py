from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils import timezone

   
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  
        user.is_active = False 
        user.save()
        return user


from .models import Wishlist
from apps.movies.models import Movies
from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import Wishlist
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class WishlistSerializer(serializers.ModelSerializer):
    # Thêm trường username mới, lấy từ quan hệ user
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ['wishlist_id', 'user', 'username', 'movie', 'created_at']  # Thêm username vào fields
        read_only_fields = ['wishlist_id', 'username', 'created_at']  # Thêm username vào read_only_fields
        extra_kwargs = {
            'user': {'write_only': True}  # Ẩn user_id trong response
        }

    def create(self, validated_data):
        user = self.context['request'].user
        movie = validated_data['movie']
        
        if Wishlist.objects.filter(user=user, movie=movie).exists():
            raise serializers.ValidationError("Phim đã có trong danh sách yêu thích")
            
        wishlist_item = Wishlist.objects.create(
            user=user,
            movie=movie,
            created_at=timezone.now()
        )
        return wishlist_item

from apps.movies.serializers import MovieSerializer

class WishlistMovieSerializer(serializers.ModelSerializer):
    # Chỉ trả về thông tin movie, không hiển thị các trường khác của wishlist
    movie = MovieSerializer()
    
    class Meta:
        model = Wishlist
        fields = ['movie']  # Chỉ bao gồm trường movie
