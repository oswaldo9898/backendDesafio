
import Carts from "../../dao/dbManager/carts.js";

const cartsManager = new Carts();

const botonAgregar = document.querySelectorAll('.agregarButton');



botonAgregar.forEach(element => {
    console.log(element)
    element.addEventListener('click', async(e) => {
        // e.preventDefault();
        let id = e.target.id;
        const resp = await cartsManager.agregarProductoCart('64178ea0f42c1bf094545772',id)
        
        console.log('Agregar id: ', id)
    })
})



// document.addEventListener("DOMContentLoaded", () => {
//     console.log('Eliminarr')
//     const botonAgregar = document.querySelectorAll('.botonAgregar');
//     console.log(botonAgregar)

//     botonAgregar.forEach(element => {
//         console.log(element)
//         element.addEventListener('click', (e) => {
//             // e.preventDefault();
//             let id = e.target.id;
//             console.log('Agregar id: ', id)
//         })
//     })
// });




