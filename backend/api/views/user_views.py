import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import UserProfile
from api.utils.set_file_upload_path import set_file_upload_path
from api.utils.check_mime_type_allowed import check_mime_type_allowed
from api.utils.get_file_mime_type import get_file_mime_type

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_profile_pic(request):
    user = request.user    
    if request.FILES:
            image_file = request.FILES.get('avatar')
            file_type = get_file_mime_type(image_file)
            is_mime_allowed = check_mime_type_allowed(file_type['mime_type'])
            if not is_mime_allowed:
                payload = {"message": "File type is not allowed."}
                return Response(payload, status=status.HTTP_400_BAD_REQUEST)
            # Delete the old profile picture, if the old profile pic exists.
            if user.profile.profile_pic:
                user.profile.profile_pic.delete()
            # Start uploading the file
            upload_path = set_file_upload_path(user.profile, image_file.name, "avatar", reference_instances=[user])
            user.profile.profile_pic.upload_to = upload_path
            user.profile.profile_pic.save(upload_path, image_file, save=True)
            
            payload = {"message": "New profile picture uploaded."}
            return Response(payload, status=status.HTTP_200_OK)
    else:
        payload = {"message": "There was no file found in the request."}
        return Response(payload, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
