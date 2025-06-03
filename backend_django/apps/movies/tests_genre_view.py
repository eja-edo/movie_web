from django.test import TestCase, RequestFactory
from django.urls import reverse
from apps.movies.models import Movies, Moviegenres
from apps.core.models import Genres
from apps.movies.views import get_movies_by_genre
from apps.movies.serializers import MovieSerializer
from django.core.paginator import Paginator, EmptyPage
from django.http import JsonResponse
import json
from unittest import mock

class GetMoviesByGenreTestCase(TestCase):
    """
    Test case for the get_movies_by_genre view function
    Sử dụng mocking để tránh truy cập database
    """

    def setUp(self):
        """Set up the test factory"""
        self.factory = RequestFactory()
        self.url = reverse('get_movies_by_genre')

        # Tạo mock objects
        self.mock_genre = mock.MagicMock(spec=Genres)
        self.mock_genre.genre_id = 1
        self.mock_genre.name = "Phim Hành Động"

        self.mock_movie1 = mock.MagicMock(spec=Movies)
        self.mock_movie1.movie_id = 1
        self.mock_movie1.title = "Movie 1"

        self.mock_movie2 = mock.MagicMock(spec=Movies)
        self.mock_movie2.movie_id = 2
        self.mock_movie2.title = "Movie 2"

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.MovieSerializer')
    def test_get_all_movies_no_genre(self, mock_serializer, mock_movies_all):
        """Test getting all movies when no genre is specified"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies.order_by.return_value = [self.mock_movie1, self.mock_movie2]
        mock_movies_all.return_value = mock_movies

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = [
            {"movie_id": 1, "title": "Movie 1"},
            {"movie_id": 2, "title": "Movie 2"}
        ]
        mock_serializer.return_value = mock_serializer_instance

        # Mock paginator
        with mock.patch('apps.movies.views.Paginator') as mock_paginator:
            mock_paginator_instance = mock.MagicMock()
            mock_paginator_instance.num_pages = 1
            mock_page = mock.MagicMock()
            mock_page.number = 1
            mock_page.__len__.return_value = 2
            mock_paginator_instance.page.return_value = mock_page
            mock_paginator.return_value = mock_paginator_instance

            # Create request and get response
            request = self.factory.get(self.url)
            response = get_movies_by_genre(request)

            # Assertions
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.content)
            self.assertEqual(response_data["Title"]["Thể Loại"], "Tất cả thể loại")
            self.assertEqual(response_data["results"], mock_serializer_instance.data)
            self.assertEqual(response_data["page"], 1)
            self.assertEqual(response_data["total_pages"], 1)
            self.assertEqual(response_data["total_videos"], 2)

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.Genres.objects.filter')
    @mock.patch('apps.movies.views.MovieSerializer')
    def test_get_movies_by_valid_genre(self, mock_serializer, mock_genres_filter, mock_movies_all):
        """Test getting movies filtered by a valid genre"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_filtered_movies = mock.MagicMock()
        mock_filtered_movies.order_by.return_value = [self.mock_movie1]
        mock_movies.filter.return_value = mock_filtered_movies
        mock_movies_all.return_value = mock_movies

        mock_genre_queryset = mock.MagicMock()
        mock_genre_queryset.first.return_value = self.mock_genre
        mock_genres_filter.return_value = mock_genre_queryset

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = [{"movie_id": 1, "title": "Movie 1"}]
        mock_serializer.return_value = mock_serializer_instance

        # Mock paginator
        with mock.patch('apps.movies.views.Paginator') as mock_paginator:
            mock_paginator_instance = mock.MagicMock()
            mock_paginator_instance.num_pages = 1
            mock_page = mock.MagicMock()
            mock_page.number = 1
            mock_page.__len__.return_value = 1
            mock_paginator_instance.page.return_value = mock_page
            mock_paginator.return_value = mock_paginator_instance

            # Create request and get response
            request = self.factory.get(f"{self.url}?genre_id=1")
            response = get_movies_by_genre(request)

            # Assertions
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.content)
            self.assertEqual(response_data["Title"]["Thể Loại"], self.mock_genre.name)
            self.assertEqual(response_data["results"], mock_serializer_instance.data)

            # Verify that filter was called with the correct parameter
            mock_movies.filter.assert_called_with(moviegenres__genre_id='1')

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.Genres.objects.filter')
    @mock.patch('apps.movies.views.MovieSerializer')
    def test_get_movies_by_invalid_genre(self, mock_serializer, mock_genres_filter, mock_movies_all):
        """Test getting movies with an invalid genre ID"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies_all.return_value = mock_movies

        mock_genre_queryset = mock.MagicMock()
        mock_genre_queryset.first.return_value = None  # Genre not found
        mock_genres_filter.return_value = mock_genre_queryset

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = []
        mock_serializer.return_value = mock_serializer_instance

        # Mock paginator
        with mock.patch('apps.movies.views.Paginator') as mock_paginator:
            mock_paginator_instance = mock.MagicMock()
            mock_paginator_instance.num_pages = 0
            mock_page = mock.MagicMock()
            mock_page.number = 1
            mock_page.__len__.return_value = 0
            mock_paginator_instance.page.return_value = mock_page
            mock_paginator.return_value = mock_paginator_instance

            # Create request and get response
            request = self.factory.get(f"{self.url}?genre_id=999")
            response = get_movies_by_genre(request)

            # Assertions
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.content)
            self.assertEqual(response_data["Title"]["Thể Loại"], "Tất cả thể loại")
            self.assertEqual(response_data["results"], mock_serializer_instance.data)

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.MovieSerializer')
    def test_get_movies_with_ordering(self, mock_serializer, mock_movies_all):
        """Test getting movies with custom ordering"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies.order_by.return_value = [self.mock_movie2, self.mock_movie1]  # Reversed order
        mock_movies_all.return_value = mock_movies

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = [
            {"movie_id": 2, "title": "Movie 2"},
            {"movie_id": 1, "title": "Movie 1"}
        ]
        mock_serializer.return_value = mock_serializer_instance

        # Mock paginator
        with mock.patch('apps.movies.views.Paginator') as mock_paginator:
            mock_paginator_instance = mock.MagicMock()
            mock_paginator_instance.num_pages = 1
            mock_page = mock.MagicMock()
            mock_page.number = 1
            mock_page.__len__.return_value = 2
            mock_paginator_instance.page.return_value = mock_page
            mock_paginator.return_value = mock_paginator_instance

            # Create request and get response
            request = self.factory.get(f"{self.url}?order_by=-title")
            response = get_movies_by_genre(request)

            # Assertions
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.content)
            self.assertEqual(response_data["results"], mock_serializer_instance.data)

            # Verify that order_by was called with the correct parameter
            mock_movies.order_by.assert_called_with('-title')

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.MovieSerializer')
    @mock.patch('apps.movies.views.Paginator')
    def test_get_movies_with_pagination(self, mock_paginator, mock_serializer, mock_movies_all):
        """Test pagination of movies"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies.order_by.return_value = [self.mock_movie1, self.mock_movie2]
        mock_movies_all.return_value = mock_movies

        # Mock paginator
        mock_paginator_instance = mock.MagicMock()
        mock_paginator_instance.num_pages = 2
        mock_page = mock.MagicMock()
        mock_page.number = 2
        mock_page.__len__.return_value = 1
        mock_paginator_instance.page.return_value = mock_page
        mock_paginator.return_value = mock_paginator_instance

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = [{"movie_id": 2, "title": "Movie 2"}]
        mock_serializer.return_value = mock_serializer_instance

        # Create request and get response
        request = self.factory.get(f"{self.url}?page=2")
        response = get_movies_by_genre(request)

        # Assertions
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data["page"], 2)
        self.assertEqual(response_data["total_pages"], 2)
        self.assertEqual(response_data["results"], mock_serializer_instance.data)

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.MovieSerializer')
    def test_get_movies_with_invalid_ordering(self, mock_serializer, mock_movies_all):
        """Test getting movies with invalid ordering parameter"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies.order_by.return_value = [self.mock_movie1, self.mock_movie2]
        mock_movies_all.return_value = mock_movies

        mock_serializer_instance = mock.MagicMock()
        mock_serializer_instance.data = [
            {"movie_id": 1, "title": "Movie 1"},
            {"movie_id": 2, "title": "Movie 2"}
        ]
        mock_serializer.return_value = mock_serializer_instance

        # Mock paginator
        with mock.patch('apps.movies.views.Paginator') as mock_paginator:
            mock_paginator_instance = mock.MagicMock()
            mock_paginator_instance.num_pages = 1
            mock_page = mock.MagicMock()
            mock_page.number = 1
            mock_page.__len__.return_value = 2
            mock_paginator_instance.page.return_value = mock_page
            mock_paginator.return_value = mock_paginator_instance

            # Create request and get response
            request = self.factory.get(f"{self.url}?order_by=invalid_field")
            response = get_movies_by_genre(request)

            # Assertions
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.content)
            self.assertEqual(response_data["results"], mock_serializer_instance.data)

            # Verify that order_by was NOT called with the invalid parameter
            mock_movies.order_by.assert_not_called()

    @mock.patch('apps.movies.views.Movies.objects.all')
    @mock.patch('apps.movies.views.Paginator')
    def test_page_not_found(self, mock_paginator, mock_movies_all):
        """Test requesting a page that doesn't exist"""
        # Setup mocks
        mock_movies = mock.MagicMock()
        mock_movies_all.return_value = mock_movies

        # Mock paginator to raise EmptyPage exception
        mock_paginator_instance = mock.MagicMock()
        mock_paginator_instance.num_pages = 1
        mock_paginator_instance.page.side_effect = EmptyPage()
        mock_paginator.return_value = mock_paginator_instance

        # Create request and get response
        request = self.factory.get(f"{self.url}?page=999")
        response = get_movies_by_genre(request)

        # Assertions
        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertEqual(response_data["error"], "Page not found")
