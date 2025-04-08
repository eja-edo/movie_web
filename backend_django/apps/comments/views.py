from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Comments
from django.contrib.auth.models import User
from datetime import datetime

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_comments(request, episode_id):
    comments = Comments.objects.filter(episode_id=episode_id).order_by('-created_at')
    data = []
    for comment in comments:
        data.append({
            'username': comment.user.username,
            'message': comment.content,
            'timestamp': comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, episode_id):
    user = request.user
    message = request.data.get('message')
    
    if not message:
        return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    comment = Comments.objects.create(
        user=user,
        episode_id=episode_id,
        content=message,
        created_at=datetime.now()
    )
    
    return Response({
        'username': user.username,
        'message': comment.content,
        'timestamp': comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }, status=status.HTTP_201_CREATED)
