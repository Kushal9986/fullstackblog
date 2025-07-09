from django.contrib import admin
from .models import *
# Register your models here.
class ShowUserData(admin.ModelAdmin):
    list_display = ["name","email","password","id"]

admin.site.register(UserData,ShowUserData)

class ShowArticle(admin.ModelAdmin):
    list_display = ["title","content","article_photo","status","id","userid"]
admin.site.register(Articles,ShowArticle)