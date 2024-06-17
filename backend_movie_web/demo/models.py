from django.db import models

# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.       

class Actors(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actors'


class Comments(models.Model):
    episode = models.OneToOneField('Episodes', models.DO_NOTHING)  # The composite primary key (episode_id, user_id) found, that is not supported. The first column is selected.
    user = models.ForeignKey('Users', models.DO_NOTHING)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'
        unique_together = (('episode', 'user'),)


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
    episode_number = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'episodes'


class Genres(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'


class Movieactors(models.Model):
    movie = models.OneToOneField('Movies', models.DO_NOTHING)  # The composite primary key (movie_id, actor_id) found, that is not supported. The first column is selected.
    actor = models.ForeignKey(Actors, models.DO_NOTHING)
    role = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movieactors'
        unique_together = (('movie', 'actor'),)


class Moviedirectors(models.Model):
    movie = models.OneToOneField('Movies', models.DO_NOTHING)  # The composite primary key (movie_id, director_id) found, that is not supported. The first column is selected.
    director = models.ForeignKey(Directors, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'moviedirectors'
        unique_together = (('movie', 'director'),)


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


class Reviews(models.Model):
    movie = models.OneToOneField(Movies, models.DO_NOTHING)  # The composite primary key (movie_id, user_id) found, that is not supported. The first column is selected.
    user = models.ForeignKey('Users', models.DO_NOTHING)
    rating = models.FloatField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    create_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reviews'
        unique_together = (('movie', 'user'),)


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=255)
    password = models.CharField(unique=True, max_length=255)
    email = models.CharField(max_length=150, blank=True, null=True)
    phone_number = models.CharField(unique=True, max_length=15, blank=True, null=True)   

    class Meta:
        managed = False
        db_table = 'users'


class Wathlists(models.Model):
    user = models.ForeignKey(Users, models.DO_NOTHING)
    movie = models.OneToOneField(Movies, models.DO_NOTHING)  # The composite primary key (movie_id, user_id) found, that is not supported. The first column is selected.
    watch_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wathlists'
        unique_together = (('movie', 'user'),)