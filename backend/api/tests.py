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
        '''
        Init the database for test.
        '''
        UserInfo.objects.create(username = 'First', password = 'first', phonenumber = '110', email = 'first@example.com')
        UserInfo.objects.create(username = 'Second', password = 'second', phonenumber = '110', email = 'second@example.com')
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
    
    def test_str_1(self):
        '''
        Test the function of '__str__(self)' in UserInfo in Models.
        '''
        First = UserInfo.objects.get(username = 'First')
        Second = UserInfo.objects.get(username = 'Second')
        self.assertEqual(First.__str__(), 'First')
        self.assertEqual(Second.__str__(), 'Second')
        
    def test_str_2(self):
        '''
        Test the function of '__str__(self)' in ImmanentMaps in Models.
        '''
        map_1 = ImmanentMaps.objects.get(level = '1')
        self.assertEqual(map_1.__str__(), '1')

class UsersystemTest(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_register(self):
        '''
        Test the registration API in usersystem.
        '''
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
        '''
        Test the login API in usersystem.
        '''
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
        '''
        Test the logout API in usersystem.
        '''
        logout_url = '/users/logout'
        
        res = self.client.post(logout_url)
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'successful')
    
    def test_getinfo(self):
        '''
        Test the getuserinfo API in usersystem.
        '''
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
        self.assertEqual(get_text_2['status'], 'expiration')
        
        get_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        get_json_data_3 = json.dumps(get_data_3)
        get_res_3 = self.client.post(get_url, get_json_data_3, content_type = 'application/json')
        get_text_3 = json.loads(get_res_3.content.decode('utf-8'))
        self.assertEqual(get_text_3['status'], 'failed')
        
    def test_changepassword(self):
        '''
        Test the changepassword API in usersystem.
        '''
        the_url = '/users/change_password'
        login_url = '/users/login'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token'],'old_password':'waitlove','new_password':'wait5683'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'successful')
        
        login_data_2 = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data_2 = json.dumps(login_data_2)
        log_res_2 = self.client.post(login_url, log_json_data_2, content_type = 'application/json')
        log_text_2 = json.loads(log_res_2.content.decode('utf-8'))
        self.assertEqual(log_text_2['status'], 'failed')
        
        login_data_3 = {'username':'zuohaojia', 'password':'wait5683'}
        log_json_data_3 = json.dumps(login_data_3)
        log_res_3 = self.client.post(login_url, log_json_data_3, content_type = 'application/json')
        log_text_3 = json.loads(log_res_3.content.decode('utf-8'))
        self.assertEqual(log_text_3['status'], 'successful')
        
        the_data_2 = {'token':log_text_3['token'],'old_password':'waitlove','new_password':'wait5683'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'failed')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=','old_password':'waitlove','new_password':'wait5683'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=','old_password':'waitlove','new_password':'wait5683'}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'failed')
    
    def test_emailauth(self):
        '''
        Test the emailauth API in usersystem.
        '''
        the_url = '/users/email_auth'
        login_url = '/users/login'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token']}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'successful')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'failed')
    
    def test_authresponse(self):
        '''
        Test the authresponse API in usersystem.
        '''
        the_url = '/users/auth_response'
        login_url = '/users/login'
        auth_url = '/users/email_auth'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token']}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(auth_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        
        the_data_1 = {'token':log_text['token'], 'code':the_text['code']}
        the_json_data_1 = json.dumps(the_data_1)
        the_res_1 = self.client.post(the_url, the_json_data_1, content_type = 'application/json')
        the_text_1 = json.loads(the_res_1.content.decode('utf-8'))
        self.assertEqual(the_text_1['status'], 'successful')
        
        the_data_2 = {'token':log_text['token'], 'code':'12345678'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'failed')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=','code':'12345678'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=','code':'12345678'}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'failed')

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
