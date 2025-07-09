from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.hashers import check_password
from .models import UserData



urlpatterns = [
    path('createuser/',CreateUserDataAPIView.as_view(),name="create_user" ),
    path('login/', login_view),
    path('logout/', logout_view),

    # path('login/', LoginView.as_view()),
    # path('logout/', LogoutView.as_view()),
    
    # path('deleteuser/<int:id>',DeleteUserDataAPIView.as_view(),name="delete_user" ),

    # path('updateuser/<int:id>',UpdateUserDataAPIView.as_view(),name="update_user" ),

    # path('getallusers/',GetAllUserDataAPIView.as_view(),name="" ),

    # path('getuserbyid/<int:id>',GetUserByIdDataAPIView.as_view(),name="get_user_by_id" ),

    path('createarticles/',CreateArticleDataAPIView.as_view(),name="create_articles"),

    path('updatearticles/<str:id>',UpdateArticleDataAPIView.as_view(),name="update_articles"),

    path('deletarticles/<str:id>',DeleteArticleDataAPIView.as_view(),name="delete_articles"),

    path('getallarticles/',GetAllArticleDataAPIView.as_view(),name="get_all_articles"),

    path('getarticlebyid/<str:id>',GetArticleByIdDataAPIView.as_view(),name="get_article_by_id"),

    path('protected-view/',protected_view,name="logged_in_user"),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)