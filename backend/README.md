#用户注册

##URL
users/register

##Method
POST

##parameter
username
password
phonenumber
email

##Response
注册成功，返回json格式{'status' : 'successful'}
注册失败，返回json格式{'status' : 'failed'}

#用户登录

##URL
users/login

##Method
POST

##parameter
username
password

##Response
登录成功，返回json格式{'toeken' : token}
登录失败，返回json格式{'status' : 'failed'}

#请求用户信息

##URL
users/getinfo

##Method
POST

##parameter
token

##Response
用户信息：username phonenumber email

格式：json

#后台管理

#URL
/admin

#superuser

username:admin

password:waitlove

email:admin@admin.com

