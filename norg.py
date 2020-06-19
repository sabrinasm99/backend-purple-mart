import json

with open('parameter.json') as json_file:
    data = json.load(json_file)
    print(data)