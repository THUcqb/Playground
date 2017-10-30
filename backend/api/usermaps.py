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
    :param param3: stars
    :returns: if the token is out of date, return {"status":"Expration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else if succeed, return {"status":"Successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            usermaps = UserMaps.objects.get(username = username)
            level = d['level']
            stars = d['stars']
            usermaps.maps[level - 1].stars = stars
            usermaps.maps[level - 1].save()
            usermaps.maps[level].unlock = True
            usermaps.maps[level].save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

def get_mapsinfo(request):
    '''
    Get a user's all maps information.
    
    :method: POST
    :param param1: token
    :returns: if succeed, return {"status":"Successful", level:{"stars":stars, "unlock":true or false}, level:{}, level:{}}
              else if the token is out of date, return {"status":"Expration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            usermaps = UserMaps.objects.get(username = username)
            mapinfo = {}
            for i in range(10):
                mapinfo["statrs"] = usermaps.maps[i].stars
                mapinfo["unlock"] = usermaps.maps[i].unlock
                response_data[i + 1] = mapinfo
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
