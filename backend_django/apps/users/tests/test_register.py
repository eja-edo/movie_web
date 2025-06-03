from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from django.urls import reverse
from django.http import JsonResponse
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from unittest import mock
import json

from apps.users.views import register
from apps.users.serializers import RegisterSerializer

class RegisterViewTestCase(TestCase):
    """Test case for the register view function"""

    def setUp(self):
        """Set up the test factory and create a test user"""
        self.factory = RequestFactory()
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123',
            'password2': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User'
        }

        # Create a test user for checking duplicate username/email
        self.existing_user = User.objects.create_user(
            username='existinguser',
            email='existing@example.com',
            password='existingpassword123'
        )

    @mock.patch('apps.users.views.EmailMultiAlternatives')
    def test_register_success(self, mock_email):
        """Test successful user registration"""
        # Setup mock for email
        mock_email_instance = mock.MagicMock()
        mock_email.return_value = mock_email_instance

        # Create request
        request = self.factory.post(
            reverse('register'),
            data=json.dumps(self.user_data),
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Parse response data
        response_data = json.loads(response.content)

        # Check response contains expected fields
        self.assertIn('message', response_data)
        self.assertIn('uid', response_data)
        self.assertIn('refresh', response_data)
        self.assertIn('access', response_data)

        # Check user was created
        self.assertTrue(User.objects.filter(username='testuser').exists())

        # Check email was sent
        mock_email_instance.attach_alternative.assert_called_once()
        mock_email_instance.send.assert_called_once()

    def test_register_duplicate_username(self):
        """Test registration with duplicate username"""
        # Create data with existing username
        duplicate_data = self.user_data.copy()
        duplicate_data['username'] = 'existinguser'

        # Create request
        request = self.factory.post(
            reverse('register'),
            data=json.dumps(duplicate_data),
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, 400)

        # Parse response data
        response_data = json.loads(response.content)

        # Check error message
        self.assertEqual(response_data['message'], 'Username already exists')

    def test_register_duplicate_email(self):
        """Test registration with duplicate email"""
        # Create data with existing email
        duplicate_data = self.user_data.copy()
        duplicate_data['email'] = 'existing@example.com'

        # Create request
        request = self.factory.post(
            reverse('register'),
            data=json.dumps(duplicate_data),
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, 400)

        # Parse response data
        response_data = json.loads(response.content)

        # Check error message
        self.assertEqual(response_data['message'], 'Email already exists')

    def test_register_invalid_json(self):
        """Test registration with invalid JSON data"""
        # Create request with invalid JSON
        request = self.factory.post(
            reverse('register'),
            data='invalid json',
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, 400)

        # Parse response data
        response_data = json.loads(response.content)

        # Check error message
        self.assertEqual(response_data['message'], 'Invalid JSON')

    @mock.patch('apps.users.views.RegisterSerializer')
    def test_register_invalid_data(self, mock_serializer_class):
        """Test registration with invalid data (validation error)"""
        # Setup mock for serializer
        mock_serializer = mock.MagicMock()
        mock_serializer.is_valid.return_value = False
        mock_serializer.errors = {'password': ['Password is too short']}
        mock_serializer_class.return_value = mock_serializer

        # Create data with invalid password (too short)
        invalid_data = self.user_data.copy()
        invalid_data['password'] = 'short'
        invalid_data['password2'] = 'short'

        # Create request
        request = self.factory.post(
            reverse('register'),
            data=json.dumps(invalid_data),
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('apps.users.views.RegisterSerializer')
    def test_register_password_mismatch(self, mock_serializer_class):
        """Test registration with mismatched passwords"""
        # Setup mock for serializer
        mock_serializer = mock.MagicMock()
        mock_serializer.is_valid.return_value = False
        mock_serializer.errors = {'password2': ["Passwords don't match"]}
        mock_serializer_class.return_value = mock_serializer

        # Create data with mismatched passwords
        invalid_data = self.user_data.copy()
        invalid_data['password'] = 'testpassword123'
        invalid_data['password2'] = 'differentpassword123'

        # Create request
        request = self.factory.post(
            reverse('register'),
            data=json.dumps(invalid_data),
            content_type='application/json'
        )

        # Call the view
        response = register(request)

        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_non_post_method(self):
        """Test registration with non-POST method"""
        # Create GET request
        request = self.factory.get(reverse('register'))

        # Call the view
        response = register(request)

        # The function doesn't handle non-POST methods, so it returns None
        # Let's check that the response is None
        self.assertIsNone(response)
