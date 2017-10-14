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
