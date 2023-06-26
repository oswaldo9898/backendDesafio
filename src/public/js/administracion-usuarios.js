
const elementTabla = document.querySelector('.contenido-tabla');
const elementPaginacion = document.querySelector('.content-paginacion');
let page = document.createElement('li');
let nextPage = 0;
let prevPage = 0;
let pageCurret = 1;
let userIdCambiar;


const getUsers =async (pageSelect=1) => {
    const res = await fetch(`/api/users/?page=${pageSelect}`);
    const data = await res.json();

    nextPage = data.payload.nextPage;
    prevPage = data.payload.prevPage;
    pageCurret = data.payload.page;
    
    return data;
}


const tableCambiarRolListener = async(event) => {
    const element = event.target.closest('.cambiarUser');
    if(!element)return;
    userIdCambiar = element.getAttribute('user-id');
};



const cargarTabla = (arrUsuarios) => {
    elementTabla.addEventListener('click', tableCambiarRolListener);

    let tableHTML = '';
    arrUsuarios.forEach(usuario => {
        tableHTML += `
            <tr>
                <td>${ usuario.last_name }</td>
                <td>${ usuario.first_name }</td>
                <td>${ usuario.email }</td>
                <td>${ usuario.role}</td>
                <td>
                    <button type="button" user-id=${usuario._id} class="btn btn-primary cambiarUser" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat"><i class="fa-solid fa-user-pen"></i> Cambiar Rol</button>
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



const modificarRol = async (id, role) => {
    let user = {
        role
    }

    const res = await fetch(`/api/users/premium/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
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
            text: UpdateUser.message,
            icon: 'error'
        });
    }else{
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            title: `Rol actualizado`,
            icon: 'success'
        });
    }
    return UpdateUser;
}



const cambiarRol = async(rolUsuarioLogeado) => {
    const rolSelect = document.querySelector('#rolSelect');

    if(rolUsuarioLogeado === 'admin'){
        let role =  rolSelect.value;

        if(role !== 'Seleccionar'){
            const result = await modificarRol(userIdCambiar, role);
            if(result.status == 'success'){
                const data = await getUsers(pageCurret);
                const arrUsers = data.payload.docs;
                cargarTabla(arrUsers);
                actualizarNumeroPagina(page);
                $('#exampleModal').modal('hide');//Cerrar modal
            }
        }else{
            Swal.fire({
                showConfirmButton: false,
                timer: 3000,
                title: 'Información',
                text: 'Seleccione una opción valida.',
                icon: 'info'
            });
        }

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


const actualizarNumeroPagina = (page) => {
    page.classList.add('page-item');
    page.classList.add('p-3');
    page.innerText = '';
    page.innerText = pageCurret;
}

const init = async() => {
    const data = await getUsers();
    const arrUsuarios = data.payload.docs;
    
    cargarTabla(arrUsuarios);
    paginacion();
}


init();

