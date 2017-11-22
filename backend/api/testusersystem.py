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
        first = UserInfo.objects.get(username = 'First')
        second = UserInfo.objects.get(username = 'Second')
        self.assertEqual(first.__str__(), 'First')
        self.assertEqual(second.__str__(), 'Second')
        
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
        self.assertEqual(text_1['status'], 'Successful')
        
        res_2 = self.client.post(reg_url, json_data, content_type = 'application/json')
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'Existed')
    
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
        self.assertEqual(text_1['status'], 'Successful')
        
        data_1 = {'username':'110', 'password':'waitlove'}
        json_data_1 = json.dumps(data_1)
        res_1 = self.client.post(login_url, json_data_1, content_type = 'application/json')
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'Successful')
        
        data_1 = {'username':'zuohaojia@example.com', 'password':'waitlove'}
        json_data_1 = json.dumps(data_1)
        res_1 = self.client.post(login_url, json_data_1, content_type = 'application/json')
        text_1 = json.loads(res_1.content.decode('utf-8'))
        self.assertEqual(text_1['status'], 'Successful')
        
        data_2 = {'username':'zuohaojia', 'password':'wait5683'}
        json_data_2 = json.dumps(data_2)
        res_2 = self.client.post(login_url, json_data_2, content_type = 'application/json')
        text_2 = json.loads(res_2.content.decode('utf-8'))
        self.assertEqual(text_2['status'], 'PasswordError')
        
        data_3 = {'username':'DoesNotExist', 'password':'do-not-exist'}
        json_data_3 = json.dumps(data_3)
        res_3 = self.client.post(login_url, json_data_3, content_type = 'application/json')
        text_3 = json.loads(res_3.content.decode('utf-8'))
        self.assertEqual(text_3['status'], 'NotExisted')
    
    def test_logout(self):
        '''
        Test the logout API in usersystem.
        '''
        logout_url = '/users/logout'
        
        res = self.client.post(logout_url)
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Successful')
    
    def test_getinfo(self):
        '''
        Test the getuserinfo API in usersystem.
        '''
        login_url = '/users/login'
        get_url = '/users/getinfo'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        UserInfo.objects.create(username = 'youhaojia', password = 'waitlove', phonenumber = '110', email = 'youhaojia@example.com', VIPtime = 1542469871, VIPtype = 'Year')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        login = {'username':'youhaojia', 'password':'waitlove'}
        logjson = json.dumps(login)
        logres = self.client.post(login_url, logjson, content_type = 'application/json')
        logtext = json.loads(logres.content.decode('utf-8'))
        
        data = {'token':logtext['token']}
        res = self.client.post(get_url, json.dumps(data), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Successful')
        
        get_data = {'token':log_text['token']}
        get_json_data = json.dumps(get_data)
        get_res = self.client.post(get_url, get_json_data, content_type = 'application/json')
        get_text = json.loads(get_res.content.decode('utf-8'))
        self.assertEqual(get_text['status'], 'Successful')
        
        get_data_2 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        get_json_data_2 = json.dumps(get_data_2)
        get_res_2 = self.client.post(get_url, get_json_data_2, content_type = 'application/json')
        get_text_2 = json.loads(get_res_2.content.decode('utf-8'))
        self.assertEqual(get_text_2['status'], 'Expiration')
        
        get_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        get_json_data_3 = json.dumps(get_data_3)
        get_res_3 = self.client.post(get_url, get_json_data_3, content_type = 'application/json')
        get_text_3 = json.loads(get_res_3.content.decode('utf-8'))
        self.assertEqual(get_text_3['status'], 'NotExisted')
    
    def test_recharge(self):
        '''
        Test the recharge API in usersystem.
        '''
        the_url = '/users/recharge'
        login_url = '/users/login'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '13051312306', email = 'zuohaojia@163.com', is_active = True)
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_res = self.client.post(login_url, json.dumps(login_data), content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        param = {'token':log_text['token'], 'VIPtype':'Month'}
        res = self.client.post(the_url, json.dumps(param), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Successful')
        
        param1 = {'token':log_text['token'], 'VIPtype':'Season'}
        res1 = self.client.post(the_url, json.dumps(param1), content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        param2 = {'token':log_text['token'], 'VIPtype':'Year'}
        res2 = self.client.post(the_url, json.dumps(param2), content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
        
        param = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'VIPtype':'month'}
        res = self.client.post(the_url, json.dumps(param), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Expiration')
        
        param = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=', 'VIPtype':'month'}
        res = self.client.post(the_url, json.dumps(param), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'NotExisted')
    
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
        self.assertEqual(the_text['status'], 'Successful')
        
        login_data_2 = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data_2 = json.dumps(login_data_2)
        log_res_2 = self.client.post(login_url, log_json_data_2, content_type = 'application/json')
        log_text_2 = json.loads(log_res_2.content.decode('utf-8'))
        self.assertEqual(log_text_2['status'], 'PasswordError')
        
        login_data_3 = {'username':'zuohaojia', 'password':'wait5683'}
        log_json_data_3 = json.dumps(login_data_3)
        log_res_3 = self.client.post(login_url, log_json_data_3, content_type = 'application/json')
        log_text_3 = json.loads(log_res_3.content.decode('utf-8'))
        self.assertEqual(log_text_3['status'], 'Successful')
        
        the_data_2 = {'token':log_text_3['token'],'old_password':'waitlove','new_password':'wait5683'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'OldPasswordError')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=','old_password':'waitlove','new_password':'wait5683'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=','old_password':'waitlove','new_password':'wait5683'}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')
    
    def test_emailauth(self):
        '''
        Test the emailauth API in usersystem.
        '''
        the_url = '/users/email_auth'
        login_url = '/users/login'
        response_url = '/users/auth_response'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com')
        UserInfo.objects.create(username = 'yanlimin', password = 'wait5683', phonenumber = '120', email = 'hejie_cq@163.com', is_active = True)
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data = {'token':log_text['token']}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'Successful')
        
        login_data_1 = {'username':'yanlimin', 'password':'wait5683'}
        log_json_data_1 = json.dumps(login_data_1)
        log_res_1 = self.client.post(login_url, log_json_data_1, content_type = 'application/json')
        log_text_1 = json.loads(log_res_1.content.decode('utf-8'))
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_2 = {'token':log_text_1['token']}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'Actived')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')
    
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
        self.assertEqual(the_text_1['status'], 'Successful')
        
        the_data_2 = {'token':log_text['token'], 'code':'12345678'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'CodeError')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=','code':'12345678'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=','code':'12345678'}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')

    def test_retrievepassword(self):
        '''
        Test the retrievepassword api in usersystem.
        '''
        the_url = '/users/retrieve_password'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com')
        UserInfo.objects.create(username = 'yanlimin', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com', is_active = True)
        
        the_data_1 = {'username':'zuohaojia', 'email':'zuohaojia@163.com'}
        the_json_data_1 = json.dumps(the_data_1)
        the_res_1 = self.client.post(the_url, the_json_data_1, content_type = 'application/json')
        the_text_1 = json.loads(the_res_1.content.decode('utf-8'))
        self.assertEqual(the_text_1['status'], 'EmailError')
        
        the_data_2 = {'username':'zuohaojia', 'email':'hejie_cq@163.com'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'EmailNotActived')
        
        the_data_3 = {'username':'hejie', 'email':'hejie_cq@163.com'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'NotExisted')
        
        the_data_4 = {'username':'yanlimin', 'email':'hejie_cq@163.com'}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'Successful')
    
    def test_retrieveresponse(self):
        '''
        Test the retrieveresponse api in usersystem.
        '''
        the_url_1 = '/users/retrieve_password'
        the_url_2 = '/users/retrieve_response'
        UserInfo.objects.create(username = 'yanlimin', password = 'waitlove', phonenumber = '110', email = 'hejie_cq@163.com', is_active = True)
        
        the_data = {'username':'yanlimin', 'email':'hejie_cq@163.com'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url_1, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        
        the_data_1 = {'username':'hejie', 'code':the_text['code']}
        the_json_data_1 = json.dumps(the_data_1)
        the_res_1 = self.client.post(the_url_2, the_json_data_1, content_type = 'application/json')
        the_text_1 = json.loads(the_res_1.content.decode('utf-8'))
        self.assertEqual(the_text_1['status'], 'NotExisted')
        
        the_data_2 = {'username':'yanlimin', 'code':'12345678'}
        the_json_data_2 = json.dumps(the_data_2)
        the_res_2 = self.client.post(the_url_2, the_json_data_2, content_type = 'application/json')
        the_text_2 = json.loads(the_res_2.content.decode('utf-8'))
        self.assertEqual(the_text_2['status'], 'CodeError')
        
        the_data_3 = {'username':'yanlimin', 'code':the_text['code']}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url_2, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Successful')
        
    def test_sendmessage(self):
        '''
        Test the send message api in usersystem.
        '''
        url1 = '/users/send_message'
        UserInfo.objects.create(username = 'yanlimin', password = 'waitlove', phonenumber = '1305131230', email = 'hejie_cq@163.com', is_active = True)
        
        data1 = {'phonenumber':'1305131230'}
        jdata1 = json.dumps(data1)
        res1 = self.client.post(url1, jdata1, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        data = {'phonenumber':'110'}
        jdata = json.dumps(data)
        res = self.client.post(url1, jdata, content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'NotExisted')
        
    def test_mobilelogin(self):
        '''
        Test the login by phone number api in usersystem.
        '''
        url1 = '/users/send_message'
        url2 = '/users/mobile_login'
        UserInfo.objects.create(username = 'yanlimin', password = 'waitlove', phonenumber = '1305131230', email = 'hejie_cq@163.com', is_active = True)
        
        data1 = {'phonenumber':'1305131230'}
        jdata1 = json.dumps(data1)
        res1 = self.client.post(url1, jdata1, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        
        data2 = {'phonenumber':'1305131230', 'code':text1['code']}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(url2, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
        
        data3 = {'phonenumber':'130', 'code':text1['code']}
        jdata3 = json.dumps(data3)
        res3 = self.client.post(url2, jdata3, content_type = 'application/json')
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'NotExisted')
        
        data4 = {'phonenumber':'1305131230', 'code':'1111'}
        jdata4 = json.dumps(data4)
        res4 = self.client.post(url2, jdata4, content_type = 'application/json')
        text4 = json.loads(res4.content.decode('utf-8'))
        self.assertEqual(text4['status'], 'CodeError')
