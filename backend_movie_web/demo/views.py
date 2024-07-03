from django.shortcuts import render
from django.http import JsonResponse
from .models import Users

def get_products(request):
    # # products = Product.objects.all()
    # products_data = []
    # # for product in products:
    # products_data.append({
    #     'id': 1,
    #     'name': 1,
    #     'description': 1,
    #     'price': 1,
    # })
    users = Users.objects.all()
    users_data = []
    for user in users:
        users_data.append({
           'user_id': user.user_id,
            'username': user.username,
            'password' : user.password,
            'email': user.email,
            'phone_number':user.phone_number,
        })
    return JsonResponse(users_data, safe=False)

def check_admin(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # Xử lý dữ liệu data
        return JsonResponse([{'message': 'Dữ liệu đã được nhận'}], safe=False)
    return JsonResponse([{'error': 'Yêu cầu không hợp lệ'}], safe=False)