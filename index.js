const http = require('http')
const porta = 443
const formidavel = require('formidable')

const fs = require('fs')


const servidor = http.createServer((req, res) => {
  if (req.url != '/enviodearquivo') {
    res.writeHead(200, { 'Content-type': 'text/html'})
    res.write('<h1> Atividade Aula 3 </h1>')
    res.write('<h2> Envio de arquivo</h2>')
    res.write('<style type="text/css"> body {background-color: #F8F8F8; color: #5c8b5c;} </style>');

          
    res.write('<form action = "enviodearquivo" method= "post" enctype = "multipart/form-data">')
    res.write('<input type = "file" name = "filetoupload"><br>')
    res.write('<input type = "submit" value = "Enviar">')
    res.write('</form>')
    return res.end()
  }
  else {
    const form = new formidavel.IncomingForm()
    form.parse(req, (erro, campos, arquivos) => {
      const urlAntiga = arquivos.filetoupload.filepath
      const urlNova = './enviodearquivo/' + arquivos.filetoupload.originalFilename
      var rawData = fs.readFileSync(urlAntiga)
      fs.writeFile(urlNova, rawData, function(err) {
        if (err) console.log(err)
        res.write("Arquivo enviado com sucesso!")
        res.end()
      })
    })
 }
})
function listarArquivos(diretorio, arquivos) {
  if (!arquivos)
    arquivos = []
  let listagemArquivos = fs.readdirSync(diretorio)
  console.log(listagemArquivos)
}
servidor.listen(porta, () => { console.log('Servidor rodando') })