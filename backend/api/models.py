import os
from uuid import uuid4
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import validate_ipv4_address, MaxValueValidator, MinValueValidator
from api.validators import validate_image_file_size
from api.constants import user_roles, relationships, genders, education, countries

"""
File system architecture:

/media
-/avatars
-/comments
--/audio
--/images
-/posts
--/audio
--/images
--/video
"""

# Custom user model
# Login:
# authenticate(username=email, password=password)
class User(AbstractUser):
    USERNAME_FIELD = "email"
    # The username is for identification of the user in the frontend and publicly displayed
    REQUIRED_FIELDS = ["username"]

    # The user ID is for identification of the user in the backend
    id = models.UUIDField("User id", primary_key=True, default=uuid4, editable=False)
    email = models.EmailField("Email address", max_length=254, unique=True)
    email_verified = models.BooleanField(default=False)
    recovery_email = models.EmailField("Recovery email", max_length=254, blank=True)
    # TODO: From experience you want better validation than this at the DB level
    # This will need research and a lot of validation
    phone = models.CharField("Phone number", max_length=17, blank=True)
    recovery_phone = models.CharField("Recovery phone number", max_length=17, blank=True)
    # TODO: This souldn"t be here. Guess it shoud be in a related model instead.
    balance = models.DecimalField(max_digits=19, decimal_places=4, default=0, validators=[MinValueValidator(0)])
    last_ipv4 = models.CharField("Last ipv4", max_length=55, default="0.0.0.0", blank=True, validators=[validate_ipv4_address])
    role = models.CharField("User role", max_length=10, default="normal", choices=user_roles.CHOICES)
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
    # TODO: Test and confirm
    avatar = models.ImageField("Profile picture", upload_to="", blank=True, validators=[validate_image_file_size])
    total_time_added = models.BigIntegerField(default=0)
    total_time_removed = models.BigIntegerField(default=0)
    # profile_pic_url = models.URLField(max_length=300, default=f"{settings.MEDIA_URL}images/avatars/default-profile-pic.webp")
    given_name = models.CharField(max_length=35, blank=True)
    last_name = models.CharField(max_length=35, blank=True)
    display_name = models.CharField(max_length=70, blank=True)
    bio = models.CharField(max_length=5000, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=11, blank=True, choices=genders.CHOICES)
    relationship = models.CharField(max_length=11, blank=True, choices=relationships.CHOICES)
    relationship_with = models.ForeignKey(User, related_name="relationships_with", on_delete=models.CASCADE, null=True, blank=True)
    language = models.CharField(max_length=100, blank=True)
    job_company = models.CharField(max_length=100, blank=True)
    job_industry = models.CharField(max_length=100, blank=True)
    job_role = models.CharField(max_length=100, blank=True)
    education = models.CharField(max_length=16, choices=education.CHOICES, blank=True)
    country = models.CharField(max_length=500, blank=True, choices=countries.CHOICES)
    city = models.CharField(max_length=100, blank=True)
    website = models.URLField(max_length=300, blank=True)
    
    @property
    def full_name(self):
        return f"{self.given_name} {self.last_name}"

    def __str__(self):
        return f"profile of {self.user.username}"

    class Meta:
        db_table = "users_profiles"
        verbose_name_plural = "UsersProfiles"
    
class UserNotificationPreferences(models.Model):
    user = models.OneToOneField(User, related_name="notification_preferences", on_delete=models.CASCADE, primary_key=True, editable=False)
    # The is_all settings override all the other settings
    is_all_email = models.BooleanField(default=False)
    is_all_push = models.BooleanField(default=False)
    is_all_inapp = models.BooleanField(default=False)
    is_new_follower_email = models.BooleanField(default=True)
    is_new_follower_inapp = models.BooleanField(default=True)
    is_new_follower_push = models.BooleanField(default=True)
    is_comment_on_post_email = models.BooleanField(default=True)
    is_comment_on_post_inapp = models.BooleanField(default=True)
    is_comment_on_post_push = models.BooleanField(default=True)
    is_time_added_post_email = models.BooleanField(default=True)
    is_time_added_post_inapp = models.BooleanField(default=True)
    is_time_added_post_push = models.BooleanField(default=True)
    is_time_removed_post_email = models.BooleanField(default=True)
    is_time_removed_post_inapp = models.BooleanField(default=True)
    is_time_removed_post_push = models.BooleanField(default=True)
    is_post_almost_expired_email = models.BooleanField(default=True)
    is_post_almost_expired_inapp = models.BooleanField(default=True)
    is_post_almost_expired_push = models.BooleanField(default=True)
    is_post_deleted_email = models.BooleanField(default=True)
    is_post_deleted_inapp = models.BooleanField(default=True)
    is_post_deleted_push = models.BooleanField(default=True)
    is_following_new_post_email = models.BooleanField(default=False)
    is_following_new_post_inapp = models.BooleanField(default=False)
    is_following_new_post_push = models.BooleanField(default=False)

    def __str__(self):
        return f"preferences of {self.user.username}"

    class Meta:
        db_table = "users_notification_preferences"
        verbose_name_plural = "UsersNotificationPreferences"
        
