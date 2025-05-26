import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { Database } from './db/database.js'
import { validateJSON } from './utils/validate-json.js'

const db = new Database()
const dataSchema = ['title', 'description']

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.writeHead(200).end(JSON.stringify(db.select('tasks')))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      if (req.body && validateJSON(req.body, dataSchema)) {
        const data = { id: randomUUID(), ...req.body }
        db.insert('tasks', data)
        return res.writeHead(201).end('Content Created')
      } else {
        return req.body
          ? res.writeHead(400).end('Invalid data was sent!')
          : res.writeHead(400).end('No data was sent!')
      }
    }
  }
]
