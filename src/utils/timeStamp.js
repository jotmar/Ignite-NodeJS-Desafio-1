/* Criando a função para conseguir as datas */

export function timeStamp() {
  const date = new Date()
  const day = String(date.getDay()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())
  const hour = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year}|${hour}:${minutes}`
}
