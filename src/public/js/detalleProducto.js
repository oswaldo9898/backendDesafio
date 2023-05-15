const quantity = document.querySelector("#quantity");

const agregarACarrito = (pid, cid) => {
    const cantidad = quantity.value;
    
    let product = {
        cantidad
    }

    if( cid !== ''){
        fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'POST',
            body: JSON.stringify(product),
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
                })
            } else {
                console.log('error')
            }
        });
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

