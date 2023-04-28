
const elementTabla = document.querySelector('.contenido-tabla');
const elementPaginacion = document.querySelector('.content-paginacion');
let page = document.createElement('p');
let nextPage = 0;
let prevPage = 0;
let pageCurret = 1;

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

    try {
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        if(res.status == 200){
            const data = await getProducts(nextPage)
            const arrProductos = data.payload.docs;
            cargarTabla(arrProductos);
            actualizarNumeroPagina(page);
        }
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
};


const cargarTabla = (arrProductos) => {
    elementTabla.addEventListener('click', tableDeleteListener);

    let tableHTML = '';
    arrProductos.forEach(product => {
        tableHTML += `
            <tr>
                <td>${ product.title }</td>
                <td>${ product.description }</td>
                <td>${ product.category }</td>
                <td>${ product.price }</td>
                <td>
                    <a href="#/" class="select-user" data-id=${product._id}>Editar</a>
                    |
                    <a href="#/" class="delete-producto" data-id=${product._id}>Eliminar</a>
                </td>
            </tr>
        `
    });
    elementTabla.innerHTML = tableHTML;
}



const paginacion = () => {
    
    const nextButton = document.createElement('button');
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

    const prevButton = document.createElement('button');
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

