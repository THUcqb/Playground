# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import Template, Context
from django.views.decorators.csrf import csrf_exempt
from .models import UserInfo

@csrf_exempt
def register(request):
	res = {}
	if request.method == 'GET':
		return render_to_response('register.html')
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		phonenumber = request.POST['phonenumber']
		email = request.POST['email']
		
		try:
			exist_user = UserInfo.objects.get(username = username)
		except UserInfo.DoesNotExist:
			userinfo = UserInfo.objects.create(username = username, password = password, phonenumber = phonenumber, email = email)
			return render_to_response('login.html')
		#注意此用户已存在应返回注册界面，注册成功应返回登录界面
		res['result'] = '此用户已存在'
		return render(request, 'register.html', res)

@csrf_exempt
def login(request):
	res = {}
	if request.method == 'GET':
		return render_to_response('login.html')
	if request.method == 'POST':
		try:
			userinfo = UserInfo.objects.get(username = request.POST['username'])
			if userinfo.password == request.POST['password']:
				request.session['userid'] = userinfo.id
				return HttpResponse('登录成功')
		except UserInfo.DoesNotExist:
			res['result'] = '账号或密码错误'
		
		res['result'] = '账号或密码错误'
		return render(request, 'login.html', res)

@csrf_exempt
def logout(request):
	if request.method == 'POST':
		try:
			del request.session['userid']
		except KeyError:
			pass
		return HttpResponse('已登出')