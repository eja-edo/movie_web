from django.http import HttpResponse
from django.template.loader import render_to_string
from apps.movies.models import Movies
from django.utils import timezone
from datetime import timedelta

def video_sitemap(request):
    """
    Generate a custom video sitemap for Google
    """
    # Get all movies
    movies = Movies.objects.all()
    
    # Prepare the sitemap content
    sitemap_content = render_to_string('video_sitemap.xml', {
        'movies': movies,
        'domain': 'https://smovie.fun',
    })
    
    # Return the sitemap as XML
    return HttpResponse(sitemap_content, content_type='application/xml')
