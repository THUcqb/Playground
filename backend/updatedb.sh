rm db.sqlite3
cd api/migrations/
rm 0001_initial.py
cd ../../
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000

