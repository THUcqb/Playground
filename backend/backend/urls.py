from django.conf.urls import url, include
from django.contrib import admin
from api import usersystem, sources, usermaps

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^users/register$', usersystem.register),
    url(r'^users/login$', usersystem.login),
    url(r'^users/logout$', usersystem.logout),
    url(r'^users/getinfo$', usersystem.getuserinfo),
    url(r'^users/change_password$', usersystem.changepassword),
    url(r'^users/retrieve_password$', usersystem.retrievepassword),
    url(r'^users/retrieve_response$', usersystem.retrieveresponse),
    url(r'^users/email_auth$', usersystem.emailauth),
    url(r'^users/auth_response$', usersystem.authresponse),
    url(r'^sources/save_maps$', sources.savemaps),
    url(r'^sources/load_maps$', sources.loadmaps),
    url(r'^blockly/load_toolbox$', sources.load_toolbox),
    url(r'^sources/images$', sources.getimag),
    url(r'^maps/save_maps$', usermaps.savemapsinfo),
    url(r'^maps/get_maps$', usermaps.getmapsinfo),
]

