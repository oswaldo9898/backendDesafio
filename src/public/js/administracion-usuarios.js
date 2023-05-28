
const elementTabla = document.querySelector('.contenido-tabla');
const elementPaginacion = document.querySelector('.content-paginacion');
let page = document.createElement('li');
let nextPage = 0;
let prevPage = 0;
let pageCurret = 1;


const getUsers =async (pageSelect=1) => {
    const res = await fetch(`/api/users/?page=${pageSelect}`);
    const data = await res.json();

    nextPage = data.payload.nextPage;
    prevPage = data.payload.prevPage;
    pageCurret = data.payload.page;
    
    return data;
}


const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-usuario');
    if(!element)return;

    const id = element.getAttribute('data-id');

    try {
        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        if(res.status === 200){
            const data = await getUsers(pageCurret)
            const arrUsers = data.payload.docs;
            cargarTabla(arrUsers);
            actualizarNumeroPagina(page);
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                title: `usuario eliminado`,
                icon: 'success'
            });
        }
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
};



const cargarTabla = (arrUsuarios) => {
    elementTabla.addEventListener('click', tableDeleteListener);

    let tableHTML = '';
    arrUsuarios.forEach(usuario => {
        tableHTML += `
            <tr>
                <td>${ usuario.last_name }</td>
                <td>${ usuario.first_name }</td>
                <td>${ usuario.email }</td>
                <td>${ usuario.role}</td>
                <td>
                    <a href="/administrar-producto?pid=${usuario._id}" class="update-user" data-id=${usuario._id}>Editar</a>
                    |
                    <a href="#/" class="delete-producto" data-id=${usuario._id}>Eliminar</a>
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
            const data = await getUsers(nextPage)
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
            const data = await getUsers(prevPage)
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
    const data = await getUsers();
    const arrUsuarios = data.payload.docs;

    console.log(data);
    
    cargarTabla(arrUsuarios);
    paginacion();
}


init();

