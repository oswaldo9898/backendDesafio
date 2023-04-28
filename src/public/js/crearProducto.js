
let form = document.querySelector('form');
let productoCargado = {};




const agregarProducto = async(producto) => {
    const res = await fetch(`/api/products/`, {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const newUser = await res.json();
    return newUser;
}


form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    
    const formData = new FormData(form);
    const producto = {...productoCargado}

    for(const [key, value] of formData){
        producto[key] = value;
    }

    producto['code']= Date.now()
    const res = await agregarProducto(producto);

    console.log(res)
    
    if(res.message === 'Success'){
        window.location.replace('/administracion');
    }
});