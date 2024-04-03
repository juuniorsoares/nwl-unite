let participantes = [
  {
    nome: "Junior Soares",
    email: "junior@gmail.com",
    dataInscricao: new Date(2024, 5, 22, 19, 20),
    dataCheckIn: new Date(2024, 5, 25, 22, 00)
  },
  {
    nome: "Paulo Roberto",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 4, 27, 22, 20),
    dataCheckIn: new Date(2024, 4, 26, 10, 00)
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 8, 15, 18, 45),
    dataCheckIn: new Date(2024, 7, 22, 9, 30)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 14, 10),
    dataCheckIn: new Date(2024, 1, 10, 8, 15)
  },
  {
    nome: "Ana Santos",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 6, 12, 21, 30),
    dataCheckIn: new Date(2024, 6, 15, 12, 45)
  },
  {
    nome: "Pedro Alves",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 8, 18, 10, 55),
    dataCheckIn: new Date(2024, 8, 22, 16, 20)
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 5, 8, 8, 30),
    dataCheckIn: new Date(2024, 5, 15, 11, 10)
  },
  {
    nome: "Lucas Santos",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 10, 3, 17, 20),
    dataCheckIn: new Date(2024, 10, 8, 20, 30)
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 8, 19, 12, 15),
    dataCheckIn: new Date(2024, 9, 4, 16,30)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //condicional 
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick ="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
  </tr>
  `
}


const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosdoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosdoFormulario.get("nome"),
    email: dadosdoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

  if(participanteExiste){
    alert("Email já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {

  const mensagemdeConfirmacao = "Tem certeza que quer fazer o check-in?"
  if(confirm(mensagemdeConfirmacao) == false){
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  //atualizar o check-in dos participantes
  participante.dataCheckIn = new Date()

  //atualizar lista
  atualizarLista(participantes)
}