class UserPrivacySettings(models.Model):
    user = models.OneToOneField(User, related_name="privacy_settings", on_delete=models.CASCADE, primary_key=True, editable=False)
    is_profile_searchable = models.BooleanField(default=True)

    def __str__(self):
        return f"privacy settings of {self.user.username}"

    class Meta:
        db_table = "users_privacy_settings"
        verbose_name_plural = "UsersPrivacySettings"

# follower follows followee. followee is followed by follower
class Following(models.Model):
    follower = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    followee = models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.follower.username} Follows: {self.followee.username}"

    class Meta:
        db_table = "following"
        verbose_name_plural = "followings"
        constraints = [
            models.UniqueConstraint(
                fields=["follower", "followee"], name="composite_pk_on_following")
        ]

        
class Hashtag(models.Model):
    id = models.CharField(max_length=50, primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "hashtags"
        verbose_name_plural = "Hashtags"
        
#  Is it possible for a user to be subscribed to hashtag that has been deleted or does not exist?
#  ---
#  it is not possible to keep a foreign key relationship intact after the referenced object has been deleted.
#  When the hashtag is deleted, it will trigger a cascading delete of all related SubscribedHashtag objects.
#  However, you could create a custom delete method for the Hashtag model which marks the hashtag as deleted instead of deleting it.
#  You could add a boolean field called is_deleted to the Hashtag model and set it to True when the delete method is called.
#  Then, modify the queries in your views and templates to exclude any deleted hashtags.
#  Another option would be to create a separate table to store the subscription information, instead of using a foreign key relationship with the Hashtag model.
#  This table could have a field for the hashtag name or ID, and the subscription status could be updated even if the original hashtag is deleted.
class SubscribedHashtag(models.Model):
    user = models.ForeignKey(User, related_name="sucribed_hashtags", on_delete=models.CASCADE)
    hashtag = models.ForeignKey(Hashtag, related_name="suscribees", on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username} Subscribed to hashtag: {self.hashtag.hashtag}"

    class Meta:
        db_table = "subscribed_hashtags"
        verbose_name_plural = "SubscribedHashtags"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "hashtag"], name="composite_pk_on_subscribed_hashtags")
        ]
        
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    text_content = models.CharField(max_length=40000)
    file = models.FileField(upload_to="", blank=True)
    post_type = models.CharField(max_length=5, default="text",
                                choices=[
                                    ("text", "Text"),
                                    ("image", "Image"),
                                    ("video", "Video"),
                                    ("audio", "Audio")])
    # Only 3 hashtags per post allowed
    hashtags = models.ManyToManyField(Hashtag, related_name="posts", blank=True)
    # Time added in seconds (this only counts time added by users)
    time_added = models.IntegerField(default=0)
    # Time removed in seconds (this only counts time removed by users)
    time_removed = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"{self.id}"
    
    class Meta:
        db_table = "posts"
        verbose_name_plural = "Posts"
        ordering = ["-created_at"]

class PostLikesDislikes(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=7, choices=[
                                        ("like", "Like"),   
                                        ("dislike", "Dislike")])
    # If interaction_type = like then time_changed is added
    # If interaction_type = dislike then time_changed is removed
    time_changed = models.IntegerField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post {self.id} {self.interaction_type} by {self.user.username}. Time changed: {self.time_changed}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["post", "user"], name="composite_pk_on_post_likesdislikes")
        ]
        db_table = "post_likesdislikes"
        verbose_name_plural = "PostLikesDislikes"
        ordering = ["-created_at"]

