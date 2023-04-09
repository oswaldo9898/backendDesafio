const cartId = document.getElementById('cartId');

const eliminarProducto = (pid) => {
    let cid = cartId.value;
    fetch(`/api/carts/${cid}/products/${pid}`, {
        method: 'DELETE',
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
                title: `Se eliminó el producto del carrito`,
                icon: 'success'
            })
            window.location.replace(`/carts/${cid}`);
        } else {
            console.log('error')
        }
    })
}