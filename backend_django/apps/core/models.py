from django.db import models

# Create your models here.
class Nations(models.Model):
    nation_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nations'

    def __str__(self):
        return self.name if self.name else f"Nation {self.nation_id}"

class Genres(models.Model):
    genre_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'

    def __str__(self):
        return self.name if self.name else f"Genre {self.genre_id}"

class Monopolys(models.Model):
    monopoly_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'monopolys'

    def __str__(self):
        return self.name if self.name else f"Monopoly {self.monopoly_id}"
