from django.db import models

# Create your models here.
class Actors(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actors'

    def __str__(self):
        return self.name if self.name else f"Actor {self.actor_id}"

class Directors(models.Model):
    director_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    profile_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'directors'

    def __str__(self):
        return self.name if self.name else f"Director {self.director_id}"