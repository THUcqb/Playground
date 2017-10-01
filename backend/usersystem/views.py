# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from usersystem.models import User
from django import forms

# Create your views here.
class UserForm(forms.Form):
	username = forms.CharField(max_length = 50)
	password = forms.CharField(max_length = 50)
	email = forms.EmailField()
	phonenumber = forms.CharField(max_length = 12)

@csrf_exempt
def user_reg(request):
	if request.method == 'POST':
		userinfo = UserForm(request.POST)
		if userinfo.is_valid():
			userid = User[-1]['userid'] + 1
			username = userinfo.cleaned_data['username']
			password = userinfo.cleaned_data['password']
			email = userinfo.cleaned_data['email']
			phonenumber = userinfo.cleaned_data['phonenumber']

			User.objects.create(userid = userid, username = username, password = password, email = email, phonenumber = phonenumber)
			User.save()
			return HttpResponse('regist success!')

@csrf_exempt
def user_login(request):
	if request.method == 'POST':	
		try:
			user = User.objects.get(username = requesr.POST['username'])
			if user.password == request.POST['password']:
				request.session['userid'] = user.userid
				return HttpResponseRedirect('/you-are-logged-in/')
		except User.DoesNotExist:
			return HttpResponse("Your username and password didn't match!")
			
@csrf_exempt
def user_logout(request):
	try:
		del request.session['userid']
	except KeyError:
		pass
	return HttpResponse('You are logout')