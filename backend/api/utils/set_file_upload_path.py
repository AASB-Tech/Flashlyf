from api.constants import files

class ContextNotAllowed(Exception):
    """ Exception raised to inform that a context is not allowed. """
    pass

class FileTypeNotAllowed(Exception):
    """ Exception raised to inform that a file type is not allowed. """
    pass

# Set the path of where the file should be uploaded.
# The URL will be derived from this too.
# reference_instances needs to passed in as an array of instances
def set_file_upload_path(instance, filename, filetype, context, reference_instances=None): 
    upload_path = ""
    
    allowed_filetypes = files.ACCEPTED_IMAGE_FORMATS + files.ACCEPTED_VIDEO_FORMATS + files.ACCEPTED_AUDIO_FORMATS
    try:
        if filetype not in allowed_filetypes:
            raise FileTypeNotAllowed("Wrong file type. " + filetype + " not allowed. File saving failed.")
        if context not in files.ALLOWED_CONTEXTS:
            raise ContextNotAllowed("Wrong context. " + context + " not allowed. File saving failed.")
        
        # Save the context part of the path
        if context == "post":
            upload_path += "/posts"
        elif context == "comment":
            upload_path += "/comments"
        elif context == "avatar":
            upload_path += "/avatars"
            #raise ContextNotAllowed("Avatars can only be images.")
        elif context == "ad":
            upload_path += "/ads"
        
        if context != "avatar": # Avatars will be saved in their root dir
            # Save the file type part of the path
            if filetype["mime_type"] in files.ACCEPTED_IMAGE_FORMATS:
                upload_path += "images"
            elif filetype["mime_type"] in files.ACCEPTED_VIDEO_FORMATS:
                upload_path += "videos"
            elif filetype["mime_type"] in files.ACCEPTED_AUDIO_FORMATS:
                upload_path += "audios"
        
    # TODO: Replace or remove this. The only valid exception I could see triggered is KeyError. We could remediate by using .get        
    except Exception as e: 
        print(e)
        return None
        
    return upload_path
