const cartId = document.getElementById('cart');

const agregarACarrito = (pid) => {
    const cid = cartId.value;
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
