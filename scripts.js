table = document.querySelector('.table')
btn = document.querySelector('.btn')

const lista_pedidos = async () =>{
    let url = 'http://127.0.0.1:5000/pedidos';
    const response = fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data.pedidos
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      return await response
}

const deletar_pedido = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    let url = 'http://127.0.0.1:5000/pedidos';
    await fetch(url, {
      method: 'delete',
      body: formData
    })
      .then((response) => response)
      .catch((error) => {
        console.error('Error:', error);
      });

      
  }


async function createRowTable(){
    const itens = await lista_pedidos()
    table.innerHTML= "<tr><th>Marca</th><th>Tamanho</th><th>Cor</th><th>Destino</th><th>Ação</th></tr>"

    console.log(itens)
    itens.forEach(item => {

        tr = document.createElement('tr')
        tdMarca = document.createElement('td')
        tdTamanho = document.createElement('td')
        tdCor = document.createElement('td')
        tdDestino = document.createElement('td')
        tdAcao = document.createElement('td')

        tdMarca.innerText = item.brand
        tdTamanho.innerText = item.size
        tdCor.innerText = item.color
        tdDestino.innerText = item.destination
        tdAcao.innerHTML = `<img src="./images/lixo.png" alt="deletar" class="excluir" data-id=${item.id}>`
        tdAcao.classList.add("excluir")
        tdAcao.dataset.id = item.id
        tr.appendChild(tdMarca)
        tr.appendChild(tdTamanho)
        tr.appendChild(tdCor)
        tr.appendChild(tdDestino)
        tr.appendChild(tdAcao)

        table.appendChild(tr)
    });

    const btn_excluir = document.querySelectorAll('.excluir')
    btn_excluir.forEach((item)=>{
        item.addEventListener('click', async (el)=>{
            await deletar_pedido(el.target.dataset.id)
            createRowTable()
        })
    })
    console.log(btn_excluir)

}

createRowTable()

const cria_pedido = async (marca,tamanho,cor,destino) => {
    const formData = new FormData();
    formData.append('brand', marca);
    formData.append('size', tamanho);  
    formData.append('color', cor);
    formData.append('destination', destino);
    let url = 'http://127.0.0.1:5000/pedidos';
    await fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }



btn.addEventListener('click', async () =>{
    console.log("funcionando!")
    const marca = document.querySelector('#marca').value
    const tamanho = document.querySelector('#tamanho').value
    const destino = document.querySelector('#destino').value
    const cor = document.querySelector('#cor').value
    console.log(marca,tamanho,destino,cor)
    await cria_pedido(marca,tamanho,cor,destino)
    createRowTable()
})

