import os
from datetime import datetime, timedelta
from django.conf import settings
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import User, Post, DeletedPostReference, Hashtag
from api.serializers import PostSerializer
from django.db.models import Q
from api.utils.set_file_upload_path import set_file_upload_path
from api.utils.get_file_mime_type import get_file_mime_type
from api.constants import files

# Get all the posts from a user
@api_view(["GET"])
def get_posts_user(request, user_id):
    limit = int(request.query_params.get('limit', 1))
    if user_id:
        user = User.objects.get(id=user_id)
        posts = Post.objects.filter(user=user)[:limit]
    posts_serialized = PostSerializer(posts, many=True).data
    payload = {"data": posts_serialized}
    return Response(payload, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request):
    text_content = request.POST.get("text_content")
    hashtags = request.POST.getlist("hashtags")
    if len(hashtags) > 3:
        payload = {"success": False, "message": "Maximum number of hashtags is 3."}
        Response(payload, status=status.HTTP_400_BAD_REQUEST)
    user = request.user
    # try post creation
    try:
        current_datetime = timezone.now()
        # Add 24 hours to the current datetime
        post_expiration_datetime = current_datetime + timedelta(hours=24)
        post = Post.objects.create(
            user=user,
            text_content=text_content,
            expires_at=post_expiration_datetime
            )
        # Loop through the hashtags and add them to the post instance
        for tag in hashtags:
            # If the hashtag does not exist yet, create it and then get it.
            # If the hashtag already exists, get it.
            hashtag, created = Hashtag.objects.get_or_create(hashtag=tag)
            post.hashtags.add(hashtag)
        post.save()
        
        # Post contains a file
        if request.FILES:
            uploaded_file = request.FILES.get("file")
            filetype = get_file_mime_type(uploaded_file)
            # Get the post_type from the file type
            post_type = filetype["mime_type"].split("/")[0]
            # Change the filename to postid
            original_filename = uploaded_file.name
            file_extension = os.path.splitext(original_filename)[1]
            new_filename = post.id + file_extension
            uploaded_file.name = new_filename
            upload_path = set_file_upload_path(post, new_filename, filetype['mime_type'], "post")
            # Save the file to the filesystem and in the post instance
            post.file.upload_to = upload_path
            post.file.save(upload_path, uploaded_file, save=True)
            post.post_type = post_type
            post.save()
    except Exception as e:
        # Check if a post has been created, if yes, delete it upon error.
        if "post" in locals():
            # Delete the file first
            if post.file:
                post.file.delete
            post.delete()
        print(e)
        payload = {"success": False, "message": e.args[0]}
        Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO: Create a notification towards followers of the post"s user. (in Redis)

    payload = {"success": True, "message": "Post created successfully."}
    Response(payload, status=status.HTTP_201_CREATED)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    user = request.user
    post = Post.objects.get(id=post_id)
    # Save a reference of the deleted post for analytics usage
    deleted_post_ref = DeletedPostReference.objects.create(
                                            user=user, 
                                            post_id=post_id,
                                            delete_reason="user deleted",
                                            created_at=post.created_at,
                                            )
    post.delete()
    payload = {"message": f"Post with ID: {post_id} has been deleted"}
    return Response(payload, status=status.HTTP_200_OK)

# NOT DONE YET
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_post(request):
    try:
        post_id = request.POST.get("post_id")
        post = Post.objects.get(id=post_id)
        old_post = post  # Save the old post in case edit fails?
    except Post.DoesNotExist:
        payload = {"message": "Post does not exist."}
        return Response(payload, status=status.HTTP_404_NOT_FOUND)
    # Try edit the post
    try:
        # Update text_content if available
        text_content = request.POST.get("text_content")
        if text_content:
            post.text_content = text_content
    
    except Exception as e:
        # If there was an error revert back to the old post.
        post.text_content = old_post.text_content
        # WARNING: How do we know if the old file got deleted?
        post.save()
        # Delete the saved file too.
            # if "is_handle_file_save_sucess" in locals():
            #     if is_handle_file_save_sucess != False:
            #         handle_file_delete(file_path)
        print(e)
        payload = {"message": e.args[0]}
        return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    payload = {"message": "Post updated successfully."}
    return Response(payload, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def report_post(request):
    pass