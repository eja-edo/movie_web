from django.shortcuts import render
from django.shortcuts import get_object_or_404
from pathlib import Path
from django.conf import settings
# Create your views here.
from django.http import JsonResponse, HttpResponse
from .models import News
import re
import os

def serve_html(request, id):
    # Lấy bản ghi từ PostgreSQL theo id
    news_item = get_object_or_404(News, news_id=id)

    # Lấy đường dẫn file HTML từ content_url
    file_path = os.path.join(settings.BASE_DIR, news_item.content_url)

    print(f"📌 Checking file path: {file_path}")  # Debug đường dẫn file

    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
        return HttpResponse(html_content, content_type="text/html")
    else:
        return HttpResponse(f"🚨 File not found: {file_path}", status=404)



def get_news_list(request):
    news_items = News.objects.all().order_by("-publish_date")[:12]  # Lấy 10 bài mới nhất
    news_list = [
        {
            "id": item.news_id,
            "title": item.title,
            "content": item.main_content[:200] + "...",  # Giới hạn nội dung
            "image_url": item.image_url if item.image_url else "",  # Kiểm tra ảnh
        }
        for item in news_items
    ]
    return JsonResponse({"news": news_list}, safe=False)

