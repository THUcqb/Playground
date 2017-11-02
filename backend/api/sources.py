# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import ImmanentMaps
import json

@csrf_exempt
def savemaps(request):
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
            exist_level = ImmanentMaps.objects.get(level = level)
        except ImmanentMaps.DoesNotExist:
            the_map = ImmanentMaps.objects.create(level = level, immanentmap = immanentmap)
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")
        response_data["status"] = "Existed"
        return HttpResponse(json.dumps(response_data), content_type = "application/json")

@csrf_exempt
def loadmaps(request):
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
            the_map = ImmanentMaps.objects.get(level = level)
        except ImmanentMaps.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data), content_type = "application/json")
        response_data["maps"] = the_map.immanentmap
        response_data["status"] = "Successful"
        return HttpResponse(json.dumps(response_data), content_type = "application/json")


import os
module_dir = os.path.dirname(__file__)  # get current directory

@csrf_exempt
def load_toolbox(request):
    '''
    Handle the request of get blockly toolbox.

    :method: post
    :param param1: level
    :returns: The toolbox required.
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        level = d['level']
        file_path = os.path.join(module_dir, '../static/toolbox/toolbox_' + str(level) + '.xml')
        if not os.path.exists(file_path):
            file_path = os.path.join(module_dir, '../static/toolbox/toolbox_0.xml')

        f = open(file_path, 'r')
        response_data["status"] = "Successful"
        response_data["toolbox"] = f.read()
        return HttpResponse(json.dumps(response_data), content_type = 'application/json')

@csrf_exempt
def getimag(request):
    '''
    Handle the request of get imag source.

    :method: get
    :param param1: imag_name end with '.png'
    :returns: The imag required.
    '''
    if request.method == 'GET':
        imag_name = request.GET['imag_name']
        f = open(imag_name, 'rb')
        return HttpResponse(f.read(), content_type = 'image/png')
