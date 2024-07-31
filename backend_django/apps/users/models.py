from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class ProfileUser(models.Model):
    id = models.OneToOneField(User, models.DO_NOTHING, db_column='id', primary_key=True)
    dateofbirth = models.DateField(db_column='DateOfBirth', blank=True, null=True)  # Field name made lowercase.
    sex = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    idnumber = models.CharField(db_column='idNumber', max_length=15, blank=True, null=True)  # Field name made lowercase.
    url_img = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'profile_user'
