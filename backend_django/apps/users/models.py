from django.db import models
from django.contrib.auth.models import User
from apps.movies.models import Movies, Episodes
from django.db.models.deletion import DO_NOTHING

# Create your models here.
class ProfileUser(models.Model):
    id = models.OneToOneField(User, models.DO_NOTHING, db_column='id', primary_key=True)
    dateofbirth = models.DateField(blank=True, null=True)
    sex = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    idnumber = models.CharField(max_length=15, blank=True, null=True)
    url_img = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'profile_user'

class Reviews(models.Model):
    review_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey('movies.Movies', models.DO_NOTHING, db_column='movie_id')
    user = models.ForeignKey(User, models.DO_NOTHING, db_column='user_id')
    rating = models.FloatField()
    comment = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'reviews'


class Watchlists(models.Model):
    view_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(ProfileUser, models.DO_NOTHING, blank=True, null=True)
    movie = models.ForeignKey('movies.Movies', models.DO_NOTHING, blank=True, null=True)
    watch_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'watchlists'

class Wishlist(models.Model):
    wishlist_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    movie = models.ForeignKey('movies.Movies', models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'wishlist'
        unique_together = (('user', 'movie'),)