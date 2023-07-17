import os
from uuid import uuid4
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import validate_ipv4_address, MaxValueValidator, MinValueValidator
from api.validators import validate_image_file_size
from api.constants import user_roles, relationships, genders, education, countries
from api.utils.generate_friend_invite_code import generate_unique_code

"""
File system architecture:

/media
"""

# Custom user model
# Login:
# authenticate(username=email, password=password)
class User(AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    id = models.UUIDField("User id", primary_key=True, default=uuid4, editable=False)
    email = models.EmailField("Email address", max_length=254, unique=True)
    email_verified = models.BooleanField(default=False)
    recovery_email = models.EmailField(
        "Recovery email", max_length=254, blank=True)
    # TODO: From experience you want better validation than this at the DB level
    # This will need research and a lot of validation
    phone = models.CharField("Phone number", max_length=17, blank=True)
    recovery_phone = models.CharField(
        "Recovery phone number", max_length=17, blank=True)
    friend_invite_code = models.CharField(max_length=8, default=generate_unique_code)
    friend_invite_code_uses_left = models.IntegerField(default=40)
    # TODO: This souldn"t be here. Guess it shoud be in a related model instead.
    balance = models.DecimalField(
        max_digits=19, decimal_places=4, default=0, validators=[MinValueValidator(0)])
    last_ipv4 = models.CharField("Last ipv4",
                                max_length=55, default="0.0.0.0", blank=True, validators=[validate_ipv4_address])
    # Change this into just "role"???
    user_role = models.CharField("User role",
                                max_length=10, default="normal", choices=user_roles.CHOICES)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs) -> None:
        """ 
        This is what happens on user creation
        """
        creating = self._state.adding
        super().save(*args, **kwargs)
        if creating:
            UserProfile.objects.create(user=self)
            UserNotificationPreferences.objects.create(user=self)
            # Create the default album for this user.
            # The default album is where images in posts are added.
            default_album = Album.objects.create(
                                    user=self,
                                    title="Default album",
                                    description="The default album is where images in posts are added."
                                )
            # Create the directories for this user
            file_path_album = os.path.join(
                settings.MEDIA_ROOT,
                f"users/{self.id}/albums/{default_album.id}/"
            )
            file_path_comments = os.path.join(
                settings.MEDIA_ROOT,
                f"users/{self.id}/comments/"
            )
            os.makedirs(os.path.dirname(file_path_album), exist_ok=True)
            os.makedirs(os.path.dirname(file_path_comments), exist_ok=True)
        
    def __str__(self):
        return self.username

# Track at which time and at which ip the users login
class UserLoginHistory(models.Model):
    id = models.UUIDField("User id", primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, related_name="login_history", on_delete=models.CASCADE)
    login_ipv4 = models.CharField(max_length=55, default="0.0.0.0", blank=True, validators=[validate_ipv4_address])
    login_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.id} at {self.login_time} with {self.login_ipv4}"
    
    class Meta:
        db_table = "user_login_history"
        verbose_name_plural = "UserLoginHistory"

class UserProfile(models.Model):
    user = models.OneToOneField(
        User, related_name="profile", on_delete=models.CASCADE, primary_key=True, editable=False)
    profile_pic = models.ImageField(upload_to="", blank=True, validators=[validate_image_file_size])
    # TODO: Test and confirm
    # profile_pic_url = models.URLField(max_length=300, default=f"{settings.MEDIA_URL}images/avatars/default-profile-pic.webp")
    given_name = models.CharField(max_length=35, blank=True)
    last_name = models.CharField(max_length=35, blank=True)
    display_name = models.CharField(max_length=70, blank=True)
    bio = models.CharField(max_length=5000, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=11, blank=True, choices=genders.CHOICES)
    relationship = models.CharField(
        max_length=11, blank=True, choices=relationships.CHOICES)
    relationship_with = models.ForeignKey(
        User, related_name="relationships_with", on_delete=models.CASCADE, null=True, blank=True)
    language = models.CharField(max_length=100, blank=True)
    job_company = models.CharField(max_length=100, blank=True)
    job_industry = models.CharField(max_length=100, blank=True)
    job_role = models.CharField(max_length=100, blank=True)
    education = models.CharField(max_length=16, choices=education.CHOICES, blank=True)
    country = models.CharField(max_length=500, blank=True, choices=countries.CHOICES)
    city = models.CharField(max_length=100, blank=True)
    website = models.URLField(max_length=300, blank=True)

    def __str__(self):
        return f"profile of {self.given_name} {self.last_name} {self.user.id}"

    class Meta:
        db_table = "users_profiles"
        verbose_name_plural = "UsersProfiles"
    
