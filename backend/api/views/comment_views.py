from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.models import User, Post, Comment

# Retrieves all comments for a given post
def get_comments(request, post_id):
    limit = int(request.GET.get('limit', 1))

def create_comment(request):
    pass

def delete_comment(request, comment_id):
    pass

def edit_comment(request):
    pass


