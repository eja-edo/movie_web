from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def bad_request(request, exception=None):
    return JsonResponse({
        'error': 'Bad Request (400)',
        'message': 'Yêu cầu không hợp lệ'
    }, status=400)

@csrf_exempt
def permission_denied(request, exception=None):
    return JsonResponse({
        'error': 'Permission Denied (403)',
        'message': 'Bạn không có quyền truy cập tài nguyên này'
    }, status=403)

@csrf_exempt
def page_not_found(request, exception=None):
    return JsonResponse({
        'error': 'Not Found (404)',
        'message': 'Không tìm thấy tài nguyên yêu cầu'
    }, status=404)

@csrf_exempt
def server_error(request):
    return JsonResponse({
        'error': 'Server Error (500)',
        'message': 'Đã xảy ra lỗi máy chủ nội bộ'
    }, status=500)