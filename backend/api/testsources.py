# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import unittest
from api.models import UserInfo, ImmanentMaps, ToolBox
from django.test import Client
import json


class ImmanentmapsTestcase(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_savemaps(self):
        '''
        Test the savemaps API in sources.
        '''
        save_url = '/sources/save_maps'
        
        parameter = {'level':'1', 'maps':'1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021'}
        json_parameter = json.dumps(parameter)
        
        res_1 = self.client.post(save_url, json_parameter, content_type = "application/json")
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'Successful')
        
        res_2 = self.client.post(save_url, json_parameter, content_type = "application/json")
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'Existed')
    
    def test_loadmaps(self):
        '''
        Test the loadmaps API in sources.
        '''
        load_url = '/sources/load_maps'
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        
        parameter_1 = {'level':'1'}
        json_parameter_1 = json.dumps(parameter_1)
        res_1 = self.client.post(load_url, json_parameter_1, content_type = "application/json")
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'Successful')
        
        parameter_2 = {'level':'3'}
        json_parameter_2 = json.dumps(parameter_2)
        res_2 = self.client.post(load_url, json_parameter_2, content_type = "application/json")
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'NotExisted')
    
    def test_savestandard(self):
        '''
        Test the save standard solution API in sources.
        '''
        theurl = '/sources/save_standard'
        ImmanentMaps.objects.create(level = '1', standard = 'for', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        
        data = {'level':'1'}
        jdata = json.dumps(data)
        res = self.client.post(theurl, jdata, content_type = "application/json")
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Successful')
        
        data = {'level':'100'}
        jdata = json.dumps(data)
        res = self.client.post(theurl, jdata, content_type = "application/json")
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'LevelNotExisted')
        
    def test_savetoolbox(self):
        '''
        Test the save_toolbox API in sources.
        '''
        save_url = '/blockly/save_toolbox'
        
        param1 = {'level':1}
        json_param1 = json.dumps(param1)
        res1 = self.client.post(save_url, json_param1, content_type = "application/json")
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        param2 = {'level':9}
        json_param2 = json.dumps(param2)
        res2 = self.client.post(save_url, json_param2, content_type = "application/json")
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
        
        param3 = {'level':1}
        json_param3 = json.dumps(param3)
        res3 = self.client.post(save_url, json_param3, content_type = "application/json")
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'Existed')
        
    def test_loadtoolbox(self):
        '''
        Test the load_toolbox API in sources.
        '''
        save_url = '/blockly/save_toolbox'
        load_url = '/blockly/load_toolbox'
        param = {'level':0}
        json_param = json.dumps(param)
        res = self.client.post(save_url, json_param, content_type = "application/json")
        param = {'level':1}
        json_param = json.dumps(param)
        res = self.client.post(save_url, json_param, content_type = "application/json")
        
        param1 = {'level':1}
        json_param1 = json.dumps(param1)
        res1 = self.client.post(load_url, json_param1, content_type = "application/json")
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        param2 = {'level':9}
        json_param2 = json.dumps(param2)
        res2 = self.client.post(load_url, json_param2, content_type = "application/json")
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
