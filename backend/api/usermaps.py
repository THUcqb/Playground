# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import UserMaps
import json
import base64
import time
from random import Random

def save_mapsinfo(request):
    '''
    Save a map when the user have completed a level.
    
    :method: POST
    :param param1: token
    :param param2: level
    :param param3: star
    :returns: if the token is out of date, return {"status":"expration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else, return {"status":"failed"}
    '''

def get_mapsinfo(request):
    '''
    Get a user's all maps information.
    
    :method: POST
    :param param1: token
    :returns: if succeed, return {level:{"star":star, "unlock":true or false}, level:{}, level:{}}
              else if the token is out of date, return {"status":"expration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else, return {"status":"failed"}
    '''
