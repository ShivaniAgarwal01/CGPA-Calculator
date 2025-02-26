from django import forms
from django.forms import modelformset_factory
from .models import Subjects

class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subjects
        fields = ['grade' , 'credit']

SubjectFormSet = modelformset_factory(Subjects, form=SubjectForm , extra=5)

