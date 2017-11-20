cd backend
coverage run --source . manage.py test
coverage html --omit=manage.py,api/apps.py,api/migrations/*,api/__init__.py,api/admin.py,api/urls.py,backend/*,savedata.py -d ../Coverage_Python
