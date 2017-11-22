# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import ImmanentMaps, ToolBox
import json

@csrf_exempt
def save_maps(request):
    '''
    Handle request of saving a common map.

    :method: post
    :param param1: level
    :param param2: maps
    :returns: if succeed, return {'status':'Successful'}
              else, return {'status':'Existed'}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        immanentmap = d['maps']
        try:
            exist_level = ImmanentMaps.objects.get(level = str(level))
        except ImmanentMaps.DoesNotExist:
            the_map = ImmanentMaps.objects.create(level = str(level), immanentmap = immanentmap)
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")
        response_data["status"] = "Existed"
        return HttpResponse(json.dumps(response_data), content_type = "application/json")

@csrf_exempt        
def save_standard(request):
    '''
    Handle request of saving a standard solution of a map.

    :method: post
    :param param1: level
    :param param2: solution
    :returns: if succeed, return {'status':'Successful'}
              else if the level doesn't exist, return {'status':'LevelNotExisted'}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        try:
            the_map = ImmanentMaps.objects.get(level = str(level))
            the_map.standard = d['solution']
            the_map.save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")
        except ImmanentMaps.DoesNotExist:
            response_data["status"] = "LevelNotExisted"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")

@csrf_exempt
def load_maps(request):
    '''
    Handle request of loading a common map.

    :method: post
    :param param1: level
    :returns: if succeed, return {'status':'Successful', 'maps':required_map}
              else, return {'status':'NotExisted'}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        try:
            the_map = ImmanentMaps.objects.get(level = str(level))
            response_data["maps"] = the_map.immanentmap
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")
        except ImmanentMaps.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")

import os
module_dir = os.path.dirname(__file__)  # get current directory

@csrf_exempt
def save_toolbox(request):
    '''
    Handle the request of save blockly toolbox.

    :method: post
    :param param1: level
    :returns: if succeed, return {"status":"Successful"}
              else if the toolbox has already saved, return {"status":"Existed"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        file_path = os.path.join(module_dir, '../static/toolbox/toolbox_' + str(level) + '.xml')
        if not os.path.exists(file_path):
            file_path = os.path.join(module_dir, '../static/toolbox/toolbox_0.xml')
        f = open(file_path, 'r')
        try:
            toolbox = ToolBox.objects.get(level = str(level))
            response_data["status"] = "Existed"
            return HttpResponse(json.dumps(response_data), content_type = 'application/json')
        except ToolBox.DoesNotExist:
            toolbox = ToolBox.objects.create(level = level)
            toolbox.toolbox = f.read()
            toolbox.save()
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type = 'application/json')

@csrf_exempt
def load_toolbox(request):
    '''
    Handle the request of get blockly toolbox.

    :method: post
    :param param1: level
    :returns: {"status":"Successful", "toolbox":required toolbox}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        try:
            toolbox = ToolBox.objects.get(level = str(level))
        except ToolBox.DoesNotExist:
            toolbox = ToolBox.objects.get(level = str(0))
        response_data["status"] = "Successful"
        response_data["toolbox"] = toolbox.toolbox
        return HttpResponse(json.dumps(response_data), content_type = 'application/json')
