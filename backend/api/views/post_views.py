import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import User, Post, DeletedPostReference
from api.serializers import PostSerializer
from api.utils.handle_file_save import handle_file_save
from django.db.models import Q

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
#     user = request.user
#     text_content = request.POST.get("text_content")
#     print(text_content)
#     picture = None
#     try:
#         # Post contains a file
#         if request.FILES:
#             image_file = request.FILES.get('image') 
#             # Create the Picture instance
#             # picture = Picture.objects.create(
#             #     user=user,
#             #     description="Image upload from note.",
#             #     file=image_file
#             # )
#             # Get the default album for the user.
#             #album = Album.objects.get(user=user, title="Default album")
#             # Add the picture to the default album
#             #album.pictures.add(picture)
#             # Save the image file to filesystem
#             # file_path = os.path.join(
#             #     settings.MEDIA_ROOT,
#             #     f"users/{user.id}/albums/{album.id}/{picture.id}.jpg"
#             # )
#             # os.makedirs(os.path.dirname(file_path), exist_ok=True) # the default album should already be created upon user creation
#             # is_handle_file_save_sucess = handle_file_save(image_file, file_path)
#             if not is_handle_file_save_sucess:
#                 payload = {"message": "File upload failed."}
#                 return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         print("ONE")
#         # Create the Post instance
#         post = Post.objects.create(
#             user=user,
#             text_content=text_content
#             )
#         print("TWO")
#         # add picture instance to post instance
#         if picture:
#             print("INSIDE IF PICTURE")
#             post.pictures.add(picture)
#             post.save()
#         print("THREE")

#     except Exception as e:
#         # Check if a post has been created, if yes, delete it upon error.
#         if "post" in locals():
#             post.delete()
#         # Delete the saved file too.
#             # if "is_handle_file_save_sucess" in locals():
#             #     if is_handle_file_save_sucess != False:
#             #         handle_file_delete(file_path)
#         print(e)
#         payload = {"message": e.args[0]}
#         return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#     # TODO: Create a notification towards followers of the post"s user. (in Redis)
        
    payload = {"message": "Post created successfully"}
    return Response(payload, status=status.HTTP_201_CREATED)

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