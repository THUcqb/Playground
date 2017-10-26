from django.conf.urls import url, include
from django.contrib import admin
from api import usersystem, sources

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^users/register$', usersystem.register),
    url(r'^users/login$', usersystem.login),
    url(r'^users/logout$', usersystem.logout),
    url(r'^users/getinfo$', usersystem.getuserinfo),
    url(r'^users/change_password$', usersystem.changepassword),
    url(r'^users/email_auth$', usersystem.emailauth),
    url(r'^users/auth_response$', usersystem.authresponse),
    url(r'^maps/save$', sources.savemaps),
    url(r'^maps/load$', sources.loadmaps),
    url(r'^sources/images$', sources.getimag),
]

