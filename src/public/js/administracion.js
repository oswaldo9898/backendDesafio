
const elementTabla = document.querySelector('.contenido-tabla');
const elementPaginacion = document.querySelector('.content-paginacion');
let page = document.createElement('li');
let nextPage = 0;
let prevPage = 0;
let pageCurret = 1;


const userSesionElement = document.getElementById('userSesion');
const userSesion = userSesionElement.value;


const getProducts =async (pageSelect=1) => {
    const res = await fetch(`/api/products/?page=${pageSelect}`);
    const data = await res.json();

    nextPage = data.payload.nextPage;
    prevPage = data.payload.prevPage;
    pageCurret = data.payload.page;
    
    return data;
}


const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-producto');
    if(!element)return;

    const id = element.getAttribute('data-id');
    const owner = element.getAttribute('owner');

    try {
        if(owner == userSesion || userSesion == 'adminCoder@coder.com'){

            Swal.fire({
                title: '¿Está seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then(async (result) => {
                
                if (result.isConfirmed) {
                    
                    const res = await fetch(`/api/products/${id}/${userSesion}`, {
                        method: 'DELETE'
                    });

                    if(res.status === 200){
                        const data = await getProducts(pageCurret)
                        const arrProductos = data.payload.docs;
                        cargarTabla(arrProductos);
                        actualizarNumeroPagina(page);
                        Swal.fire({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            title: `Producto eliminado`,
                            icon: 'success'
                        });
                    }else if (res.status === 401){
                        Swal.fire({
                            showConfirmButton: false,
                            timer: 3000,
                            title: 'Acceso denegado',
                            text: 'Usted no tiene el permiso para realizar esta actividad.',
                            icon: 'info'
                        });
                    }
                }

            });
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: 'Acceso denegado',
                text: 'Usted no tiene el permiso para realizar esta actividad.',
                icon: 'info'
            });
        }
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
};



const editarProducto = () => {
    const element = event.target.closest('.update-producto');
    if(!element)return;

    const idProduct = element.getAttribute('data-id');
    const owner = element.getAttribute('owner');

    if(owner == userSesion || userSesion == 'adminCoder@coder.com'){
        window.location.replace(`/administrar-producto?pid=${idProduct}`);
    }else{
        Swal.fire({
            showConfirmButton: false,
            timer: 3000,
            title: 'Acceso denegado',
            text: 'Usted no tiene el permiso para realizar esta actividad.',
            icon: 'info'
        });
    }
}


const cargarTabla = (arrProductos) => {

    elementTabla.addEventListener('click', tableDeleteListener);

    let tableHTML = '';
    arrProductos.forEach(product => {
        if(product.owner == undefined) product.owner = 'adminCoder@coder.com';
        tableHTML += `
            <tr>
                <td>${ product.title }</td>
                <td>${ product.description }</td>
                <td>${ product.category }</td>
                <td>${ product.stock}</td>
                <td>$ ${ product.price }</td>
                <td>${ product.owner }</td>
                <td>
                    <a class="update-producto" data-id=${product._id} owner=${product.owner} onclick="editarProducto()">Editar</a>
                    |
                    <a class="delete-producto" data-id=${product._id} owner=${product.owner}>Eliminar</a>
                </td>
            </tr>
        `
    });
    elementTabla.innerHTML = tableHTML;
}



const paginacion = () => {
    
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    nextButton.innerText = ' Siguiente >';
    
    nextButton.addEventListener('click', async() => {

        if(nextPage!=null){
            const data = await getProducts(nextPage)
            const arrProductos = data.payload.docs;
            cargarTabla(arrProductos);
            actualizarNumeroPagina(page);

            if(nextPage === null) {
                nextButton.classList.add('disable');
                prevButton.classList.remove('disable');
            }else{
                nextButton.classList.remove('disable');
                prevButton.classList.remove('disable');
            }
        }
    });

    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    prevButton.innerText = '< Anterior ';
    prevButton.classList.add('disable');

    prevButton.addEventListener('click', async() => {

        if(prevPage!=null){
            const data = await getProducts(prevPage)
            const arrProductos = data.payload.docs;
            cargarTabla(arrProductos);
            actualizarNumeroPagina(page);

            if(prevPage === null) {
                prevButton.classList.add('disable');
                nextButton.classList.remove('disable');
            }else{
                prevButton.classList.remove('disable');
                nextButton.classList.remove('disable');
            }
        }
    });

    actualizarNumeroPagina(page);
    elementPaginacion.append(prevButton);
    elementPaginacion.append(page);
    elementPaginacion.append(nextButton);
}


const actualizarNumeroPagina = (page) => {
    page.classList.add('page-item');
    page.classList.add('p-3');
    page.innerText = '';
    page.innerText = pageCurret;
}




const init = async() => {
    const data = await getProducts();
    const arrProductos = data.payload.docs;
    cargarTabla(arrProductos);
    paginacion();
}


init();

