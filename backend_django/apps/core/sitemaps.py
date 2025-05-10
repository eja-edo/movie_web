from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from apps.movies.models import Movies
from apps.news.models import News
from datetime import datetime, timedelta
from django.utils import timezone

class StaticViewSitemap(Sitemap):
    """Sitemap for static pages"""
    priority = 0.8
    changefreq = 'weekly'
    
    def items(self):
        return ['home', 'news', 'intro', 'mylist', 'login']
    
    def location(self, item):
        if item == 'home':
            return '/'
        elif item == 'news':
            return '/newsScrip'
        elif item == 'intro':
            return '/intro'
        elif item == 'mylist':
            return '/mylist'
        elif item == 'login':
            return '/login'

class MovieSitemap(Sitemap):
    """Sitemap for movie detail pages"""
    changefreq = 'weekly'
    priority = 0.8
    
    def items(self):
        return Movies.objects.all()
    
    def location(self, obj):
        return f'/detail/{obj.movie_id}'
    
    def lastmod(self, obj):
        # Return the last modified date if available, otherwise a recent date
        return obj.release_date if obj.release_date else timezone.now() - timedelta(days=7)
    
    def _get_protocol(self):
        return 'https'

class NewsSitemap(Sitemap):
    """Sitemap for news articles"""
    changefreq = 'never'  # News articles don't change after publication
    priority = 0.6
    
    def items(self):
        # Assuming you have a News model
        try:
            return News.objects.all()
        except:
            # If News model doesn't exist or has issues, return empty list
            return []
    
    def location(self, obj):
        return f'/ttcon/{obj.news_id}'
    
    def lastmod(self, obj):
        # Return the publication date if available
        return getattr(obj, 'pub_date', None) or timezone.now() - timedelta(days=14)
    
    def _get_protocol(self):
        return 'https'

class GenreSitemap(Sitemap):
    """Sitemap for genre pages"""
    changefreq = 'weekly'
    priority = 0.7
    
    def items(self):
        from apps.core.models import Genres
        return Genres.objects.all()
    
    def location(self, obj):
        return f'/category/genre?genre_id={obj.genre_id}'
    
    def _get_protocol(self):
        return 'https'

class NationSitemap(Sitemap):
    """Sitemap for nation pages"""
    changefreq = 'weekly'
    priority = 0.7
    
    def items(self):
        from apps.core.models import Nations
        return Nations.objects.all()
    
    def location(self, obj):
        return f'/category/nation?nation_id={obj.nation_id}'
    
    def _get_protocol(self):
        return 'https'
