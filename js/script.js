const Modal = {
  open() {
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },

  close() {
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  },
}

const showAllDataClient = {
  open() {
    document
      .querySelector('.modal-overlay-client')
      .classList
      .add('active')
  },

  close() {
    document
      .querySelector('.modal-overlay-client')
      .classList
      .remove('active')
  },
}

const List = {

  isShow: false,

  show() {
    List.isShow = !List.isShow
    dom.clearNotification()
    if (List.isShow) {
      App.reload()
      if (Client.all.length == 0) {
        dom.addStyleBtn(true)
        dom.addNewNotification("Nenhum cliente cadastrado", "red")
        setTimeout(function () { dom.clearNotification() }, 3000);
      } else {
        dom.addStyleBtn(true)
        Client.all.forEach(dom.addNewClient)
      }
    } else {
      dom.addStyleBtn(false)
      App.reload()
    }
  }
}

const Client = {
  all: [
    {
      name: "Amostra 1",
      email: "amostra1@amostra1.com",
      cpforcnpj: "99999999999",
      tel: 9999999999,
      address: "Amostra end 1",
      number: 500,
      cep: 11111111,
      district: "Amostra bairro 1",
      city: "Amostra cidade 1",
      uf: "SP"
    },
    {
      name: "Amostra 2",
      email: "amostra2@amostra2.com",
      cpforcnpj: "99999999999",
      tel: 9999999999,
      address: "Amostra end 2",
      number: 574,
      cep: 22222222,
      district: "Amostra bairro 2",
      city: "Amostra cidade 2",
      uf: "MG"
    }
  ],
  add(client) {
    Client.all.push(client)
    dom.addNewNotification("Cliente adicionado com sucesso!", "blue")
    setTimeout(function () { dom.clearNotification() }, 3000);
  },

  remove(index) {
    Client.all.splice(index, 1)
    dom.addStyleBtn()
    App.reload()
    dom.addStyleBtn(false)
    List.isShow = false
    dom.addNewNotification("Cliente excluído com sucesso!", "blue")
    setTimeout(function () { dom.clearNotification() }, 3000);
  },

  search(cpforcnpj) {
    let isSuccess = false;
    dom.clearNotification()
    for (var i = 0; i < Client.all.length; i++) {
      if (Client.all[i].cpforcnpj == cpforcnpj) {
        isSuccess = true
        if (List.isShow == true) {
          List.show()
        }
        dom.addNewClient(Client.all[i], i)
        break
      }
    }
    if (isSuccess == false) {
      dom.addNewNotification("Cliente não encontrado", "red")
      setTimeout(function () { dom.clearNotification() }, 3000);
    }
  }

}

const Search = {
  search: document.querySelector("input#search"),

  getValue() {
    return Search.search.value
  },

  formatValue() {
    return Search.getValue()
  },

  submit(event) {
    event.preventDefault()
    App.reload()
    List.isShow = false;
    try {
      const cpforcnpj = Search.formatValue()
      dom.addStyleBtn(false)
      Client.search(cpforcnpj)
    } catch (err) {
      alert(err.message)
    }
  }

}

const dom = {
  clientNewContainer: document.querySelector('.box'),
  notificationContainer: document.querySelector('.notification-container'),
  btnList: document.querySelector('#btn-list'),

  addStyleBtn(isOpen) {
    if (isOpen) {
      dom.btnList.classList.add('open')
    } else {
      dom.btnList.classList.remove('open')
    }
  },

  addNewNotification(text, color) {
    const div = document.createElement('div')
    div.innerHTML = dom.innerHTMLNotification(text)
    div.id = "notification"
    div.style.color = color
    dom.notificationContainer.appendChild(div)
  },

  addNewClient(client, index) {
    const div = document.createElement('div')
    div.innerHTML = dom.innerHTMLNewClient(client, index)
    dom.clientNewContainer.appendChild(div)
  },

  innerHTMLNotification(text) {
    const html = `
      <span>${text}</span>
    `
    return html
  },

  innerHTMLNewClient(client, index) {
    const html = `
      <div class="row">
        <div class="row-main">
          <p>Nome: ${client.name}</p>
          <p>Telefone: ${client.tel}</p>
          <p>CPF/CNPJ: ${client.cpforcnpj}</p>
          <button id="trash"  data-tooltip="Excluir" onClick="Client.remove(${index})"><i class="fa fa-trash"></i></button>
          <label class="item" id="eye" for=${client.cpforcnpj}><i  data-tooltip="Mostrar Mais" class="fa fa-eye"></i></label>
        </div>
      </div>
      <input type="checkbox" id=${client.cpforcnpj}>
      <div id="row-second">
        <div class="row">
          <p>Endereço: ${client.address}</p>
          <p>Número: ${client.number}</p>
        </div>
        <div class="row">
          <p>CEP: ${client.cep}</p>
          <p>Bairro: ${client.district}</p>
          <p>Cidade: ${client.city}</p>
        </div>
        <div class="row">
          <p>Email: ${client.email}</p>
        </div>
      </div>
    `
    return html
  },

  clearClients() {
    dom.clientNewContainer.innerHTML = ""
  },

  clearNotification() {
    dom.notificationContainer.innerHTML = ""
  }
}

const Form = {
  name: document.querySelector("input#name"),
  email: document.querySelector("input#email"),
  cpforcnpj: document.querySelector("input#cpforcnpj"),
  tel: document.querySelector("input#tel"),
  address: document.querySelector("input#address"),
  number: document.querySelector("input#number"),
  cep: document.querySelector("input#cep"),
  district: document.querySelector("input#district"),
  city: document.querySelector("input#city"),
  uf: document.querySelector("input#uf"),

  getValues() {
    return {
      name: Form.name.value,
      email: Form.email.value,
      cpforcnpj: Form.cpforcnpj.value,
      tel: Form.tel.value,
      address: Form.address.value,
      number: Form.number.value,
      cep: Form.cep.value,
      district: Form.district.value,
      city: Form.city.value,
      uf: Form.uf.value,
    }
  },

  validateFields() {
    const { name, email, cpforcnpj, tel, address, number, cep, district, city, uf } = Form.getValues()
    if (
      name.trim() === "" || email.trim() === "" ||
      tel.trim() === "" || cpforcnpj.trim() === "" ||
      address.trim() === "" || number.trim() === "" ||
      cep.trim() === "" || district.trim() === "" ||
      city.trim() === "" || uf.trim() === "") {
      throw new Error("Preencha todos os campos!")
    }
  },

  formatValues() {
    let { name, email, tel, cpforcnpj, address, number, cep, district, city, uf } = Form.getValues()
    return {
      name,
      email,
      tel,
      cpforcnpj,
      address,
      number,
      cep,
      district,
      city,
      uf
    }
  },

  clearFields() {
    Form.name.value = ""
    Form.email.value = ""
    Form.tel.value = ""
    Form.cpforcnpj.value = ""
    Form.address.value = ""
    Form.number.value = ""
    Form.cep.value = ""
    Form.district.value = ""
    Form.city.value = ""
    Form.uf.value = ""
  },

  submit(event) {
    event.preventDefault()
    try {
      Form.validateFields()
      const client = Form.formatValues()
      Client.add(client)
      Form.clearFields()
      Modal.close()
    } catch (err) {
      alert(err.message)
    }
  }
}

const App = {
  reload() {
    dom.clearClients()
  }
}