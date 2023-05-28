let form = document.querySelector('form');
let productoCargado = {};


let pid = '';


const obtenerProducto = async (id) => {
    const res = await fetch(`/api/products/${id}`);
    const newUser = await res.json();
    return newUser;
}


const agregarProducto = async (producto) => {
    let user;

    axios.post("/api/products/", producto, {})
        .then((res) => {
            if(res.status == 200){
                user = res.data;
                Swal.fire({
                    showConfirmButton: false,
                    timer: 4000,
                    title: `Exitoso`,
                    text: 'Producto creado exitosamente',
                    icon: 'success'
                });
                window.location.replace('/administrar');
            }
    });
    return user;
}



const modificarProducto = async (producto, id) => {
    const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const UpdateUser = await res.json();
    if (res.status == 401) {
        Swal.fire({
            showConfirmButton: false,
            timer: 4000,
            title: `Oops...`,
            text: UpdateUser.description,
            icon: 'error'
        });
    }
    return UpdateUser;
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const fd = new FormData();
    const producto = { ...productoCargado }


    for (const [key, value] of formData) {
        producto[key] = value;
    }

    fd.append('title', producto.title);
    fd.append('category', producto.category);
    fd.append('description', producto.description);
    fd.append('price', producto.price);
    fd.append('stock', producto.stock);
    fd.append('imgProducto', producto.imgProducto);
    fd.append('code', Date.now());

    if (!pid) {
        const res = await agregarProducto(fd);
        // if (res.message === 'success') {
        //     Swal.fire({
        //         toast: true,
        //         position: 'bottom-end',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         title: `Producto creado`,
        //         icon: 'success'
        //     });
        //     window.location.replace('/administrar');
        // } else {
        //     Swal.fire({
        //         toast: true,
        //         position: 'bottom-end',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         icon: 'error'
        //     });
        // }
    } else {
        const res = await modificarProducto(producto, pid);
        if (res.message === 'success') {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: `Producto editado`,
                icon: 'success'
            });
            window.location.replace('/administrar');
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




const init = async () => {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    pid = urlParams.get('pid');

    if (pid) {
        const productoSeleccioando = await obtenerProducto(pid);
        setFormValues(productoSeleccioando.payload);
    }
}

init()