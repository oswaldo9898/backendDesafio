const cartId = document.getElementById('cartId');
const userSesion = document.getElementById('userSesion');

const agregarACarrito = (pid, owner) => {
    const cid = cartId.value;
    const user = userSesion.value;


    if( cid !== '/'){
        if(user != owner){
            fetch(`/api/carts/${cid}/products/${pid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    if (result.status === 200) {
                        Swal.fire({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            title: `Se agregó el producto al carrito`,
                            icon: 'success'
                        });
                    } else {
                        Swal.fire({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            title: `Ocurrio un error`,
                            icon: 'error'
                        });
                    }
            })
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: 'Acceso denegado',
                text: 'Usted no puede agregar los productos que haya creado, por favor eliga otros.',
                icon: 'info'
            });
        }
        
    }else{
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            title: `No tiene los permisos`,
            icon: 'info'
        });
    }

}
