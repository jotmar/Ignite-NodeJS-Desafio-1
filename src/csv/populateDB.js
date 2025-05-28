import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvFile = new URL('data.csv', import.meta.url).pathname

async function populateDB() {
  const buffer = []
  const parser = fs.createReadStream(csvFile).pipe(parse({}))

  for await (const chunk of parser) {
    buffer.push(chunk)
  }

  /* Removendo o header do arquivo CSV */

  buffer.splice(0, 1)

  /* Fazendo as requisições para cada task do arquivo CSV */

  for (const data of buffer) {
    const bodyData = { title: data[0], description: data[1] }

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(bodyData)
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

populateDB()