# This stores a reference to the post that was deleted, 
# because we can no longer retrieve the post info after its deleted. (because the foreign key is gone after deletion)
# It only stores the post id, and when a post was created not the whole post info.
# This is mainly used for analytics purposes.
class DeletedPostReference(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post_id = models.UUIDField(editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    delete_reason = models.CharField(max_length=17, choices=[
                                        ("user deleted", "User deleted"),
                                        ("moderator deleted", "Moderator deleted"),
                                        ("post expired", "Post expired"),
                                        # audo deleted = Deleted by AI (feature not yet implemented)
                                        ("auto deleted", "Auto deleted")])
    time_added = models.IntegerField(blank=False)
    time_removed = models.IntegerField(blank=False)
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
        
class PostPrivacySettings(models.Model):
    post = models.OneToOneField(Post, related_name="privacy_settings", on_delete=models.CASCADE, primary_key=True, editable=False)
    #is_commentable = models.BooleanField(default=True)
    #is_time_added_visible = models.BooleanField(default=True)
    #is_time_removed_visible = models.BooleanField(default=True)

    def __str__(self):
        return f"privacy settings of {self.post.id}"

    class Meta:
        db_table = "posts_privacy_settings"
        verbose_name_plural = "PostPrivacySettings"
        
class Comment(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    text_content = models.CharField(max_length=10000)
    # Only image and short audio files allowed
    file = models.FileField(upload_to="", null=True)
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
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    post = models.ForeignKey(Post, related_name="reported_posts", on_delete=models.CASCADE)
    report_reason = models.CharField(max_length=300)
    # How many times this post has been reported.
    reported_x_times = models.IntegerField(default=1, null=False, blank=False)
    first_report_time = models.DateTimeField(auto_now_add=True)
    last_report_time = models.DateField(auto_now=True, null=True)

    def __str__(self):
        return f"Reported post {self.post.id} - reported for {self.report_reason}. Reported ({self.reported_x_times} times)"

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
            "post_id": reported_post.post.id,
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
        
class Ad(models.Model):
    id = models.UUIDField("ad id", default=uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(User, related_name="ads", on_delete=models.CASCADE)
    ad_name = models.CharField(max_length=50)
    bid_price = models.DecimalField(max_digits=19, decimal_places=4, default=1, validators=[MinValueValidator(1)])
    text_content = models.CharField(max_length=1000)
    # The image or video or audio for the ad.
    ad_file = models.URLField(max_length=300, blank=True)
    # Where the ad links to when clicked
    ad_url = models.URLField(max_length=300, blank=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Parameters for targeting a user / demographic with this ad.
    targ_hashtags = models.ManyToManyField(
        Hashtag, related_name="ads", blank=True)
    # Targeting ads to minors is not allowed.
    targ_age_start = models.SmallIntegerField(blank=True, validators=[MinValueValidator(18), 
                                                                        MaxValueValidator(125)])
    targ_age_end = models.SmallIntegerField(blank=True,validators=[MinValueValidator(18), 
                                                                    MaxValueValidator(125)])
    targ_gender = models.CharField(max_length=11, blank=True, choices=genders.CHOICES)
    targ_relationship = models.CharField(max_length=11, blank=True, choices=relationships.CHOICES)
    targ_education = models.CharField(max_length=16, choices=education.CHOICES, blank=True)
    targ_job_industry = models.CharField(max_length=100, blank=True)
    targ_job_role = models.CharField(max_length=100, blank=True)
    targ_ccountry = models.CharField(max_length=500, blank=True, choices=countries.CHOICES)
    targ_city = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.ad_name} ad_id: {self.id}"

    class Meta:
        db_table = "ads"
        verbose_name_plural = "Ads"

class Transaction(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(User, related_name="transactions", on_delete=models.CASCADE)
    transaction_status = models.CharField(max_length=50)
    status_reason = models.CharField(max_length=100)
    transaction_type = models.CharField(max_length=11)
    price = models.DecimalField(max_digits=19, decimal_places=4)
    payment_method = models.CharField(max_length=100)
    transaction_date = models.DateTimeField()
    last_updated = models.DateTimeField()

    def __str__(self):
        return f"Transaction: {self.id} - {self.transaction_status} ({self.transaction_type})"

    class Meta:
        db_table = "transactions"
        verbose_name_plural = "Transactions"

class UserFeedback(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    rating = models.SmallIntegerField(validators=[MinValueValidator(1), 
                                                    MaxValueValidator(5)], 
                                        null=False)
    review = models.CharField(max_length=750, null=False)
    feedback_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback: {self.id} - {self.feedback_date}"

    class Meta:
        db_table = "userfeedback"
        verbose_name_plural = "UserFeedback"

class IssueReport(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    reported_by = models.ForeignKey(User, related_name="bug_reports", on_delete=models.CASCADE)
    report_description = models.CharField(max_length=5000, null=False)
    status = models.CharField(max_length=50, default="Open", null=False)
    priority = models.CharField(max_length=50, default="Medium", null=False)
    bug_report_time = models.DateTimeField(auto_now_add=True)
    latest_activity = models.DateTimeField(null=True)
    resolved_by = models.DateTimeField(null=True)

    def __str__(self):
        return f"Issue report: {self.id} - {self.bug_report_time}"

    class Meta:
        db_table = "issue_reports"
        verbose_name_plural = "IssueReports"

# ==================================================================================================
# OLD MODELS

# class PostLikes(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     time_added = models.IntegerField(blank=False)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Post {self.id} liked by {self.user.username}. Time removed: {self.time_removed}"

#     class Meta:
#         constraints = [
#             models.UniqueConstraint(
#                 fields=["post", "user"], name="composite_pk_on_post_likes")
#         ]
#         db_table = "post_likes"
#         verbose_name_plural = "PostLikes"
#         ordering = ["-created_at"]
        
# class PostDisLikes(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     time_removed = models.IntegerField(blank=False)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Post {self.id} disliked by {self.user.username}. Time removed: {self.time_removed}"

#     class Meta:
#         constraints = [
#             models.UniqueConstraint(
#                 fields=["post", "user"], name="composite_pk_on_post_dislikes")
#         ]
#         db_table = "post_dislikes"
#         verbose_name_plural = "PostDislikes"
#         ordering = ["-created_at"]