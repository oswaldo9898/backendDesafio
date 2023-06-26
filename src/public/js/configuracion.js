let formIdentificacion = document.getElementById('formIdentificacion');
let formComprobante = document.getElementById('formComprobante');
let formEstado = document.getElementById('formEstado');


const subirDocumento = async (uid, documento, ruta) => {
    let user;

    axios.post(`/api/users/${uid}/documents?ruta=${ruta}`, documento, {})
        .then((res) => {
            if(res.status == 200){
                user = res.data;
                Swal.fire({
                    showConfirmButton: false,
                    timer: 4000,
                    title: `Exitoso`,
                    text: 'El documento se subio exitosamente',
                    icon: 'success'
                });
                window.location.replace('/configuracion');
            }else{
                Swal.fire({
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Upss...',
                    text: 'Ocurrio un error en el servidor, intente nuevamente más tarde.',
                    icon: 'error'
                });
            }
    });
    return user;
}

const subirIdentificacion =  async (uid) => {
    const formData = new FormData(formIdentificacion);
    const fd = new FormData();
    const dato = {};

    for (const [key, value] of formData) {
        dato[key] = value;
    }

    fd.append('documento', dato.identificacion);
    fd.append('name', 'identificacion');

    const res = await subirDocumento(uid, fd, 'documents');
    
};


const subirComprobante =  async (uid) => {
    const formData = new FormData(formComprobante);
    const fd = new FormData();
    const dato = {};


    for (const [key, value] of formData) {
        dato[key] = value;
    }
    
    fd.append('documento', dato.comprobante);
    fd.append('name', 'comprobante_domicilio');

    const res = await subirDocumento(uid, fd,'documents');
    
};


const subirEstado =  async (uid) => {
    const formData = new FormData(formEstado);
    const fd = new FormData();
    const dato = {};

    for (const [key, value] of formData) {
        dato[key] = value;
    }
    
    fd.append('documento', dato.estado);
    fd.append('name', 'estado_cuenta');

    const res = await subirDocumento(uid, fd,'documents');
    
};