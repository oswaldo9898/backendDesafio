const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    if (re.test(obj.password)) {
        fetch('/api/sessions/register', {
            method:'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(result => {
            if(result.status === 200){
                window.location.replace('/login');
            }
        });
    }else{
        Swal.fire({
            showConfirmButton: false,
            timer: 4000,
            title: 'Contraseña invalida',
            text: 'Recuerde que la contraseña debe contener mínimo 8 caracteres, una letra mayúscula, un símbolo y un número.',
            icon: 'info'
        });
    }

    
});