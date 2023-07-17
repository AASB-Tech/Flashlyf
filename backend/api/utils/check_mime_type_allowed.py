from api.constants import files
from api.utils.get_file_mime_type import get_file_mime_type

class FileTypeNotAllowed(Exception):
    """ Exception raised to inform that a file type is not allowed. """
    pass

def check_mime_type_allowed(file_type: str) -> bool:
    """ Checks if a file type is allowed. """
    try:
        if file_type in files.ACCEPTED_IMAGE_FORMATS:
            return True
        else:
            raise FileTypeNotAllowed("File type not allowed.")
    except Exception as e:
        print(e)
        return False   
