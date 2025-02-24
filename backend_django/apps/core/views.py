from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Genres, Nations
from .serializers import GenreSerializer , NationSerializer
from django.http import JsonResponse
from django.db.models import Sum

def get_genres(request):
    genres = Genres.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_nations(request):
    nations = Nations.objects.all()
    serializer =NationSerializer(nations, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_top_genres(request):
    # Truy vấn lấy 5 thể loại có nhiều lượt xem nhất
    top_genres = (
        Genres.objects
        .annotate(total_views=Sum('moviegenres__movie__views'))  # Tổng lượt xem
        .order_by('-total_views')  # Sắp xếp giảm dần
        [:5]  # Giới hạn 5 thể loại
    )
    # Sử dụng serializer để chuyển đổi queryset thành JSON
    if top_genres:
        serializer = GenreSerializer(top_genres, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"message": "Không có thể loại phù hợp"}, status=404)
