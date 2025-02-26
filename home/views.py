# views.py
from django.shortcuts import render, redirect
from .forms import SubjectFormSet
from .models import Subjects
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.decorators import login_required

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Redirect to CGPA calculator after login
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')  # Redirect after login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login') 


@login_required
def cgpa_calculator(request):
    if request.method == 'POST':
        formset = SubjectFormSet(request.POST)
        if formset.is_valid():
                formset.save()  # Save formset data
            # Optionally, calculate CGPA or perform other operations here
                return redirect('success_url')  # Redirect to success page after processing
    else:
        # num_subjects = 5  # Default number of subjects
        formset = SubjectFormSet(queryset= Subjects.objects.none())

    return render(request, 'index.html', {'formset': formset})
