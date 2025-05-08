from django.db import models
from django.utils import timezone

# Create your models here.
class Report(models.Model):
    """Model để lưu trữ các báo cáo"""
    REPORT_TYPES = (
        ('dashboard', 'Tổng quan'),
        ('movie', 'Thống kê phim'),
        ('episode', 'Thống kê tập phim'),
        ('actor', 'Thống kê diễn viên'),
        ('director', 'Thống kê đạo diễn'),
        ('comment', 'Thống kê bình luận'),
    )

    title = models.CharField(max_length=100)
    report_type = models.CharField(max_length=20, choices=REPORT_TYPES)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
