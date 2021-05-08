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
    if (List.isShow) {
      App.reload()
      Client.all.forEach(dom.addNewClient)
    } else {
      App.reload()
    }
  }
}

const Client = {
  all: [],
  add(client) {
    Client.all.push(client)
    List.show()
    alert("Cliente Adicionado com Sucesso!")
  },

  remove(index) {
    Client.all.splice(index, 1)
    App.reload()
    List.isShow = false
    alert("Cliente Excluido com Sucesso!")
  },

  search(cpforcnpj) {
    for (var i = 0; i < Client.all.length; i++) {
      if (Client.all[i].cpforcnpj == cpforcnpj) {
        if (List.isShow == true) {
          List.show()
        }
        dom.addNewClient(Client.all[i], i)
        break
      }
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
      Client.search(cpforcnpj)
    } catch (err) {
      alert(err.message)
    }
  }

}

const dom = {
  clientNewContainer: document.querySelector('.box'),

  addNewClient(client, index) {
    const div = document.createElement('div')
    div.innerHTML = dom.innerHTMLNewClient(client, index)
    dom.clientNewContainer.appendChild(div)
  },

  innerHTMLNewClient(client, index) {
    const html = `
      <div class="row">
        <div class="row-main">
          <p>Nome: ${client.name}</p>
          <p>Telefone: ${client.tel}</p>
          <p>CPF/CNPJ: ${client.cpforcnpj}</p>
          <button id="trash" onClick="Client.remove(${index})"><i class="fa fa-trash"></i></button>
          <label class="item" id="eye" for=${client.cpforcnpj}><i class="fa fa-eye"></i></label>
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

  clearTable() {
    dom.clientNewContainer.innerHTML = ""
  },
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
    dom.clearTable()
  }
}