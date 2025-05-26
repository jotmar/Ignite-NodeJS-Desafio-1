/* Dados que devem estar presentes na requisição POST e PUT */
export function validateJSON(json, dataSchema) {
  const keys = dataSchema
  const jsonKeys = Object.keys(json)

  /* Valida se o JSON tem as 2 propriedades */

  if (keys.length != jsonKeys.length) {
    return false
  }

  /* Valida se as propriedades presentes no JSON são as mesmas do dataSchema */

  for (let key of keys) {
    if (!json.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
