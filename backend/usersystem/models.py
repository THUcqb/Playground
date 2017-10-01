# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

class User(models.Model):
	userid = models.IntegerField(default = 0)
	username = models.CharField(max_length = 50)
	password = models.CharField(max_length = 50)
	email = models.EmailField()
	phonenumber = models.CharField(max_length = 12)