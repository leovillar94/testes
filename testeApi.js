const axios = require('axios')

const url = 'http://localhost:3000/'
const usuario = 'vampeta5'
const senha = '123'



function login() {
    axios.get(url + 'usuario')
    .then(resposta => {
        const user = resposta.data.map((data) => data.login).indexOf(usuario)

        if (user == -1 || resposta.data[user].senha !== senha) {
            console.log('login ou senha errada')
        } else {
            console.log('login feito com sucesso')

            axios.get(url + 'dados')
            .then(resposta => {
                console.log(user)
                const produtos = resposta.data[user].produtos.map((produtos) => produtos.produto)
                
                for (i = 0; i < produtos.length; i++) {
                    console.log(resposta.data[user].produtos[i].produto)
                    console.log(resposta.data[user].produtos[i].valor)
                }
            })
        }
    })
    .catch(erro => console(erro))
}

// login()



const novoUsuario = 'vampeta5'
const novaSenha = '123'

async function adicionarUsuario() {
    axios.get(url + 'usuario')
    .then(resposta => {
        if (resposta.data.map((data) => data.login).indexOf(novoUsuario) == -1) {
            axios.post(url + 'usuario', 
            {
                id: '',
                login: novoUsuario,
                senha: novaSenha
            })
            .then(resposta => console.log('novo usuario criado'))
            .catch(erro => console(erro))

            axios.post(url + 'dados', 
            {
                id: ''
            })
            .then(resposta => console.log('insira novos dados'))
            .catch(erro => console(erro))
        } else {
            console.log('usuario ja existente')
        }
    })
    .catch(erro => console(erro))
}

// adicionarUsuario()




async function adicionarOuModificarItem() {
    axios.get(url + 'usuario')
    .then(resposta => {
        const user = resposta.data.map((data) => data.login).indexOf(usuario)
        const userId = resposta.data[user].id

        axios.put(url + 'dados/' + userId,
        {
            id: '',
            produtos: [
              {
                produto: "teste",
                valor: "R$:2,99"
              },
              {
                produto: "ao",
                valor: "R$:4,09"
              },
              {
                produto: "ro",
                valor: "R$:7,79"
              }
            ]
        })
        .then(resposta => console.log('item adicionado'))
        .catch(erro => console(erro))
    })
    .catch(erro => console(erro))
}

// adicionarOuModificarItem()



async function deleteApi() {
    axios.get(url + 'usuario')
    .then(resposta => {
        const user = resposta.data.map((data) => data.login).indexOf(usuario)

        axios.delete(url + 'dados/' + user)
        .then(resposta => console.log('dados deletado'))
        .catch(erro => console(erro))

        axios.delete(url + 'usuario/' + user)
        .then(resposta => console.log('usuario deletado'))
        .catch(erro => console(erro))
    })
    .catch(erro => console(erro))
}

// deleteApi()