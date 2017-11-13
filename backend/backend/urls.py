from django.conf.urls import url, include
from django.contrib import admin
from api import usersystem, sources, usermaps

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^users/register$', usersystem.register),
    url(r'^users/login$', usersystem.login),
    url(r'^users/logout$', usersystem.logout),
    url(r'^users/getinfo$', usersystem.get_userinfo),
    url(r'^users/change_password$', usersystem.change_password),
    url(r'^users/retrieve_password$', usersystem.retrieve_password),
    url(r'^users/retrieve_response$', usersystem.retrieve_response),
    url(r'^users/email_auth$', usersystem.email_auth),
    url(r'^users/auth_response$', usersystem.auth_response),
    url(r'^sources/save_maps$', sources.save_maps),
    url(r'^sources/load_maps$', sources.load_maps),
    url(r'^blockly/save_toolbox$', sources.save_toolbox),
    url(r'^blockly/load_toolbox$', sources.load_toolbox),
    url(r'^maps/save_maps$', usermaps.save_mapsinfo),
    url(r'^maps/get_maps$', usermaps.get_mapsinfo),
    url(r'^maps/get_solution$', usermaps.get_solution),
    url(r'^diymaps/save_diymap$', usermaps.save_diymap),
    url(r'^diymaps/get_solution$', usermaps.get_diysolution),
    url(r'^diymaps/get_diymaps$', usermaps.get_diymaps),
]