class UserNotificationPreferences(models.Model):
    user = models.OneToOneField(
        User, related_name="notification_preferences", on_delete=models.CASCADE, primary_key=True, editable=False)
    is_all_email = models.BooleanField(default=True)
    is_all_push = models.BooleanField(default=True)
    is_all_inapp = models.BooleanField(default=True)
    is_new_friend_request_email = models.BooleanField(default=True)
    is_new_friend_request_inapp = models.BooleanField(default=True)
    is_new_friend_request_push = models.BooleanField(default=True)
    is_new_friend_accept_email = models.BooleanField(default=True)
    is_new_friend_accept_inapp = models.BooleanField(default=True)
    is_new_friend_accept_push = models.BooleanField(default=True)
    is_comment_on_post_email = models.BooleanField(default=True)
    is_comment_on_post_inapp = models.BooleanField(default=True)
    is_comment_on_post_push = models.BooleanField(default=True)
    is_heart_on_post_email = models.BooleanField(default=True)
    is_heart_on_post_inapp = models.BooleanField(default=True)
    is_heart_on_post_push = models.BooleanField(default=True)
    is_friend_new_post_email = models.BooleanField(default=True)
    is_friend_new_post_inapp = models.BooleanField(default=True)
    is_friend_new_post_push = models.BooleanField(default=True)

    def __str__(self):
        return f"preferences of {self.user.id}"

    class Meta:
        db_table = "users_notification_preferences"
        verbose_name_plural = "UsersNotificationPreferences"
        
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    text_content = models.CharField(max_length=40000)
    file = models.ImageField(upload_to="", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"{self.id}"
    
    class Meta:
        db_table = "posts"
        verbose_name_plural = "Posts"
        ordering = ["-created_at"]
        
# This stores a reference to the post that was deleted, 
# because we can no longer retrieve the post info after its deleted.
# It only stores the post id, and when a post was created not the whole post info.
# This is mainly used for analytics purposes.
class DeletedPostReference(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post_id = models.UUIDField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    delete_reason = models.CharField(max_length=17, choices=[
                                        ("user deleted", "User deleted"),
                                        ("moderator deleted", "Moderator deleted"),
                                        # audo deleted = Deleted by AI (feature not yet implemented)
                                        ("auto deleted", "Auto deleted")])
    # When the post was orginially created
    created_at = models.DateTimeField(blank=False)
    # When the post was deleted
    deleted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Deleted id: {self.post_id} at: {self.deleted_at}"

    class Meta:
        db_table = "deleted_posts_references"
        verbose_name_plural = "DeletedPostReferences"
        ordering = ["-created_at"]
        
class Comment(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    text_content = models.CharField(max_length=10000)
    image = models.ImageField(upload_to="", blank=True)
    #file_url = models.URLField(max_length=300, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"{self.comment_id}"

    class Meta:
        db_table = "comments"
        verbose_name_plural = "Comments"
        ordering = ["-created_at"]
        
class ReportedPost(models.Model):
    report_id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post = models.ForeignKey(Post, related_name="reportedposts", on_delete=models.CASCADE)
    report_reason = models.CharField(max_length=300)
    reported_x_times = models.IntegerField(default=1, null=False, blank=False)
    first_report_time = models.DateTimeField(auto_now_add=True)
    last_report_time = models.DateField(auto_now=True, null=True)

    def __str__(self):
        return f"Reported post {self.post.post_id} - reported for {self.report_reason} ({self.reported_x_times} times)"

    @staticmethod
    def format_reported_post_dict(reported_posts):
        result = []
        for reported_post in reported_posts:
            reported_post_dict = ReportedPost.format_reported_post_dict(
                reported_post)
            result.append(reported_post_dict)
        return result

    @staticmethod
    def format_reported_post_dict(reported_post):
        reported_post_dict = {
            "post_id": reported_post.post.post_id,
            "report_reason": reported_post.report_reason,
            "reported_x_times": reported_post.reported_x_times,
            "first_report_time": reported_post.first_report_time,
            "last_report_time": reported_post.last_report_time
        }
        return reported_post_dict

    class Meta:
        db_table = "reported_posts"
        verbose_name_plural = "ReportedPosts"
        constraints = [
            models.UniqueConstraint(
                fields=["post"], name="unique_reported_post")
        ]

class UserFeedback(models.Model):
    feedback_id = models.UUIDField(
        default=uuid4, primary_key=True, editable=False)
    rating = models.SmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], null=False)
    review = models.CharField(max_length=750, null=False)
    feedback_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback: {self.feedback_id} - {self.feedback_date}"

    class Meta:
        db_table = "userfeedback"
        verbose_name_plural = "UserFeedback"

class BugReport(models.Model):
    bug_report_id = models.UUIDField(
        default=uuid4, primary_key=True, editable=False)
    report_description = models.CharField(max_length=5000, null=False)
    bug_report_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bug report: {self.bug_report_id} - {self.bug_report_time}"

    class Meta:
        db_table = "bug_reports"
        verbose_name_plural = "BugReports"
