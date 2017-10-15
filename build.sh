cd backend
coverage run --source . manage.py test
coverage html -d ../Coverage_Python
