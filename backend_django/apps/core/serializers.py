from rest_framework import serializers
from .models import Genres, Nations

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = ['genre_id', 'name']


class NationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nations
        fields = ['nation_id', 'name']