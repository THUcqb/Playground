import requests
p = {"username" : "fuck", "password" : "fuck", "phonenumber" : "12345", "email" : "fuck@shit.com"}
res = requests.post("http://127.0.0.1:8000/users/register", p)
print (res.text)

