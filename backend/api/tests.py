# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import unittest
from api.models import UserInfo, ImmanentMaps
from django.test import Client
import json

class UserTestCase(TestCase):
    def setUp(self):
        pass
    def test_user(self):
        self.assertEqual(True, True)
    
class ModelTest(TestCase):
    def setUp(self):
        UserInfo.objects.create(username = 'First', password = 'first', phonenumber = '110', email = 'first@example.com')
        UserInfo.objects.create(username = 'Second', password = 'second', phonenumber = '110', email = 'second@example.com')
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
    
    def test_str_1(self):
        First = UserInfo.objects.get(username = 'First')
        Second = UserInfo.objects.get(username = 'Second')
        self.assertEqual(First.__str__(), 'First')
        self.assertEqual(Second.__str__(), 'Second')
        
    def test_str_2(self):
        map_1 = ImmanentMaps.objects.get(level = '1')
        self.assertEqual(map_1.__str__(), '1')

class UsersystemTest(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_register(self):
        reg_url = '/users/register'
        data = {'username':'zuohaojia', 'password':'waitlove', 'phonenumber':'12345', 'email':'zuohaojia@163.com'}
        json_data = json.dumps(data)
        res_1 = self.client.post(reg_url, json_data, content_type = 'application/json')
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'successful')
        res_2 = self.client.post(reg_url, json_data, content_type = 'application/json')
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'failed')
    
    def test_login(self):
        login_url = '/users/login'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        data_1 = {'username':'zuohaojia', 'password':'waitlove'}
        json_data_1 = json.dumps(data_1)
        res_1 = self.client.post(login_url, json_data_1, content_type = 'application/json')
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'successful')
        data_2 = {'username':'zuohaojia', 'password':'wait5683'}
        json_data_2 = json.dumps(data_2)
        res_2 = self.client.post(login_url, json_data_2, content_type = 'application/json')
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'failed')
        data_3 = {'username':'DoesNotExist', 'password':'do-not-exist'}
        json_data_3 = json.dumps(data_3)
        res_3 = self.client.post(login_url, json_data_3, content_type = 'application/json')
        text_3 = json.loads(res_3.content.decode('utf-8'))
        self.assertEqual(text_3['status'], 'failed')
    
    def test_logout(self):
        logout_url = '/users/logout'
        res = self.client.post(logout_url)
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'successful')
    
    def test_getinfo(self):
        login_url = '/users/login'
        get_url = '/users/getinfo'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        get_data = {'token':log_text['token']}
        get_json_data = json.dumps(get_data)
        get_res = self.client.post(get_url, get_json_data, content_type = 'application/json')
        get_text = json.loads(get_res.content.decode('utf-8'))
        self.assertEqual(get_text['status'], 'successful')
        get_data_2 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        get_json_data_2 = json.dumps(get_data_2)
        get_res_2 = self.client.post(get_url, get_json_data_2, content_type = 'application/json')
        get_text_2 = json.loads(get_res_2.content.decode('utf-8'))
        self.assertEqual(get_text_2['status'], 'failed')
        get_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwMTk4NjYwOC40ODQsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTAxOTg2NjEwLjQ4NH0='}
        get_json_data_3 = json.dumps(get_data_3)
        get_res_3 = self.client.post(get_url, get_json_data_3, content_type = 'application/json')
        get_text_3 = json.loads(get_res_3.content.decode('utf-8'))
        self.assertEqual(get_text_3['status'], 'failed')

class ImmanentmapsTestcase(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_savemaps(self):
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
        load_url = '/maps/load'
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        parameter_1 = {'level':'1'}
        json_parameter_1 = json.dumps(parameter_1)
        parameter_2 = {'level':'3'}
        json_parameter_2 = json.dumps(parameter_2)
        res_1 = self.client.post(load_url, json_parameter_1, content_type = "application/json")
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'successful')
        res_2 = self.client.post(load_url, json_parameter_2, content_type = "application/json")
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'doesnotexist')
