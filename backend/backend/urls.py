from django.conf.urls import url, include
from django.contrib import admin
from api import usersystem, immanentmaps

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^users/register$', usersystem.register),
    url(r'^users/login$', usersystem.login),
    url(r'^users/logout$', usersystem.logout),
    url(r'^users/getinfo$', usersystem.getuserinfo),
    url(r'^maps/save$', immanentmaps.savemaps),
    url(r'^maps/load$', immanentmaps.loadmaps),
]

