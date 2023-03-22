
const eliminarProducto = (pid) => {
    console.log('se elimino')
    let cid = '64178ea0f42c1bf094545772';
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
            window.location.replace('/carts/64178ea0f42c1bf094545772');
        } else {
            console.log('error')
        }
    })
}