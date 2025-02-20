# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models



class Actors(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actors'


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




class Directors(models.Model):
    director_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
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
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'


class Monopolys(models.Model):
    monopoly_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'monopolys'


class Movieactors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)
    actor = models.ForeignKey(Actors, models.DO_NOTHING)
    role = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'movieactors'
        unique_together = (('movie', 'actor', 'role'),)


class Moviedirectors(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)  # The composite primary key (movie_id, director_id) found, that is not supported. The first column is selected.
    director = models.ForeignKey(Directors, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'moviedirectors'
        unique_together = (('movie', 'director'),)


class Moviegenres(models.Model):
    movie = models.ForeignKey('Movies', models.DO_NOTHING)  # The composite primary key (movie_id, genre_id) found, that is not supported. The first column is selected.
    genre = models.ForeignKey(Genres, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'moviegenres'
        unique_together = (('movie', 'genre'),)


class Movies(models.Model):
    movie_id = models.AutoField(primary_key=True)
    title = models.CharField(unique=True, max_length=155, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    release_date = models.DateTimeField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    poster_url = models.CharField(max_length=255, blank=True, null=True)
    trailer_url = models.CharField(max_length=255, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    monopoly = models.ForeignKey(Monopolys, models.DO_NOTHING, blank=True, null=True)
    nation = models.ForeignKey('Nations', models.DO_NOTHING, blank=True, null=True)
    views = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movies'


class Nations(models.Model):
    nation_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nations'


class News(models.Model):
    news_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content_url = models.CharField(max_length=255, blank=True, null=True)
    main_content = models.TextField(blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    publish_date = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'news'





