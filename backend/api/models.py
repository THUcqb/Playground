# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import json
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
    VIPtime = models.IntegerField(default = 0)
    VIPtype = models.CharField(max_length = 50, default = '')

    def __str__(self):
        return self.username

class ImmanentMaps(models.Model):
    '''
    Store the common maps.
    '''
    level = models.CharField(max_length = 3, default = '')
    immanentmap = models.CharField(max_length = 200, default = '')
    standard = models.TextField(default = '')
    
    def __str__(self):
        return self.level

class AMap(models.Model):
    '''
    Store one of the users' maps.
    '''
    username = models.CharField(max_length = 100, default = '')
    level = models.CharField(max_length = 2, default = '')
    stars = models.CharField(max_length = 1, default = '')
    unlock = models.BooleanField(default = False)
    solution = models.TextField(default = '')

class ToolBox(models.Model):
    '''
    Store the toolbox of each level.
    '''
    level = models.CharField(max_length = 2, default = '') 
    toolbox = models.TextField(default = '')
    
class DIYMaps(models.Model):
    '''
    Store the maps edited by the users.
    '''
    username = models.CharField(max_length = 100, default = '')
    mapinfo = models.CharField(max_length = 100, default = '')
    mapname = models.CharField(max_length = 100, default = '')
    solution = models.TextField(max_length = 100, default = '')
