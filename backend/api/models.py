# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class UserInfo(models.Model):
    username = models.CharField(max_length = 50, default = '')
    password = models.CharField(max_length = 50, default = '')
    phonenumber = models.CharField(max_length = 11, default = '')
    email = models.EmailField()

    def __str__(self):
        return self.username

class ImmanentMaps(models.Model):
    level = models.CharField(max_length = 3, default = '')
    immanentmap = models.CharField(max_length = 200, default = '')
    
    def __str__(self):
        return self.level
