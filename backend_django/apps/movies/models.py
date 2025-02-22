from django.db import models
from apps.core.models import Monopolys,Genres,Nations
from apps.people.models import Actors,Directors
# Create your models here.
class Movies(models.Model):
    movie_id = models.AutoField(primary_key=True)
    title = models.CharField(unique=True, max_length=155, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    poster_url = models.CharField(max_length=255, blank=True, null=True)
    trailer_url = models.CharField(max_length=255, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    monopoly = models.ForeignKey('core.Monopolys', models.DO_NOTHING, blank=True, null=True)
    nation = models.ForeignKey('core.Nations', models.DO_NOTHING, blank=True, null=True)
    views = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movies'

class Moviegenres(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)  
    genre = models.ForeignKey('core.Genres', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'moviegenres'
        unique_together = (('movie', 'genre'),)

class Movieactors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    actor = models.ForeignKey('people.Actors', models.DO_NOTHING)
    role = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'movieactors'
        unique_together = (('movie', 'actor', 'role'),)

class Moviedirectors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)  # The composite primary key (movie_id, director_id) found, that is not supported. The first column is selected.
    director = models.ForeignKey('people.Directors', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'moviedirectors'
        unique_together = (('movie', 'director'),)

class Episodes(models.Model):
    episode_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey('Movies', models.DO_NOTHING, blank=True, null=True)
    episode_number = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)
    url_video = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'episodes'
        unique_together = (('movie', 'episode_number'),)

class Banners(models.Model):
    banner_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey('Movies', models.DO_NOTHING, blank=True, null=True)
    url_banner = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(unique=True, max_length=255)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'banners'