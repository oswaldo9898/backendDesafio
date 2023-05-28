const form = document.getElementById('resetForm');
const btnRecuperar = document.getElementById('btn-recuperar');

form.addEventListener('submit', e => {
    e.preventDefault();
    btnRecuperar.setAttribute("disabled", "disabled");

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/recuperar-cuenta', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        btnRecuperar.removeAttribute("disabled");
        if (result.status === 200) {
            Swal.fire({
                title: 'Exito',
                text: "Enviamos un enlace a su correo electronico, recuerde que el enlace es valido por 1 hora!",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace('/login');
                }else{
                    window.location.replace('/login');
                }
            })
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                text: 'Los datos ingresados son incorrectos',
                icon: 'info'
            });
        }
    })
});