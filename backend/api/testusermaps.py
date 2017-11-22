# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
import unittest
from api.models import AMap, UserInfo, DIYMaps, ImmanentMaps
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
        
        data0 = {'token':'hahaha', 'level':'1', 'stars':'3', 'solution':'while'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        the_data = {'token':log_text['token'], 'level':'1', 'stars':'3', 'solution':'while'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'Successful')
        
        the_data = {'token':log_text['token'], 'level':'12', 'stars':'3', 'solution':'while'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'NotExisted')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'level':1, 'stars':3, 'solution':'while'}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=', 'level':1, 'stars':3, 'solution':'while'}
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
        
        data0 = {'token':'hahaha'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')
        
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
    
    def test_getsolution(self):
        '''
        Test the get_solution API in usersystem.
        '''
        login_url = '/users/login'
        the_url = '/maps/get_solution'
        UserInfo.objects.create(username = 'zuohaojia', password = 'waitlove', phonenumber = '110', email = 'zuohaojia@example.com')
        AMap.objects.create(username = 'zuohaojia', level = '1', unlock = True, solution = 'while')
        ImmanentMaps.objects.create(level = '1', standard = 'for', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        
        for i in range(1, 10):
            AMap.objects.create(level = str(i + 1), username = 'zuohaojia')
        
        login_data = {'username':'zuohaojia', 'password':'waitlove'}
        log_json_data = json.dumps(login_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data0 = {'token':'hahaha', 'level':'1'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        the_data = {'token':log_text['token'], 'level':'1'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'Successful')
        
        the_data = {'token':log_text['token'], 'level':'12'}
        the_json_data = json.dumps(the_data)
        the_res = self.client.post(the_url, the_json_data, content_type = 'application/json')
        the_text = json.loads(the_res.content.decode('utf-8'))
        self.assertEqual(the_text['status'], 'NotExisted')
        
        the_data_3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'level':1}
        the_json_data_3 = json.dumps(the_data_3)
        the_res_3 = self.client.post(the_url, the_json_data_3, content_type = 'application/json')
        the_text_3 = json.loads(the_res_3.content.decode('utf-8'))
        self.assertEqual(the_text_3['status'], 'Expiration')
        
        the_data_4 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0=', 'level':1}
        the_json_data_4 = json.dumps(the_data_4)
        the_res_4 = self.client.post(the_url, the_json_data_4, content_type = 'application/json')
        the_text_4 = json.loads(the_res_4.content.decode('utf-8'))
        self.assertEqual(the_text_4['status'], 'NotExisted')
        
    def test_savediymap(self):
        '''
        Test the save_diymap API in usersystem.
        '''
        login_url = '/users/login'
        the_url = '/diymaps/save_diymap'
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        log_data = {'username':'master', 'password':'wait5683'}
        log_json_data = json.dumps(log_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data0 = {'token':'hahaha', 'mapinfo':'1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021', 'mapname':'mymap', 'solution':'while', 'mapid':'null'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        data1 = {'token':log_text['token'], 'mapinfo':'1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021', 'mapname':'mymap', 'solution':'while', 'mapid':'null'}
        jdata1 = json.dumps(data1)
        res1 = self.client.post(the_url, jdata1, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        data2 = {'token':log_text['token'], 'mapinfo':'1111000000100002000010010000211000020001010000000110200000000000000200020010000000002001010000000021', 'mapname':'yourmap', 'solution':'case', 'mapid':'1'}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(the_url, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
        
        data2 = {'token':log_text['token'], 'mapinfo':'1111000000100002000010010000211000020001010000000110200000000000000200020010000000002001010000000021', 'mapname':'yourmap', 'solution':'case', 'mapid':'12'}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(the_url, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'NotExisted')
        
        data3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'mapinfo':'1111000000100002000010010000211000020001010000000110200000000000000200020010000000002001010000000021', 'mapname':'yourmap', 'solution':'case', 'mapid':'1'}
        jdata3 = json.dumps(data3)
        res3 = self.client.post(the_url, jdata3, content_type = 'application/json')
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'Expiration')
    
    def test_deletediymap(self):
        '''
        Test the delete_diymap API in usersystem.
        '''
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100002000010010000211000020121010000000110200000000000000200020010000000002001010000000021', mapname = 'amap', solution = 'hello')
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100002000010010000211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'hello')
        loginurl = '/users/login'
        theurl = '/diymaps/delete_diymap'
        
        logdata = {'username':'master', 'password':'wait5683'}
        logjson_data = json.dumps(logdata)
        logres = self.client.post(loginurl, logjson_data, content_type = 'application/json')
        logtext = json.loads(logres.content.decode('utf-8'))
        
        data = {'token':logtext['token'], 'mapid':'1'}
        res = self.client.post(theurl, json.dumps(data), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Successful')
        
        data = {'token':logtext['token'], 'mapid':'1'}
        res = self.client.post(theurl, json.dumps(data), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'NotExisted')
        
        data = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'mapid':'1'}
        res = self.client.post(theurl, json.dumps(data), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'Expiration')
        
        data = {'token':'haha', 'mapid':'1'}
        res = self.client.post(theurl, json.dumps(data), content_type = 'application/json')
        text = json.loads(res.content.decode('utf-8'))
        self.assertEqual(text['status'], 'TokenError')
        
    def test_getdiysolution(self):
        '''
        Test the get_diysolution API in usermaps.
        '''
        login_url = '/users/login'
        the_url = '/diymaps/get_solution'
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100002000010010000211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'hello')
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100002000010010000211000020121010000000110200000000000000200020010000000002001010000000021', mapname = 'amap', solution = 'hello')
        log_data = {'username':'master', 'password':'wait5683'}
        log_json_data = json.dumps(log_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data0 = {'token':'hahaha', 'mapid':'1'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        data1 = {'token':log_text['token'], 'mapid':'1'}
        jdata1 = json.dumps(data1)
        res1 = self.client.post(the_url, jdata1, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['solution'], 'hello')
        
        data2 = {'token':log_text['token'], 'mapid':'12'}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(the_url, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'NotExisted')
        
        data2 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'mapid':'1'}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(the_url, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Expiration')
        
    def test_getdiymaps(self):
        '''
        Test the get_diymaps API in usermaps.
        '''
        login_url = '/users/login'
        the_url = '/diymaps/get_diymaps'
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100102000010010010211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'hello')
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100202000010010020211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'world')
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100002000010010000211000020001010002000110200000000000000200020000000000002001010000000021', mapname = 'mastermap', solution = 'if-else')
        
        log_data = {'username':'master', 'password':'wait5683'}
        log_json_data = json.dumps(log_data)
        log_res = self.client.post(login_url, log_json_data, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data0 = {'token':'hahaha'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        data1 = {'token':log_text['token']}
        jdata1 = json.dumps(data1)
        res1 = self.client.post(the_url, jdata1, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        data2 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwODkxMjc5Mi4yMTEsICJ1c2VybmFtZSI6ICJoZWxsbyIsICJleHAiOiAxNTQwNDQ4NzkyLjIxMX0='}
        jdata2 = json.dumps(data2)
        res2 = self.client.post(the_url, jdata2, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Successful')
        
        data3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0='}
        jdata3 = json.dumps(data3)
        res3 = self.client.post(the_url, jdata3, content_type = 'application/json')
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'Expiration')
        
    def test_mapshare(self):
        '''
        Test the create share link API in usermaps.
        '''
        login_url = '/users/login'
        the_url = '/maps/share'
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        
        log = {'username':'master', 'password':'wait5683'}
        log_json = json.dumps(log)
        log_res = self.client.post(login_url, log_json, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data0 = {'token':'hahaha', 'type':'diy', 'mapid':'1'}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(the_url, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
        data1 = {'token':log_text['token'], 'type':'diy', 'mapid':'1'}
        data1j = json.dumps(data1)
        res1 = self.client.post(the_url, data1j, content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        self.assertEqual(text1['status'], 'Successful')
        
        data2 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'type':'diy', 'mapid':'1'}
        data2j = json.dumps(data2)
        res2 = self.client.post(the_url, data2j, content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        self.assertEqual(text2['status'], 'Expiration')
        
        data3 = {'token':log_text['token'], 'type':'common', 'level':'1'}
        data3j = json.dumps(data3)
        res3 = self.client.post(the_url, data3j, content_type = 'application/json')
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'Successful')
        
    def test_shareresponse(self):
        '''
        Test map share response in usermaps.
        '''
        login_url = '/users/login'
        url1 = '/maps/share'
        url2 = '/maps/share_response'
        UserInfo.objects.create(username = 'master', password = 'wait5683', phonenumber = '119', email = 'master@example.com', is_active = True)
        AMap.objects.create(username = 'master', level = '1', stars = '3', unlock = True, solution = 'while')
        AMap.objects.create(username = 'master', level = '2', stars = '3', unlock = True, solution = 'case')
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100102000010010010211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'hello')
        DIYMaps.objects.create(username = 'master', mapinfo = '1111000000100202000010010020211000020001010000000110200000000000000200020010000000002001010000000021', mapname = 'mastermap', solution = 'world')
        ImmanentMaps.objects.create(level = '1', immanentmap = '1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021')
        
        tlog = {'username':'master', 'password':'wait5683'}
        tlog_json = json.dumps(tlog)
        log_res = self.client.post(login_url, tlog_json, content_type = 'application/json')
        log_text = json.loads(log_res.content.decode('utf-8'))
        
        data1 = {'token':log_text['token'], 'type':'common', 'level':'1'}
        res1 = self.client.post(url1, json.dumps(data1), content_type = 'application/json')
        text1 = json.loads(res1.content.decode('utf-8'))
        
        dataf = {'token':log_text['token'], 'link':text1['link']}
        resf = self.client.post(url2, json.dumps(dataf), content_type = 'application/json')
        textf = json.loads(resf.content.decode('utf-8'))
        self.assertEqual(textf['status'], 'Successful')
        
        dataf = {'token':log_text['token'], 'link':'eyJ1c2VybmFtZSI6ICJ5YW5saW1pbiIsICJ0eXBlIjogImRpeSIsICJtYXBpZCI6IDExMH0='}
        resf = self.client.post(url2, json.dumps(dataf), content_type = 'application/json')
        textf = json.loads(resf.content.decode('utf-8'))
        self.assertEqual(textf['status'], 'NotExisted')
        
        data2 = {'token':log_text['token'], 'type':'diy', 'mapid':'1'}
        res2 = self.client.post(url1, json.dumps(data2), content_type = 'application/json')
        text2 = json.loads(res2.content.decode('utf-8'))
        
        datas = {'token':log_text['token'], 'link':text2['link']}
        ress = self.client.post(url2, json.dumps(datas), content_type = 'application/json')
        texts = json.loads(ress.content.decode('utf-8'))
        self.assertEqual(texts['status'], 'Successful')
        
        datas = {'token':log_text['token'], 'link':'eyJ1c2VybmFtZSI6ICJ5YW5saW1pbiIsICJ0eXBlIjogImNvbW1vbiIsICJsZXZlbCI6ICIxMTAifQ=='}
        ress = self.client.post(url2, json.dumps(datas), content_type = 'application/json')
        texts = json.loads(ress.content.decode('utf-8'))
        self.assertEqual(texts['status'], 'NotExisted')
        
        data5 = {'token':log_text['token'], 'link':'lalala'}
        res5 = self.client.post(url2, json.dumps(data5), content_type = 'application/json')
        text5 = json.loads(res5.content.decode('utf-8'))
        self.assertEqual(text5['status'], 'LinkError')
        
        data3 = {'token':'eyJpc3MiOiAiYWRtaW4iLCAiaWF0IjogMTUwNzk5MzUyMC42OTIsICJ1c2VybmFtZSI6ICJoZWppZSIsICJleHAiOiAxNTA4NTk4MzIwLjY5Mn0=', 'link':text2['link']}
        res3 = self.client.post(url2, json.dumps(data3), content_type = 'application/json')
        text3 = json.loads(res3.content.decode('utf-8'))
        self.assertEqual(text3['status'], 'Expiration')
        
        data0 = {'token':'hahaha', 'link':text2['link']}
        json_data0 = json.dumps(data0)
        res0 = self.client.post(url2, json_data0, content_type = 'application/json')
        text0 = json.loads(res0.content.decode('utf-8'))
        self.assertEqual(text0['status'], 'TokenError')
        
