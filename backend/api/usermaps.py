# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import AMap, DIYMaps, ImmanentMaps
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
                if int(stars) > 0:
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
    :param param5: mapid
    :returns: if succeed, return {"status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
              else if the map hasn't been created, return {"status":"NotEixsted"}
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
        mapid = d['mapid']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        if mapid == 'null':
            diymap = DIYMaps.objects.create(username = username, mapname = mapname, solution = solution, mapinfo = mapinfo)
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        else:
            try:
                diymap = DIYMaps.objects.get(id = int(mapid))
                diymap.solution = solution
                diymap.mapname = mapname
                diymap.mapinfo = mapinfo
                diymap.save()
                response_data["status"] = "Successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            except DIYMaps.DoesNotExist:
                response_data["status"] = "NotExisted"
                return HttpResponse(json.dumps(response_data),content_type="application/json")            
           
@csrf_exempt
def get_diysolution(request):
    '''
    Save the maps edited by the users.
    
    :method: POST
    :param param1: token
    :param param2: mapid
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
        mapid = d['mapid']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            themap = DIYMaps.objects.get(id = int(mapid))
            response_data["solution"] = themap.solution
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        except DIYMaps.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def get_diymaps(request):
    '''
    Save the maps edited by the users.
    
    :method: POST
    :param param1: token
    :returns: if succeed, return {"status":"Successful", mapname:{"mapinfo":mapinfo, "mapid":mapid}, ...}
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
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        maps = DIYMaps.objects.filter(username = username)
        response_data["map"] = {}
        for i in range(len(maps)):
            themap = {}
            themap["mapinfo"] = maps[i].mapinfo
            themap["mapname"] = maps[i].mapname
            response_data["map"][str(maps[i].id)] = themap
        response_data["status"] = "Successful"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
        
@csrf_exempt
def map_share(request):
    '''
    Create a share-link when the user wants to share his diy-maps or common-maps.
    
    :method: POST
    :param param1: token
    :param param2: type (diy or common)
    :param param3: mapid(diy) or level(common)
    :returns: if succeed, return {"status":"Successful", "link":link}
              else if the token is out of date, return {"status":"Expiration"}
    '''         
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        username = user_info['username']
        now = time.time()
        response_data = {}
        ttype = d['type']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        if ttype == 'diy':
            payload_dict = {}
            payload_dict['mapid'] = d['mapid']
            payload_dict['type'] = 'diy'
            payload_dict['username'] = username
            payload_str = json.dumps(payload_dict)
            payload = base64.b64encode(payload_str.encode(encoding = "utf-8"))
            response_data["link"] = payload.decode()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        elif ttype == 'common':
            payloaddict = {}
            payloaddict['level'] = d['level']
            payloaddict['username'] = username
            payloaddict['type'] = 'common'
            payload_str = json.dumps(payloaddict)
            payload = base64.b64encode(payload_str.encode(encoding = "utf-8"))
            response_data["link"] = payload.decode()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
            

@csrf_exempt
def share_response(request):
    '''
    Return the map when the user click the share link.
    
    :method: POST
    :param param1: token
    :param param2: link
    :returns: if it is diy map, return {"status":"Successful", "mapinfo":mapinfo, "owner":user, "solution":solution, "mapname":mapname}
              else if it is common map, return {"status":"Successful", "mapinfo":mapinfo, "owner":user, "solution":solution, "level":level}
              else if the token is out of date, return {"status":"Expiration"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        now = time.time()  
        response_data = {}
        link_byte = d['link']
        link_str = link_byte.encode(encoding = "utf-8")
        link_info = base64.b64decode(link_str)
        link = link_info.decode('utf-8','ignore')
        link = json.loads(link)
        username = link['username']
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        if link['type'] == 'diy':
            mapid = link['mapid']
            themap = DIYMaps.objects.filter(username = username, id = mapid)
            response_data["status"] = "Successful"
            response_data["mapinfo"] = themap[0].mapinfo
            response_data["mapname"] = themap[0].mapname
            response_data["solution"] = themap[0].solution
            response_data["owner"] = username
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        elif link['type'] == 'common':
            level = link['level']
            amap = AMap.objects.filter(username = username, level = level)
            themap = ImmanentMaps.objects.filter(level = str(level))
            response_data["status"] = "Successful"
            response_data["solution"] = amap[0].solution
            response_data["level"] = level
            response_data["owner"] = username
            response_data["mapinfo"] = themap[0].immanentmap
            return HttpResponse(json.dumps(response_data),content_type="application/json")
