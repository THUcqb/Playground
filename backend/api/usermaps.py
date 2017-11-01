# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import AMap
import json
import base64
import time
from random import Random

@csrf_exempt
def savemapsinfo(request):
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
            level = d['level']
            stars = d['stars']
            amap = AMap.objects.get(username = username, level = level)
            amap.stars = stars
            amap.save()
            nmap = AMap.objects.get(username = username, level = str(int(level) + 1))
            nmap.unlock = True
            nmap.save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except AMap.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def getmapsinfo(request):
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
            for i in range(10):
                mapinfo = {}
                amap = AMap.objects.get(username = username, level = str(i + 1))
                mapinfo["unlock"] = amap.unlock
                mapinfo["stars"] = amap.stars
                response_data[amap.level] = mapinfo
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except AMap.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

