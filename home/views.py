# views.py
from django.shortcuts import render, redirect
from .forms import SubjectFormSet
from .models import Subjects

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
