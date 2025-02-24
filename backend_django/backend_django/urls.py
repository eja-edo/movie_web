"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/service/', include('apps.service.urls')),
    path('api/user/',include('apps.users.urls')),
    path('api/accounts/', include('allauth.urls')),
    path('api/movies/', include('apps.movies.urls')),
    path('api/news/', include('apps.news.urls')),
    path('api/people/', include('apps.people.urls')),
    path('api/piomotions/', include('apps.piomotions.urls')),
    path('api/core/', include('apps.core.urls')),

    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
