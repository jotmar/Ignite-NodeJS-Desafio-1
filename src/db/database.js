import fs from 'node:fs/promises'

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

  select(table) {
    return this.#database[table]
  }

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
}
