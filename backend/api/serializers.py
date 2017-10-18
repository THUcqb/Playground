# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import UserInfo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('username', 'password', 'phonenumber', 'email')
