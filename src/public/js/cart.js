const cartId = document.getElementById('cartId');
const emailUser= document.getElementById('emailUser');
const btnPago = document.querySelector('.boton-pagar');
const totalPagar = document.querySelector('.total-pagar');

const email = document.querySelector('#emailUser');
const total = document.getElementById('totalCompra');





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


const calcularTotal = async(cid) => {
    let totalBuy = 0;
    const res = await fetch(`/api/carts/${cid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await res.json();

    result.payload.forEach(element => {
        let subtotal = (element.product.price * element.quantify);
        totalBuy += subtotal;
    });
    // totalPagar.innerHTML = `
    // <label>Total</label>
    // <input type="text" value=${totalBuy} id="totalCompra" disabled/>`;

    totalPagar.innerHTML = `
    <p class="mb-2">Total(Incl. impuestos)</p>
    <p class="mb-2 total" id="totalCompra" >$${totalBuy}</p>`;

    return totalBuy;
}

const init = async() => {
    let cid = cartId.value;
    let totalProducts = await calcularTotal(cid);
    let emailUser = email.value;

    const data = {
        amount: totalProducts,
        purchaser: emailUser,
    }

    btnPago.addEventListener('click', async(event) => {
        event.preventDefault();

        if(data.amount !== 0){
            const res = await fetch(`/api/carts/${cid}/purchase`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            if(result.message === 'success'){
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    title: `Pago exitoso`,
                    icon: 'success'
                });
                window.location.replace(`/compra-exitosa`);
            }
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: `Oops...`,
                text: `No posee ningun producto en su carrito`,
                icon: 'error'
            });
        }
        
    });
}

init();