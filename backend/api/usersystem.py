# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import UserInfo
import json
import base64
import time
from random import Random
from django.core.mail import send_mail
from backend.settings import EMAIL_FROM

@csrf_exempt
def register(request):
    '''
    Handle request of users' registration.
    
    :method: post
    :param param1: username
    :param param2: password
    :param param3: phonenumber
    :param param4: email
    :returns: if succeed, return {"status":"successful"}
              else, return {"status":"failed"} 
    '''
    res = {}
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        username = d['username']
        password = d['password']
        phonenumber = d['phonenumber']
        email = d['email']

        try:
            exist_user = UserInfo.objects.get(username = username)
        except UserInfo.DoesNotExist:
            userinfo = UserInfo.objects.create(username = username, password = password, phonenumber = phonenumber, email = email)
            response_data["status"] = "successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def login(request):
    '''
    Handle request of users' login.
    
    :method: post
    :param param1: username
    :param param2: password
    :returns: if succeed, return {"status":"successful","token":the_token}
              else, return {"status":"failed"}
    '''
    res = {}
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        try:
            userinfo = UserInfo.objects.get(username = d['username'])
            if userinfo.password == d['password']:
                issuetime = time.time()
                expiretime = issuetime + 604800
                payload_dict = {
                    'iat':issuetime,
                    'exp':expiretime,
                    'iss':'admin',
                    'username':userinfo.username
                }
                payload_str = json.dumps(payload_dict)
                payload = base64.b64encode(payload_str.encode(encoding = "utf-8"))
                response_data["token"] = payload.decode()
                response_data["status"] = "successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            pass
        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def logout(request):
    '''
    Handle request of users' logout.
    
    :method: post
    :returns: {"status":"successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        response_data["status"] = "successful"
        return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def getuserinfo(request):
    '''
    Handle request of getting a user's information after login.
    
    :method: post
    :param param1: token
    :returns: if succeed, return {"username":username, "phonenumber": phonenumber, "email":email, "status":"successful"}
              else if the token is out of date, return {"status":"expiration"}
              else, return {"status":"failed"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        response_data = {}
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            response_data["username"] = userinfo.username
            response_data["phonenumber"] = userinfo.phonenumber
            response_data["email"] = userinfo.email
            response_data["status"] = "successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            pass

        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
        
@csrf_exempt
def changepassword(request):
    '''
    Handle the request of changing the password.
    
    :method: post
    :param param1: token
    :param param2: old_password
    :param param3: new_password
    :returns: if succeed, return {"status":"successful"}
              else if the token is out of date, return {"status":"expiration"}
              else, return {"status":"failed"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        old_password = d['old_password']
        new_password = d['new_password']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            if userinfo.password == old_password:
                userinfo.password = new_password
                userinfo.save()
                response_data["status"] = "successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            pass
        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json") 

def create_code(randomlength = 8):
    '''
    Create a random code.
    
    :param param1: randomlength
    :returns: A random code whose length is equal to randomlength.
    '''
    res = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        res += chars[random.randint(0, length)]
    return res

@csrf_exempt
def emailauth(request):
    '''
    Handle the request of verification by Email.
    
    :method: post
    :param param1: token
    :returns: if succeed, return {"status":"successful","code":code}
              else if the token is out of date, return {"status":"expiration"}
              else, return {"status":"failed"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            code = create_code()
            userinfo.auth_code = code
            userinfo.save()
            email = userinfo.email
            email_title = 'Code'
            email_body = 'Your code is: ' + code
            send_mail(email_title, email_body, EMAIL_FROM, [email])
            response_data["status"] = "successful"
            response_data["code"] = code
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            pass
        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def authresponse(request):
    '''
    Handle the request of verification by Email.
    
    :method: post
    :param param1: token
    :param param2: code
    :returns: if succeed, return {"status":"successful"}
              else if the token is out of date, return {"status":"expiration"}
              else, return {"status":"failed"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        token_str = token_byte.encode(encoding = "utf-8")
        token_info = base64.b64decode(token_str)
        token = token_info.decode('utf-8','ignore')
        user_info = json.loads(token)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            if d['code'] == userinfo.auth_code:
                userinfo.is_active = True
                userinfo.save()
                response_data["status"] = "successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            pass
        response_data["status"] = "failed"
        return HttpResponse(json.dumps(response_data),content_type="application/json")
