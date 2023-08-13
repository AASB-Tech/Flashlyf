import os
from api.constants import files

class ContextNotAllowed(Exception):
    """ Exception raised to inform that a context is not allowed. """
    pass

class FileTypeNotAllowed(Exception):
    """ Exception raised to inform that a file type is not allowed. """
    pass

# Set the path of where the file should be uploaded.
# The URL will be derived from this too.
# reference_instances needs to passed in as an array of instances (usually not used LOL, but still keep it just in case. ;)
def set_file_upload_path(instance, filename, filetype, context, reference_instances=None): 
    upload_path = ""
    
    allowed_filetypes = files.ACCEPTED_IMAGE_FORMATS + files.ACCEPTED_VIDEO_FORMATS + files.ACCEPTED_AUDIO_FORMATS
    try:
        if filetype not in allowed_filetypes:
            raise FileTypeNotAllowed("Wrong file type. " + filetype + " not allowed. File saving failed.")
        if context not in files.ALLOWED_CONTEXTS:
            raise ContextNotAllowed("Wrong context. " + context + " not allowed. File saving failed.")

        if context != "avatars": 
            # Save the path if correct file type
            if filetype in files.ACCEPTED_IMAGE_FORMATS:
                upload_path = os.path.join(context, "images", filename)
            elif filetype in files.ACCEPTED_VIDEO_FORMATS:
                upload_path = os.path.join(context, "videos", filename)
            elif filetype in files.ACCEPTED_AUDIO_FORMATS:
                upload_path = os.path.join(context, "audios", filename)
        # Avatars will be saved in their root dir, because it only consists of images so having subfolders for that is redundant.
        elif context == "avatars" and filetype in files.ACCEPTED_IMAGE_FORMATS:
            upload_path = os.path.join(context, filename)
        
    # TODO: Replace or remove this. The only valid exception I could see triggered is KeyError. We could remediate by using .get ?????   
    except Exception as e: 
        print("Error in set_file_upload_path: ", e)
        return None
        
    return upload_path
