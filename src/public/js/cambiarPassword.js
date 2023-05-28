const form = document.getElementById('resetForm');
const btnGuardar = document.getElementById('btn-guardar');

//Obtener valores del params
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);


const cambiarPassword = async (obj, userToken) => {
    const res = await fetch(`/api/sessions/cambiar-password/${userToken}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resp = await res.json();
    return resp;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnGuardar.setAttribute("disabled", "disabled");

    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var userToken = urlParams.get('user');
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    if (obj.passwordNew === obj.passwordRepit) {
        let password = obj.passwordNew;

        if (re.test(password)) {
            const resp = await cambiarPassword(obj, userToken);
            if (resp.status == 'error') {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Error',
                    text: resp.message,
                    icon: 'error'
                });
            } else {
                Swal.fire({
                    title: 'Exito',
                    text: "La contraseña ha sido cambiada exitosamente!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Confirmar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace('/login');
                    }else{
                        window.location.replace('/login');
                    }
                });
            }
        } else {
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: 'Datos invalidos',
                text: 'Recuerde que la contraseña debe contener mínimo 8 caracteres, una letra mayúscula, un símbolo y un número.',
                icon: 'info'
            });
        }
    } else {
        Swal.fire({
            showConfirmButton: false,
            timer: 3000,
            title: 'Datos invalidos',
            text: 'Las contraseñas ingresadas no coinciden',
            icon: 'error'
        });
    }
    btnRecuperar.removeAttribute("disabled");
});