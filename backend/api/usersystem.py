# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import UserInfo, AMap
import json
import base64
import time
import urllib
import http.client
from random import Random
from django.core.mail import send_mail
from backend.settings import EMAIL_FROM

host = "106.ihuyi.com"
sms_send_uri = "/webservice/sms.php?method=Submit"
account = "C11382941"
password = "d6ae09db9b0b48cd7cf9ff1ba862855d"

def create_token(username):
    '''
    Create a token encode with base64.
    '''
    issuetime = time.time()
    expiretime = issuetime + 604800
    payload_dict = {
        'iat':issuetime,
        'exp':expiretime,
        'iss':'admin',
        'username':username
    }
    payload_str = json.dumps(payload_dict)
    payload = base64.b64encode(payload_str.encode(encoding = "utf-8"))
    
    return payload.decode()

def analyze_token(token_byte):
    '''
    Analyze the token received.
    
    :param param1: token_byte
    :returns: user_info
    '''
    token_str = token_byte.encode(encoding = "utf-8")
    token_info = base64.b64decode(token_str)
    token = token_info.decode('utf-8','ignore')
    user_info = json.loads(token)
    
    return user_info

@csrf_exempt
def register(request):
    '''
    Handle request of users' registration.
    
    :method: post
    :param param1: username
    :param param2: password
    :param param3: phonenumber
    :param param4: email
    :returns: if succeed, return {"status":"Successful"}
              else if the user has registered, return {"status":"Existed"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        username = d['username']
        password = d['password']
        phonenumber = d['phonenumber']
        email = d['email']
        try:
            userinfo = UserInfo.objects.get(username = username)
            response_data["status"] = "Existed"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            userinfo = UserInfo.objects.create(username = username, password = password, phonenumber = phonenumber, email = email)
            AMap.objects.create(username = username, level = str(1), unlock = True)
            for i in range(1, 10):
                AMap.objects.create(level = str(i + 1), username = username)
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def login(request):
    '''
    Handle request of users' login.
    
    :method: post
    :param param1: username
    :param param2: password
    :returns: if succeed, return {"status":"Successful","token":the_token}
              else if the password is wrong, return {"status":"PasswordError"}
              else if the user hasn't registered, return {"status":"NotExisted"}
    '''
    res = {}
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        try:
            userinfo = UserInfo.objects.get(username = d['username'])
        except UserInfo.DoesNotExist:
            try:
                userinfo = UserInfo.objects.get(email = d['username'])
            except UserInfo.DoesNotExist:
                try:
                    userinfo = UserInfo.objects.get(phonenumber = d['username'])
                except UserInfo.DoesNotExist:
                    response_data["status"] = "NotExisted"
                    return HttpResponse(json.dumps(response_data),content_type="application/json")
        if userinfo.password == d['password']:
            token = create_token(userinfo.username)
            response_data["token"] = token
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        else:
            response_data["status"] = "PasswordError"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def logout(request):
    '''
    Handle request of users' logout.
    
    :method: post
    :returns: {"status":"Successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        response_data["status"] = "Successful"
        return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def get_userinfo(request):
    '''
    Handle request of getting a user's information after login.
    
    :method: post
    :param param1: token
    :returns: if succeed, return {"username":username, "phonenumber": phonenumber, "email":email, "status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        now = time.time()
        user_info = analyze_token(token_byte)
        username = user_info['username']
        response_data = {}
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            response_data["username"] = userinfo.username
            response_data["phonenumber"] = userinfo.phonenumber
            response_data["email"] = userinfo.email
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        
@csrf_exempt
def change_password(request):
    '''
    Handle the request of changing the password.
    
    :method: post
    :param param1: token
    :param param2: old_password
    :param param3: new_password
    :returns: if succeed, return {"status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else if the old password is wrong, return {"status":"OldPasswordError"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        username = user_info['username']
        old_password = d['old_password']
        new_password = d['new_password']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            if userinfo.password == old_password:
                userinfo.password = new_password
                userinfo.save()
                response_data["status"] = "Successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            else:
                response_data["status"] = "OldPasswordError"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
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

def emailsend(userinfo):
    '''
    Send a Email.
    '''
    code = create_code()
    userinfo.auth_code = code
    userinfo.save()
    email = userinfo.email
    email_title = 'Code'
    email_body = 'Your code is: ' + code
    send_mail(email_title, email_body, EMAIL_FROM, [email])
    
    return code

@csrf_exempt
def email_auth(request):
    '''
    Handle the request of verification by Email.
    
    :method: post
    :param param1: token
    :returns: if succeed, return {"status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
              else if the Email is already actived, return {"status":"Actived"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        token_byte = d['token']
        now = time.time()
        user_info = analyze_token(token_byte)
        expire = user_info['exp']
        username = user_info['username']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            if userinfo.is_active == True:
                response_data["status"] = "Actived"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            code = emailsend(userinfo)
            response_data["status"] = "Successful"
            response_data["code"] = code
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def auth_response(request):
    '''
    Handle the request of verification by Email.
    
    :method: post
    :param param1: token
    :param param2: code
    :returns: if succeed, return {"status":"Successful"}
              else if the token is out of date, return {"status":"Expiration"}
              else if the code is wrong, return {"status":"CodeError"}
              else if the user doesn't exist, return {"status":"NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        token_byte = d['token']
        user_info = analyze_token(token_byte)
        username = user_info['username']
        now = time.time()
        expire = user_info['exp']
        if expire < now:
            response_data["status"] = "Expiration"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        try:
            userinfo = UserInfo.objects.get(username = username)
            if d['code'] == userinfo.auth_code:
                userinfo.is_active = True
                userinfo.save()
                response_data["status"] = "Successful"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            else:
                response_data["status"] = "CodeError"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def retrieve_password(request):
    '''
    Handle the request of getting back the user's password by Email.
    
    :method: post
    :param param1: username
    :param param2: email
    :returns: if the email is wrong , return {"status" : "EmailError"}
              else if the user doesn't exist, return {"status":"NotExisted"}
              else if the email hasn't actived, return {"status":"EmailNotActived"}
              else if succeed, return {"status":"Successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        try:
            userinfo = UserInfo.objects.get(username = d['username'])
            if userinfo.email != d['email']:
                response_data["status"] = "EmailError"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            if userinfo.is_active == False:
                response_data["status"] = "EmailNotActived"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            code = emailsend(userinfo)
            response_data["status"] = "Successful"
            response_data["code"] = code
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")

@csrf_exempt
def retrieve_response(request):
    '''
    Handle the request of getting back the user's password after emailed.
    
    :method: post
    :param param1: username
    :param param2: code
    :returns: if the code is wrong , return {"status" : "CodeError"}
              else if the username is wrong, return {"status" : "NotExisted"}
              else if succeed, return {"status" : "Successful"}
    '''
    if request.method == 'POST':
        response_data = {}
        d = json.loads(request.body.decode('utf-8'))
        try:
            userinfo = UserInfo.objects.get(username = d['username'])
            if userinfo.auth_code != d['code']:
                response_data["status"] = "CodeError"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            email = userinfo.email
            email_title = 'Password'
            email_body = 'Your password is: ' + userinfo.password
            send_mail(email_title, email_body, EMAIL_FROM, [email])
            response_data["status"] = "Successful"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")
            
@csrf_exempt
def send_message(request):
    '''
    Handle the request of getting code when login by mobile phone.
    
    :method: post
    :param param1: phonenumber
    :returns: if succeed, return {"status" : "Successful", 'code':code}
              else if the user hasn't registered, return {"status" : "NotExisted"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        try:
            userinfo = UserInfo.objects.get(phonenumber = d['phonenumber'])
            code = create_code(4)
            userinfo.auth_code = code
            userinfo.save()
            text = "您的验证码是：" + code + "。请不要把验证码泄露给其他人。"
            params = urllib.parse.urlencode({'account': account, 'password' : password, 'content': text, 'mobile':userinfo.phonenumber,'format':'json' })
            headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
            conn = http.client.HTTPConnection(host, port=80, timeout=30)
            conn.request("POST", sms_send_uri, params, headers)
            response = conn.getresponse()
            res = response.read()
            conn.close()
            response_data["status"] = "Successful"
            response_data["code"] = code
            return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")    

@csrf_exempt
def mobile_login(request):
    '''
    Handle the request of login by phone number and code.
    
    :method: post
    :param param1: phonenumber
    :param param2: code
    :returns: if succeed, return {"status" : "Successful", "token" : token}
              else if the user hasn't registered, return {"status" : "NotExisted"}
              else if the code is wrong, return {"status" : "CodeError"}
    '''
    if request.method == 'POST':
        d = json.loads(request.body.decode('utf-8'))
        response_data = {}
        code = d['code']
        try:
            userinfo = UserInfo.objects.get(phonenumber = d['phonenumber'])
            if code == userinfo.auth_code:
                token = create_token(userinfo.username)
                response_data["status"] = "Successful"
                response_data["token"] = token
                return HttpResponse(json.dumps(response_data),content_type="application/json")
            else:
                response_data["status"] = "CodeError"
                return HttpResponse(json.dumps(response_data),content_type="application/json")
        except UserInfo.DoesNotExist:
            response_data["status"] = "NotExisted"
            return HttpResponse(json.dumps(response_data),content_type="application/json")     
    
