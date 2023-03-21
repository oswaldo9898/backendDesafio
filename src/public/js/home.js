
const agregarACarrito = (pid) => {
    let cid = '64178ea0f42c1bf094545772';
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
            })
        } else {
            console.log('error')
        }
    })

}
