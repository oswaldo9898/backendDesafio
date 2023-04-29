let form = document.querySelector('form');
let productoCargado = {};


let pid = '';


const obtenerProducto = async(id) => {
    const res = await fetch(`/api/products/${id}`);
    const newUser = await res.json();
    return newUser;
}


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



const modificarProducto = async(producto, id) => {
    console.log(id)
    const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const UpdateUser = await res.json();
    return UpdateUser;
}


form.addEventListener('submit', async(event)=>{
    event.preventDefault();    
    const formData = new FormData(form);
    const producto = {...productoCargado}

    for(const [key, value] of formData){
        producto[key] = value;
    }

    if(!pid){
        producto['code']= Date.now()
        const res = await agregarProducto(producto);        
        if(res.message === 'success'){
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: `Producto creado`,
                icon: 'success'
            });
            window.location.replace('/administracion');
        }
    }else{
        const res = await modificarProducto(producto, pid);
        if(res.message === 'success'){
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: `Producto editado`,
                icon: 'success'
            });
            window.location.replace('/administracion');
        }
    }
});


const setFormValues = (producto) => {
    form.querySelector('[name="title"]').value = producto.title;
    form.querySelector('[name="category"]').value = producto.category;
    form.querySelector('[name="description"]').value = producto.description;
    form.querySelector('[name="price"]').value = producto.price;
    form.querySelector('[name="stock"]').value = producto.stock;
    productoCargado = producto;
}




const init = async() => {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    pid = urlParams.get('pid');

    if(pid){
        const productoSeleccioando = await obtenerProducto(pid);
        setFormValues(productoSeleccioando.payload);
    }
}

init()