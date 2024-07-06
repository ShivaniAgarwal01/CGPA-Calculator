document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cgpaForm');
    const semCountInput = document.getElementById('semCnt');
    const subjectDetailsInput = document.getElementById('subjectDetailsInput');
    const gradePoints = {
        'A': 10,
        'AB': 9,
        'B': 8,
        'BC': 7,
        'C': 6,
        'CD': 5,
        'D': 4,
        'F': 0,
    };

    let semCount = 0; // Initialize semCount

    semCountInput.addEventListener('input', function () {
        semCount = parseInt(semCountInput.value);
        subjectDetailsInput.innerHTML = '';

        for (let j = 1; j <= semCount; j++) {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester';
            semesterDiv.innerHTML = `<h3>Semester ${j}</h3>`;

            const numSubjectsInput = document.createElement('input');
            numSubjectsInput.type = 'number';
            numSubjectsInput.min = '1';
            numSubjectsInput.placeholder = `Number of Subjects in Semester ${j}`;
            numSubjectsInput.className = 'form-control';
            numSubjectsInput.id = `numSubjects${j}`;
            semesterDiv.appendChild(numSubjectsInput);

            const subjectContainer = document.createElement('div');
            subjectContainer.id = `subjectContainer${j}`;
            semesterDiv.appendChild(subjectContainer);

            numSubjectsInput.addEventListener('input', function () {
                const numSubjects = parseInt(numSubjectsInput.value);
                subjectContainer.innerHTML = '';

                for (let i = 1; i <= numSubjects; i++) {
                    const subjectRow = document.createElement('div');
                    subjectRow.className = 'row mb-3';

                    const gradeCol = document.createElement('div');
                    gradeCol.className = 'col';

                    const gradeLabel = document.createElement('label');
                    gradeLabel.textContent = `Grade for Subject ${i}`;
                    gradeLabel.className = 'form-label';
                    gradeCol.appendChild(gradeLabel);

                    const gradeSelect = document.createElement('select');
                    gradeSelect.className = 'form-control';
                    gradeSelect.name = `grade_${j}_${i}`;

                    Object.keys(gradePoints).forEach(grade => {
                        const option = document.createElement('option');
                        option.value = grade;
                        option.textContent = grade;
                        gradeSelect.appendChild(option);
                    });

                    gradeCol.appendChild(gradeSelect);

                    const creditCol = document.createElement('div');
                    creditCol.className = 'col';

                    const creditLabel = document.createElement('label');
                    creditLabel.textContent = `Credit for Subject ${i}`;
                    creditLabel.className = 'form-label';
                    creditCol.appendChild(creditLabel);

                    const creditSelect = document.createElement('select');
                    creditSelect.className = 'form-control';
                    creditSelect.name = `credit_${j}_${i}`;

                    for (let k = 1; k <= 10; k++) {
                        const option = document.createElement('option');
                        option.value = k;
                        option.textContent = k;
                        creditSelect.appendChild(option);
                    }

                    creditCol.appendChild(creditSelect);
                    subjectRow.appendChild(gradeCol);
                    subjectRow.appendChild(creditCol);
                    subjectContainer.appendChild(subjectRow);
                }
            });

            subjectDetailsInput.appendChild(semesterDiv);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let totalGradePoints = 0;
        let totalCredits = 0;
        let semGPAs = [];

        for (let j = 1; j <= semCount; j++) {
            let semGradePoints = 0;
            let semCredits = 0;

            const semesterContainer = document.getElementById(`subjectContainer${j}`);

            if (semesterContainer) {
                const gradeInputs = semesterContainer.querySelectorAll(`select[name^=grade_${j}_]`);
                const creditInputs = semesterContainer.querySelectorAll(`select[name^=credit_${j}_]`);

                gradeInputs.forEach((gradeSelect, index) => {
                    const grade = gradeSelect.value;
                    const credit = parseInt(creditInputs[index].value);

                    if (grade in gradePoints) {
                        semGradePoints += gradePoints[grade] * credit;
                        semCredits += credit;
                    }
                });

                const semGPA = semCredits > 0 ? (semGradePoints / semCredits).toFixed(2) : 0;
                semGPAs.push(semGPA);

                totalGradePoints += semGradePoints;
                totalCredits += semCredits;
            }
        }

        const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

        // Display SGPA of each semester
        semGPAs.forEach((semGPA, index) => {
            alert(`SGPA of Semester ${index + 1}: ${semGPA}`);
        });

        // Display CGPA of all semesters
        alert(`Your CGPA is: ${cgpa}`);
    });
});
