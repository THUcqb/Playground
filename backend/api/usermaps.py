# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import AMap, DIYMaps
import json
import base64
import time
from random import Random

def analyze_token(token_byte):
    '''
    Analyze the token received.
    
    :param param1: token_byte
    :returns: user_info
    '''
    token_str = token_byte.encode(encoding = "utf-8")
    token_info = base64.b64decode(token_str)
    token = token_info.decode('utf-8','ignore')
    user_info = json.loads(token)
    
    return user_info

@csrf_exempt
def save_mapsinfo(request):
    '''
    Save a map when the user have completed a level.
    
    :method: POST
    :param param1: token
    :param param2: level
    :param param3: stars
    :param param4: solution
    :returns: if the token is out of date, return {"status":"Expiration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else if succeed, return {"status":"Successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            level = d['level']
            stars = d['stars']
            solution = d['solution']
            amap = AMap.objects.get(username = username, level = str(level))
            amap.stars = stars
            amap.solution = solution
            amap.save()
            if int(level) < 10:
                nmap = AMap.objects.get(username = username, level = str(int(level) + 1))
                nmap.unlock = True
                nmap.save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except AMap.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def get_mapsinfo(request):
    '''
    Get a user's all maps information.
    
    :method: POST
    :param param1: token
    :returns: if succeed, return {"status":"Successful", level:{"stars":stars, "unlock":true or false}, level:{}, level:{}}
              else if the token is out of date, return {"status":"Expiration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        now = time.time()
        user_info = analyze_token(token_byte)
        username = user_info['username']
        expire = user_info['exp']
        response_data = {}
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

@csrf_exempt
def get_solution(request):
    '''
    Get a user's single map solution.
    
    :method: POST
    :param param1: token
    :param param2: level
    :returns: if succeed, return {"status":"Successful", "solution":solution}
              else if the token is out of date, return {"status":"Expiration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        response_data = {}
        now = time.time()
        username = user_info['username']
        level = d['level']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            amap = AMap.objects.get(username = username, level = str(level))
            response_data["solution"] = amap.solution
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except AMap.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
            
@csrf_exempt
def save_diymap(request):
    '''
    Save the maps edited by the users.
    
    :method: POST
    :param param1: token
    :param param2: mapinfo
    :param param3: mapname
    :param param4: solution
    :returns: if succeed, return {"status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        now = time.time()
        user_info = analyze_token(token_byte)
        response_data = {}
        username = user_info['username']
        mapname = d['mapname']
        solution = d['solution']
        mapinfo = d['mapinfo']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            diymap = DIYMaps.objects.get(username = username, mapname = mapname)
            diymap.solution = solution
            diymap.mapinfo = mapinfo
            diymap.save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except DIYMaps.DoesNotExist:
            diymap = DIYMaps.objects.create(username = username, mapname = mapname, solution = solution, mapinfo = mapinfo)
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
           
@csrf_exempt
def get_diysolution(request):
    '''
    Save the maps edited by the users.
    
    :method: POST
    :param param1: token
    :param param2: mapname
    :returns: if succeed, return {"status":"Successful", "solution":solution}
              else if the token is out of date, return {"status":"Expiration"}
              else if the map doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        username = user_info['username']
        now = time.time()
        response_data = {}
        mapname = d['mapname']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            themap = DIYMaps.objects.get(username = username, mapname = mapname)
            response_data["solution"] = themap.solution
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except DIYMaps.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def get_diymaps(request):
    '''
    Save the maps edited by the users.
    
    :method: POST
    :param param1: token
    :returns: if succeed, return {"status":"Successful", mapname:mapname, ...}
              else if the token is out of date, return {"status":"Expiration"}
              else if the map doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        response_data = {}
        user_info = analyze_token(token_byte)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            maps = DIYMaps.objects.filter(username = username)
            for i in range(len(maps)):
                response_data[maps[i].mapname] = maps[i].mapinfo
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except DIYMaps.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")    
