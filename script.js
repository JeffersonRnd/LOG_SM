const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phone = document.getElementById('phone');
const nextButton = document.getElementById('nextButton');
const createAccount = document.getElementById('createAccount');
const existingUserLink = document.getElementById('existingUserLink');
const clientButton = document.getElementById('clientButton');
const adminButton = document.getElementById('adminButton'); 
const loginForm = document.getElementById('loginForm');
const selectRole = document.getElementById('selectRole');
const welcomeScreen = document.getElementById('welcomeScreen');
const dniLabel = document.getElementById('dniLabel'); 
const rucLabel = document.getElementById('rucLabel'); 

// Bienvenida
setTimeout(() => {
    welcomeScreen.classList.add('hidden');
    selectRole.classList.remove('hidden');
}, 3000);

existingUserLink.addEventListener('click', (e) => {
    e.preventDefault();
    nextButton.classList.add('hidden');
    createAccount.classList.remove('hidden');
});

// para la validación
nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (firstName.value.trim() && lastName.value.trim() && phone.value.trim()) {
        nextButton.classList.add("hidden");
        createAccount.classList.remove("hidden");
    } else {
        // Uso de Bootstrap's para notificaciones
        alert("Por favor, complete todos los campos requeridos.");
    }
});

// Login 
document.getElementById('submitLogin').addEventListener('click', (e) => {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username.value.trim() === '' || password.value.trim() === '') {
        alert('Por favor, ingrese un nombre de usuario y contraseña válidos');
    } else {
        const userData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            dni: document.getElementById('dni')?.value.trim() || '',
            ruc: document.getElementById('ruc')?.value.trim() || '',
            phone: phone.value.trim(),
            username: username.value.trim(),
            password: password.value.trim()
        };

        // Guardar los datos en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Mostrar los datos en la consola
        console.log('Datos registrados y almacenados en localStorage:', userData);

        // Mostrar el mensaje de éxito
        alert('Datos registrados correctamente');

        // Esperar un poco para que el usuario vea el mensaje y los datos en la consola antes de redirigir
        const redirectTimeout = 2000; 

        // Redirigir de acuerdo al rol
        setTimeout(() => {
            if (clientButton.classList.contains('active')) {
                window.location.href = "https://jeffersonrnd.github.io/CUSTOMER_SM/";
            } else if (adminButton.classList.contains('active')) {
                window.location.href = "https://jeffersonrnd.github.io/Administrator-Employee_SM/";
            }
        }, redirectTimeout);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Rellenar campos con los datos guardados
        firstName.value = userData.firstName;
        lastName.value = userData.lastName;
        phone.value = userData.phone;
        document.getElementById('dni').value = userData.dni;
        document.getElementById('ruc').value = userData.ruc;
    }
});


// seleccion de rol
clientButton.addEventListener('click', () => {
    selectRole.classList.add('hidden');
    loginForm.classList.remove('hidden');
    dniLabel.classList.add('hidden');
    rucLabel.classList.add('hidden');
    clientButton.classList.add('active');
    adminButton.classList.remove('active');
});

adminButton.addEventListener('click', () => {
    selectRole.classList.add('hidden');
    loginForm.classList.remove('hidden');
    dniLabel.classList.remove('hidden');
    rucLabel.classList.remove('hidden');
    adminButton.classList.add('active');
    clientButton.classList.remove('active');
});
