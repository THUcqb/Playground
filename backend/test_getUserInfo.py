import requests
p = {"token" : "eyJpYXQiOiAxNTA3NzMwNzI1LjEyODg5MzEsICJleHAiOiAxNTA4MzM1NTI1LjEyODg5MzEsICJpc3MiOiAiYWRtaW4iLCAidXNlcm5hbWUiOiAiZnVjayJ9"}
res = requests.get("http://127.0.0.1:8000/users/getinfo", p)
print (res.text)

