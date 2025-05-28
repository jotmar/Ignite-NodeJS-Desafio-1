import fs from 'node:fs/promises'
import { timeStamp } from '../utils/timeStamp.js'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
  #database = {}

  /* Verifica se o arquivo do banco de dados existe, se não existir
  utiliza o #persist para cria-lo */

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
        this.#persist()
      })
      .catch(err => {
        this.#persist()
      })
  }

  /* Persiste os dados no banco de dados */

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  /* Selecionando e Filtrando Dados */

  select(table, search) {
    let data = this.#database[table] ?? []
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  /* Criando Dados  */

  insert(table, data) {
    let db = this.#database
    /* Verificando se a table já existe no banco de dados */

    if (Array.isArray(db[table])) {
      db[table].push(data)
    } else {
      db[table] = [data]
    }
    this.#persist()
  }

  update(table, data, id) {
    let db = this.#database
    const dataIndex = db[table].findIndex(element => {
      return element.id == id
    })

    if (dataIndex === -1) {
      return null
    }

    const updatedData = { ...db[table][dataIndex] }
    updatedData.title = data.title
    updatedData.description = data.description
    updatedData.updated_at = data.updated_at

    db[table][dataIndex] = updatedData

    this.#persist()

    return dataIndex === -1 ? false : true
  }

  patch(table, id) {
    let db = this.#database
    const dataIndex = this.#database[table].findIndex(element => {
      return element.id === id
    })
    const updatedData = { ...db[table][dataIndex] }
    updatedData.completed_at = timeStamp()

    db[table][dataIndex] = updatedData

    this.#persist()

    return dataIndex === -1 ? false : true
  }

  delete(table, id) {
    let db = this.#database
    const dataIndex = db[table].findIndex(element => {
      return element.id == id
    })

    if (dataIndex != -1) {
      db[table].splice(dataIndex, 1)
    }

    this.#persist()

    return dataIndex === -1 ? false : true
  }
}
