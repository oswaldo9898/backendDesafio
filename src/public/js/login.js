const form = document.querySelector('#loginForm');
const btnGitHub = document.getElementById('loginGitHub');
const btnLogin = document.getElementById('btn-login');

btnGitHub.addEventListener('click', e => {
    btnGitHub.disabled  = true

})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    btnLogin.setAttribute("disabled", "disabled");

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    console.log(obj)

    fetch('/api/sessions/login', {
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Access': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        btnLogin.removeAttribute("disabled");
        console.log(result)
        if(result.status === 200){
            window.location.replace('/productos');
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: 'Datos invalidos',
                text: 'Correo electrónico o Contraseña invalidos',
                icon: 'error'
            });
        }
    })
});

