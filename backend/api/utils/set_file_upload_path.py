import os

# Set the path of where the file should be uploaded.
# The URL will be derived from this too.
# reference_instances needs to passed in as an array of instances
def set_file_upload_path(instance, filename, context, reference_instances=None):    
    allowed_contexts = ["avatar", "comment", "album"]
    if context not in allowed_contexts:
        raise ValueError("Invalid context value")
    
    # Define the upload paths based on the context
    # *reference_instances[0] = user instance
    # *reference_instances[1] = comment instance or album instance
    # *reference_instances[2] = picture instance
    if context == "avatar":
        # Only provide the user instance in *reference_instances
        upload_path = os.path.join("users", str(reference_instances[0].id), f"{reference_instances[0].id}_profile")
    elif context == "comment":
        # Provide the user instance and comment instance in *reference_instances
        upload_path = os.path.join("users", str(reference_instances[0].id), "comments", f"{reference_instances[1].id}")
    elif context == "album":
        # Provide the user instance and album instance and picture instance in *reference_instances
        upload_path = os.path.join("users", str(reference_instances[0].id), "albums", str(reference_instances[1].id), f"{reference_instances[2].id}")
        
    return upload_path
