from django.db import models
from apps.core.models import Monopolys

# Create your models here.
class Codemonopoly(models.Model):
    cm_id = models.AutoField(primary_key=True)
    code = models.ForeignKey('Codes', models.DO_NOTHING)  # The composite primary key (code_id, monopoly_id) found, that is not supported. The first column is selected.
    monopoly = models.ForeignKey('core.Monopolys', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'codemonopoly'
        unique_together = (('code', 'monopoly'),)

class Codes(models.Model):
    code_id = models.AutoField(primary_key=True)
    code = models.CharField(unique=True, max_length=50)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    expired_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'codes'