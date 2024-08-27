function calculateAge(birthDateStr) {
    const today = new Date();
    const [place, dateStr] = birthDateStr.split(', ');
    const [day, monthStr, year] = dateStr.split(' ');
    const months = {
        'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
        'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
    };
    // Convert monthStr to lowercase to match the months object
    const monthStrLower = monthStr.toLowerCase();
    const month = months[monthStr];
    const birthDate = new Date(year, month, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }

                    // Handle the case where month is not recognized
    if (month === undefined) {
        throw new Error('Penulisan Bulan Tidak Sesuai');
    }
       

    // Determine age category
    let ageCategory;
    if (age >= 0 && age <= 6) {
        ageCategory = '0-6';
    } else if (age >= 7 && age <= 9) {
        ageCategory = '7-9';
    } else if (age >= 10 && age <= 13) {
        ageCategory = '10-13';
    } else if (age >= 14 && age <= 16) {
        ageCategory = '14-16';
    } else if (age >= 17 && age <= 19) {
        ageCategory = '17-19';
    } else if (age >= 20 && age <= 30) {
        ageCategory = '20-30';
    } else if (age >= 31 && age <= 40) {
        ageCategory = '31-40';
    } else if (age >= 41 && age <= 50) {
        ageCategory = '41-50';
    } else if (age >= 51 && age <= 60) {
        ageCategory = '51-60';
    } else if (age >= 61) {
        ageCategory = '61 keatas';
    }

    return { age, ageCategory };
}

// Enable or disable submit button based on form validity
function checkFormValidity() {
    const form = document.getElementById('residentForm');
    const submitBtn = document.getElementById('submitBtn');
    if (form.checkValidity()) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-inactive');
        submitBtn.classList.add('btn-active');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('btn-active');
        submitBtn.classList.add('btn-inactive');
    }
}

// Add event listeners for input and change events
document.querySelectorAll('#residentForm input, #residentForm select').forEach(input => {
    input.addEventListener('input', checkFormValidity);
    input.addEventListener('change', checkFormValidity);
});

// Handle NIK input
document.getElementById('NIK').addEventListener('input', function () {
    const NIKInput = this.value;
    const NIKError = document.getElementById('NIKError');
    if (NIKInput.length !== 16) {
        NIKError.style.display = 'block';
    } else {
        NIKError.style.display = 'none';
    }
});

// Handle Tempat/Tanggal Lahir input
document.getElementById('T_LAHIR').addEventListener('input', function () {
const T_LAHIRInput = this.value;
const T_LAHIRError = document.getElementById('T_LAHIRError');

// Regular expression for validating Tempat/Tanggal Lahir
// Case-insensitive flag 'i' added
const regex = /^[A-Za-z\s]+,\s\d{2}\s[A-Za-z]+\s\d{4}$/i;

if (!regex.test(T_LAHIRInput)) {
T_LAHIRError.textContent = 'Tempat/Tanggal Lahir harus sesuai format: Muara Badak, 31 Desember 2024.'; // Error message for format issue
T_LAHIRError.style.display = 'block';
} else {
try {
    // Convert input to a standardized format if needed
    const standardizedInput = T_LAHIRInput.toLowerCase();
    
    // Calculate age and age category
    const { age, ageCategory } = calculateAge(standardizedInput);
    document.getElementById('Age').value = age;
    document.getElementById('rentang_umur').value = ageCategory;
    
    // Hide error message if everything is correct
    T_LAHIRError.style.display = 'none';
} catch (error) {
    T_LAHIRError.textContent = error.message; // Display specific error message
    T_LAHIRError.style.display = 'block';
}
}
});


// Show confirmation modal on submit button click
document.getElementById('submitBtn').addEventListener('click', function () {
    $('#confirmationModal').modal('show');
});

// Handle confirmation
document.getElementById('confirmBtn').addEventListener('click', function () {
    // Validate NIK length
    const NIKInput = document.getElementById('NIK');
    const NIKError = document.getElementById('NIKError');
    if (NIKInput.value.length !== 16) {
        NIKError.style.display = 'block';
        return;
    } else {
        NIKError.style.display = 'none';
    }

    // Validate Tempat/Tanggal Lahir format
    const T_LAHIRInput = document.getElementById('T_LAHIR');
    const T_LAHIRError = document.getElementById('T_LAHIRError');
    const regex = /^[A-Za-z\s]+,\s\d{2}\s[A-Za-z]+\s\d{4}$/;
    if (!regex.test(T_LAHIRInput.value)) {
        T_LAHIRError.style.display = 'block';
        return;
    } else {
        T_LAHIRError.style.display = 'none';
    }

    // Gather form data
    const formData = {
        NAMA: document.getElementById('NAMA').value,
        'Status Kependudukan': document.getElementById('Status_Kependudukan').value,
        NIK: document.getElementById('NIK').value,
        'T.LAHIR': document.getElementById('T_LAHIR').value,
        'JENIS KELAMIN': document.getElementById('JENIS_KELAMIN').value,
        PEKERJAAN: document.getElementById('PEKERJAAN').value,
        ALAMAT: document.getElementById('ALAMAT').value,
        AGAMA: document.getElementById('AGAMA').value,
        Age: document.getElementById('Age').value,
        rentang_umur: document.getElementById('rentang_umur').value
    };

// Send data as JSON to the API
fetch('/api/add/resident', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(formData)
})
.then(response => {
if (!response.ok) {
// If the response is not OK, throw an error
return response.json().then(errorData => {
    throw new Error(errorData.error || 'Failed to submit the form.');
});
}
return response.json();
})
.then(data => {
// Handle successful response
alert(data.message);
document.getElementById('residentForm').reset();
document.getElementById('Age').value = '';
document.getElementById('rentang_umur').value = '';
document.getElementById('submitBtn').disabled = true;
document.getElementById('submitBtn').classList.remove('btn-active');
document.getElementById('submitBtn').classList.add('btn-inactive');
$('#confirmationModal').modal('hide');
})
.catch(error => {
// Handle errors
alert('Error: ' + error.message);
console.error('Error:', error);
});
});

// Initial check for form validity
checkFormValidity();