from django.db import models
from django.utils.safestring import mark_safe

# Create your models here.
class UserData(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

class Articles(models.Model):
    title = models.TextField()
    content = models.TextField()
    image =models.ImageField()
    status = models.CharField(max_length=10)
    id = models.TextField(primary_key=True,max_length=100)
    userid = models.CharField(max_length=20)

    def article_photo(self):
        return mark_safe('<img src="{}" width="100"/>'.format(self.image.url))
    
    article_photo.allow_tags = True

