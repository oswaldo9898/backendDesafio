const elementoDiv = document.querySelector('.datos');

const init = async() => {
    const res = await fetch(`/api/sessions/current`);
    const data = await res.json();

    elementoDiv.innerHTML = `
    <p>DATOS DEL USUARIO</p>
    <p>Nombre: ${data.payload.name}</p>
    <p>Correo: ${data.payload.email}</p>
    <p>Rol: ${data.payload.role}</p>`;
}

init();