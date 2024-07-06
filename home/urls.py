from django.contrib import admin
from django.urls import path ,include
from home import views

urlpatterns = [
    path('', views.cgpa_calculator, name='home'),
    # path('login', views.login, name='login'),
    
]
