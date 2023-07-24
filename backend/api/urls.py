from django.urls import path
from .views import auth_views, user_views, analytics_views, post_views, comment_views, server_views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    # auth urls
    path("auth/login", auth_views.login_view, name="login"),
    path("auth/register", auth_views.register, name="register"),
    path("auth/logout", auth_views.logout_view, name="logout"),
    path("auth/checkAuth", auth_views.check_auth, name="check-auth"),
    path("auth/changePassword", auth_views.change_password, name="change-password"),
    #path("auth/resetPassword", auth_views.reset_password, name="teset-password"),
    # user urls
    path("users/changeProfilePic", user_views.change_profile_pic, name="change-profile-pic"),
    # post or note urls
    path("posts/getPostsUser/<str:user_id>", post_views.get_posts_user, name="get-posts-user"),
    path("posts/createPost", post_views.create_post, name="create-post"),
    path("posts/editPost", post_views.edit_post, name="edit-post"),
    path("posts/deletePost", post_views.delete_post, name="delete-post"),
    path("posts/changeTime", post_views.change_time, name="change-time"),
    path("posts/reportPost", post_views.report_post, name="report-post"),
    # comment urls
    path("comments/getComments", comment_views.get_comments, name="get-comments"),
    path("comments/createComment", comment_views.create_comment, name="create-comment"),
    path("comments/deleteComment", comment_views.delete_comment, name="delete-comment"),
    path("comments/editComment", comment_views.edit_comment, name="edit-comment"),
    # analytics urls
    path("analytics/countCurrentUsersByRole", analytics_views.get_count_current_users_by_role, name="count-current-users-b-role"),
    path("analytics/mostActiveUsers", analytics_views.get_most_active_users, name="most-active-users"),
    path("analytics/totalLogins", analytics_views.get_count_total_login, name="total-logins"),
    path("analytics/averageLogins", analytics_views.average_logins, name="average-logins"),
    path("analytics/countCurrentPosts", analytics_views.get_count_current_posts, name="count-current-posts"),
    path("analytics/countPostCreatedHourWeek", analytics_views.count_post_created_per_hour_and_weekday, name="count-post-created-hour-week"),
    path("analytics/countDeletedPosts", analytics_views.count_deleted_posts, name="count-deleted-posts"),
    path("analytics/databaseSize", analytics_views.get_database_size, name="count-deleted-posts"),
    # server urls
    path("server/ping", server_views.ping, name="ping")
]

# NOT DONE YET
# Inititalize the router
router = DefaultRouter(trailing_slash=False)

# Configure urlpatterns 
urlpatterns += router.urls
