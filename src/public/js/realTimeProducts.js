const socket = io();
const insertDOMcontent = document.querySelector('#insertDOMcontent');
const frmProducto = document.getElementById('frmProduct');


socket.on('allProducts', data => {
    listarProductos(data)
})

const listarProductos = (products) => {
    insertDOMcontent.innerHTML = ''
    if(products !== undefined ){
        products.forEach(element => {
            const {_id, title, description} = element;
            insertDOMcontent.innerHTML += `<div class="producto">
            <div class="productoTitulo">${title}</div>
            <div class="productoDescripcion">${description}</div>
            
            <div class="botonEliminar">
                <button class="btnEliminar" id="${_id}">Eliminar</button>
                </div>
        </div>`;
        });
    }

    let botonEliminar = document.querySelectorAll('.btnEliminar');
    botonEliminar.forEach(element => {
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            let id = e.target.id;
            socket.emit('deleteProduct', id);
        })
    })
}





frmProducto.addEventListener('submit', (event) => {
    event.preventDefault();
    let datosFormulario = new FormData(frmProducto);
    agregarProducto(datosFormulario);
    frmProducto.reset();
});

const agregarProducto = (producto) => {
    let productNew = {
        title: producto.get('title'),
        description: producto.get('description'),
        code: producto.get('code'),
        price: producto.get('price'),
        status: true,
        stock: producto.get('stock'),
        category: producto.get('category'),
    }
    socket.emit('addProduct', productNew);
}
