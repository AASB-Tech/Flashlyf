import os
from django.conf import settings
from django.http import FileResponse, HttpResponseNotFound, HttpResponseForbidden
from rest_framework.decorators import api_view
from api.constants import files

@api_view(["GET"])
def get_file(request, filepath):
    print(filepath)
    # Check if the file path is allowed.
    # Operations to non-allowed file paths are rejected.
    file_path_dissected = filepath.split("/")
    print("file_path_dissected", file_path_dissected)
    # Avatar paths are always image file type
    if "avatars" in file_path_dissected:
        context = file_path_dissected[1]
        file_type = "images"
    else:
        file_type = file_path_dissected[1]
        print("file_type", file_type)
        context = file_path_dissected[2]
    print("context", context)
    if file_type not in files.ALLOWED_FILE_TYPES:
        if context not in files.ALLOWED_CONTEXTS:
            return HttpResponseForbidden('403: File path not allowed.')
    fullpath = os.path.join(settings.MEDIA_ROOT, filepath)
    print("fullpath", fullpath)
    if os.path.exists(fullpath):
        return FileResponse(open(fullpath, 'rb'))
    else:
        return HttpResponseNotFound('404: File not found.')
