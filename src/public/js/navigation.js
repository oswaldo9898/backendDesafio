

const getCantProduct = async() => {
    const res = await fetch(`/api/carts/cantProductos`, {
        method: 'GET'
    });
    const data = await res.json();
    return data.payload;
}

const initNav = async() => {
    let cantCart = document.querySelector('#cantCart');
    let cant = await getCantProduct();
    cantCart.innerHTML = cant;
}


initNav();
