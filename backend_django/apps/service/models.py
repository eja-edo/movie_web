# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from apps.users.models import ProfileUser


class Actors(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actors'


class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    episode = models.ForeignKey('Episodes', on_delete=models.DO_NOTHING, blank=True, null=True)  # Giả sử 'Episodes' nằm trong cùng app hoặc đã được import
    user = models.ForeignKey(ProfileUser, on_delete=models.DO_NOTHING, blank=True, null=True)  # Sử dụng model class trực tiếp
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'

        
class Directors(models.Model):
    director_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'directors'


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


class Genres(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'


class Movieactors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING, blank=True, null=True)
    actor = models.ForeignKey(Actors, models.DO_NOTHING, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movieactors'


class Moviedirectors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING, blank=True, null=True)
    director = models.ForeignKey(Directors, models.DO_NOTHING, blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'moviedirectors'


class Movies(models.Model):
    movie_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=155, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    poster_url = models.CharField(max_length=255, blank=True, null=True)
    trailer_url = models.CharField(max_length=255, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    genre = models.ForeignKey(Genres, models.DO_NOTHING, blank=True, null=True)
    views = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movies'


class Watchlists(models.Model):
    view_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(ProfileUser, models.DO_NOTHING, blank=True, null=True)
    movie = models.ForeignKey(Movies, models.DO_NOTHING, blank=True, null=True)
    watch_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'watchlists'


class Reviews(models.Model):
    movie = models.OneToOneField(Movies, models.DO_NOTHING, primary_key=True)  # The composite primary key (movie_id, user_id) found, that is not supported. The first column is selected.
    user = models.ForeignKey(ProfileUser, models.DO_NOTHING)
    rating = models.FloatField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reviews'
        unique_together = (('movie', 'user'),)