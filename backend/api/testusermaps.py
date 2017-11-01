# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import unittest
from api.models import AMap, UserInfo
from django.test import Client
import json

class UserTestCase(TestCase):
    def setUp(self):
        pass
    def test_user(self):
        self.assertEqual(True, True)

class UserMapsTest(TestCase):
    def setUp(self):
        self.client = Client()
        
    def test_savemapsinfo(self):
        '''
        Test the save_mapsinfo API in usersystem.
        '''
        login_url = '/users/login'
        the_url = '/maps/save_maps'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        AMap.objects.create(username = 'zuohaojia', level = '1', unlock = True)
        for i in range(1, 10):
            AMap.objects.create(level = str(i + 1), username = 'zuohaojia')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token'], 'level':'1', 'stars':'3'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'Successful')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'level':1, 'stars':3}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=', 'level':1, 'stars':3}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')
        
    def test_getmapsinfo(self):
        '''
        Test the save_mapsinfo API in usersystem.
        '''
        login_url = '/users/login'
        the_url = '/maps/get_maps'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        AMap.objects.create(username = 'zuohaojia', level = '1', unlock = True)
        for i in range(1, 10):
            AMap.objects.create(level = str(i + 1), username = 'zuohaojia')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token']}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'Successful')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')

