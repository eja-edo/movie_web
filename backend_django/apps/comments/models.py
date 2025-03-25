from django.db import models
from django.contrib.auth.models import User
from apps.movies.models import Episodes
# Create your models here.
class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    episode = models.ForeignKey('movies.Episodes', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('auth.User', models.DO_NOTHING, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comments'
