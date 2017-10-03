#用户登录

^login/$  

[POST]:
username
password

Response:
HttpResponse('login in')

#用户登出
^logout/$

[POST]:

Response:
Httpresponse('logout out')

#用户注册
^regist/$

[POST]:
username
password
email
phonenumber

Response:
HttpResponse('regist success')
