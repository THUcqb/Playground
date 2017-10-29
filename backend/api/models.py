# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class UserInfo(models.Model):
    '''
    Store users' information.
    '''
    username = models.CharField(max_length = 50, default = '')
    password = models.CharField(max_length = 50, default = '')
    phonenumber = models.CharField(max_length = 11, default = '')
    email = models.EmailField()
    is_active = models.BooleanField(default = False)
    auth_code = models.CharField(max_length = 50, default = '')

    def __str__(self):
        return self.username

class ImmanentMaps(models.Model):
    '''
    Store the common maps.
    '''
    level = models.CharField(max_length = 3, default = '')
    immanentmap = models.CharField(max_length = 200, default = '')
    
    def __str__(self):
        return self.level

class AMap(models.Model):
    '''
    Store one of the users' maps.
    '''
    level = models.CharField(max_length = 3, default = '')
    stars = models.CharField(max_length = 1, default = '')
    unlock = models.BooleanField(default = False)
    
class UserMaps(models.Model):
    '''
    Store a user's maps statement.
    '''
    username = models.CharField(max_length = 100, default = '')
    maps = []
    def __init__(self):
        for i in range(10):
            amap = AMap()
            amap.level = i + 1
            maps.add(amap)
        maps[0].unlock = True
