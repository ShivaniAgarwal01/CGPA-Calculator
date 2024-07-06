from django import forms
from django.forms import modelformset_factory
from .models import Subjects

class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subjects
        fields = ['grade' , 'credit']

SubjectFormSet = modelformset_factory(Subjects, form=SubjectForm , extra=5)
        # widget ={
        #     'grade' : forms.TextInput(attrs={ 'class' : 'form-control' , 'placeholder' : 'Grade'}),
        #     'credit' : forms.NumberInput(attrs={ 'class' : 'form-control' , 'placeholder': 'credit'})
        # }
        
#         SubjectFormSet = forms.modelformset_factory(
#     Subjects, form=SubjectForm, extra=1, can_delete=False
# )


# class SubjectCountForm(forms.Form):
#     number_of_subjects = forms.IntegerField(
#         min_value=1 ,
#         max_value=10,
#         initial=5,
#         widget = forms.NumberInput(attrs={
#         'class':'form-control',
#         'style':'width : 80% ; border-radius:3px; height:31px; font-size:18px ;'
#     })
# )

# class SubjectDetailsForm(forms.Form):
#     GRADE_CHOICE=[
#     ('A' , 'A'),
#     ('AB' ,'AB'),   
#     ('B' , 'B'),
#      ('BC' ,'BC'),
#     ('C' , 'C'),
#     ('CD', 'CD'),
#     ('D' ,'D'),
#     ('F' ,'F'),
#     ]
#     grade = forms.ChoiceField(
#         choices=GRADE_CHOICE,
#         widget=forms.Select(attrs={
#             'class' : 'form-control',
#             'style':'width : 50%;'
#         })
#     )
#     credit = forms.FloatField(
#         min_value=1,
#         max_value=10,
#         widget=forms.NumberInput(attrs={
#             'placeholder':'Enter credit',
#         }
                                
#         )
#     )

# SubjectDetailFormSet = formset_factory(SubjectDetailsForm, extra=0)