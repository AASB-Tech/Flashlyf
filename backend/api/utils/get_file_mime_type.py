import mimetypes
from typing import Union, TextIO, BinaryIO

def get_file_mime_type(file: Union[TextIO, BinaryIO]) -> dict[str]:
    """Returns the MIME type of a file as a string in the format type/subtype wrapped in an object
    If the MIME type cannot be determined from the file name, the function returns a default MIME type of octet-stream

    Args:
        file (Union[TextIO,BinaryIO]): The file you want to determine the mime type of.

    Returns:
        dict: A dict containing mime type and encoding.
    """
    mime_type, encoding = mimetypes.guess_type(file.name)
    if not mime_type:
        mime_type = 'application/octet-stream'
    # TODO: Is there a reason to keep encoding? This doesn't seem to be used anywhere.
    # Maybe simpler to just return the string of the mime_type.
    return {"mime_type": mime_type,  "encoding": encoding}
