from django.db import migrations
from django.utils import timezone

def create_sample_reports(apps, schema_editor):
    Report = apps.get_model('reports', 'Report')
    
    # Tạo báo cáo tổng quan
    Report.objects.create(
        title='Tổng quan',
        report_type='dashboard',
        description='Báo cáo tổng quan về trang web phim',
        created_at=timezone.now()
    )
    
    # Tạo báo cáo thống kê phim
    Report.objects.create(
        title='Thống kê phim',
        report_type='movie',
        description='Báo cáo thống kê về phim',
        created_at=timezone.now()
    )
    
    # Tạo báo cáo thống kê tập phim
    Report.objects.create(
        title='Thống kê tập phim',
        report_type='episode',
        description='Báo cáo thống kê về tập phim',
        created_at=timezone.now()
    )
    
    # Tạo báo cáo thống kê diễn viên
    Report.objects.create(
        title='Thống kê diễn viên',
        report_type='actor',
        description='Báo cáo thống kê về diễn viên',
        created_at=timezone.now()
    )
    
    # Tạo báo cáo thống kê đạo diễn
    Report.objects.create(
        title='Thống kê đạo diễn',
        report_type='director',
        description='Báo cáo thống kê về đạo diễn',
        created_at=timezone.now()
    )
    
    # Tạo báo cáo thống kê bình luận
    Report.objects.create(
        title='Thống kê bình luận',
        report_type='comment',
        description='Báo cáo thống kê về bình luận',
        created_at=timezone.now()
    )

def delete_sample_reports(apps, schema_editor):
    Report = apps.get_model('reports', 'Report')
    Report.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('reports', '0001_initial'),
    ]
    
    operations = [
        migrations.RunPython(create_sample_reports, delete_sample_reports),
    ]
