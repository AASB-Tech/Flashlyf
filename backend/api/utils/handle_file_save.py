# DEPRECATED 
# DO NOT DELETE THIS FILE, MAY BE USED FOR FUTURE REFERENCE

from api.utils.check_mime_type_allowed import check_mime_type_allowed
from api.utils.get_file_mime_type import get_file_mime_type

def handle_file_save(file, file_path):
    try:
        file_type = get_file_mime_type(file)
        is_mime_allowed = check_mime_type_allowed(file_type['mime_type'])
        if not is_mime_allowed:
            return False
        
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        # File save successful
        return True
    except Exception as e:  # TODO: Get better error handling
        print("File saving failed.")
        print(e)
        return False
