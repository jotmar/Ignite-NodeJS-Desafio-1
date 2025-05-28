import { timeStamp } from './utils/timeStamp.js'
import { randomUUID } from 'node:crypto'
import { Database } from './db/database.js'
import { validateJSON } from './utils/validate-json.js'
import { buildRoutePath } from './utils/buildRoute.js'
import path from 'node:path'

const db = new Database()
const dataSchema = ['title', 'description']

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const users = db.select(
        'tasks',
        search
          ? {
              title: search,
              description: search
            }
          : null
      )

      return res.writeHead(200).end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (req.body && validateJSON(req.body, dataSchema)) {
        const data = {
          id: randomUUID(),
          ...req.body,
          completed_at: null,
          created_at: timeStamp(),
          updated_at: timeStamp()
        }

        db.insert('tasks', data)

        return res.writeHead(201).end('Content Created')
      } else {
        return req.body
          ? res.writeHead(400).end('Invalid data was sent!')
          : res.writeHead(400).end('No data was sent!')
      }
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      if (req.body && validateJSON(req.body, dataSchema)) {
        const { id } = req.params
        const data = { ...req.body, updated_at: timeStamp() }
        db.update('tasks', data, id)
        return res.writeHead(204).end()
      } else {
        return req.body
          ? res.writeHead(400).end('Invalid data was sent')
          : res.writeHead(400).end('No data was sent!')
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      db.delete('tasks', id)
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      db.patch('tasks', id)
      return res.writeHead(204).end()
    }
  }
]
