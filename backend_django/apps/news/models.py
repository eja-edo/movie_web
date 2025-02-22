from django.db import models

# Create your models here.
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
