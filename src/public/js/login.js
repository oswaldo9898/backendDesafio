const form = document.querySelector('#loginForm');
const btnGitHub = document.getElementById('loginGitHub');
console.log('Entra')


btnGitHub.addEventListener('click', e => {
    btnGitHub.disabled  = true

})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('En324234tra')

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/login', {
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Access': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200){
            window.location.replace('/productos');
        }
    })
});

