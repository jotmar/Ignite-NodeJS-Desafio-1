export async function json(req, res) {
  const buffer = []

  /* Tratando os dados recebidos da requisição e transformando em JSON */

  for await (let chunk of req) {
    buffer.push(chunk)
  }

  /* Verificar se existem dados na requisição e direciona-los para o req.body */

  try {
    req.body = JSON.parse(String(Buffer.concat(buffer)))
    console.log(req.body)
  } catch {
    req.body = null
  }

  /* Todo conteúdo enviado pelo servidor será em JSON */

  res.setHeader('Content-type', 'application/json')
}
