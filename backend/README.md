# 用户登录

### POST
`^login/$`

需要参数：
username
password

### Response
HttpResponse('login in')

# 用户登出

### POST
`^logout/$`

### Response

HttpResponse('logout out')

# 用户注册

### POST
`^register/$`

需要参数：
username
password
email
phonenumber

### Response

HttpResponse('register success')
