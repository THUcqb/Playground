import requests
import json

saveurl = "http://127.0.0.1:8000/blockly/save_toolbox"

for i in range(4):
    param = {"level":i}
    params = json.dumps(param)
    res = requests.post(saveurl, params)
    print(res.text)
