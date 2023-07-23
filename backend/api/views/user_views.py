import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import UserProfile
from api.utils.set_file_upload_path import set_file_upload_path
from api.utils.get_file_mime_type import get_file_mime_type

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_profile_pic(request):
    user = request.user    
    if request.FILES:
            image_file = request.FILES.get('avatar')
            filetype = get_file_mime_type(image_file)
            # Delete the old profile picture, if the old profile pic exists.
            if user.profile.avatar:
                user.profile.avatar.delete()
            # Change the filename to userid
            original_filename = image_file.name
            file_extension = os.path.splitext(original_filename)[1]
            new_filename = user.id + file_extension
            image_file.name = new_filename
            # Start uploading the file
            upload_path = set_file_upload_path(user.profile, new_filename, filetype['mime_type'], "avatar")
            user.profile.avatar.upload_to = upload_path
            user.profile.avatar.save(upload_path, image_file, save=True)
            
            payload = {"message": "New profile picture uploaded."}
            return Response(payload, status=status.HTTP_200_OK)
    else:
        payload = {"message": "There was no file found in the request."}
        return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
