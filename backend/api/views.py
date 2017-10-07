# -*- coding: utf-8 -*-
from __future__ import unicode_literals
#import django_filters
from rest_framework import viewsets, filters

from django.shortcuts import render
from .models import UserInfo
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
	queryset = UserInfo.objects.all()
	serializer_class = UserSerializer
