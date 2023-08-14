from api.models import User, UserProfile, UserNotificationPreferences, Post, Comment
from rest_framework import serializers

# Field serializer
class StringUUIDField(serializers.UUIDField):
    """ 
    Use this field serializer to change the serialization behaviour of UUID fields. 

    UUID will serialized as a string.
    """

    def to_representation(self, value):
        if value:
            return str(value)
        return None

class UserRegisterSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="id", read_only=True)

    class Meta:
        model = User
        fields = ("user_id", "username", "email", "password")

class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="id", read_only=True)

    class Meta:
        model = User
        fields = ("user_id", "username", "email", "role")

class UserFullSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="id", read_only=True)

    class Meta:
        model = User
        fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
    user_profile_id = serializers.PrimaryKeyRelatedField(
        source="id", read_only=True)
    user_id = serializers.UUIDField(source="user.id", read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "user_id",
            "given_name",
            "last_name",
            "display_name",
            "bio",
            "date_of_birth",
            "gender",
            "relationship",
            "relationship_with",
            "language",
            "country",
            "city",
            "website"
        )

class UserNotificationPreferences(serializers.ModelSerializer):
    user_notification_preferences_id = serializers.PrimaryKeyRelatedField(source="id", read_only=True)
    user_id = serializers.UUIDField(source="user.id", read_only=True)

    class Meta:
        model = UserNotificationPreferences
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    #post_id = serializers.PrimaryKeyRelatedField(source="id", read_only=True)
    user_id = serializers.UUIDField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    #file_url = serializers.CharField(source="file.url", read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "user_id",
            "username",
            "text_content",
            "file_url",
            "post_type",
            "hashtags",
            "time_added",
            "time_removed",
            "created_at",
            "updated_at",
            "expires_at"
        )
        
    def get_file_url(self, post):
        if post.file:
            return post.file.url
        return ""  # Return empty string if no associated file
