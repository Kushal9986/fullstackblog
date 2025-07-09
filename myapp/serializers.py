from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields =  ['id', 'name', 'email', 'password']
        # def create(self, validated_data):
        #     validated_data['password'] = make_password(validated_data['password'])
        #     return super().create(validated_data)




class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = '__all__'