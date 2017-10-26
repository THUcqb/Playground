# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import unittest
from api.models import UserInfo, ImmanentMaps
from django.test import Client
import json

class ImmanentmapsTestcase(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_savemaps(self):
        '''
        Test the savemaps API in immanentmaps.
        '''
        save_url = '/maps/save'
        
        parameter = {'level':'1', 'maps':'1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021'}
        json_parameter = json.dumps(parameter)
        
        res_1 = self.client.post(save_url, json_parameter, content_type = "application/json")
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'saved')
        
        res_2 = self.client.post(save_url, json_parameter, content_type = "application/json")
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'existed')
    
    def test_loadmaps(self):
        '''
        Test the loadmaps API in immanentmaps.
        '''
        load_url = '/maps/load'
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        
        parameter_1 = {'level':'1'}
        json_parameter_1 = json.dumps(parameter_1)
        res_1 = self.client.post(load_url, json_parameter_1, content_type = "application/json")
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'successful')
        
        parameter_2 = {'level':'3'}
        json_parameter_2 = json.dumps(parameter_2)
        res_2 = self.client.post(load_url, json_parameter_2, content_type = "application/json")
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'doesnotexist')
