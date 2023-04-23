const express = require('express')
const app = express()
const uploadUser = require('./middlewares/uploadImages')

app.post("/upload-image", uploadUser.single('image'), async(req, res) => {
    
    if(req.file){
        return res.json({
            erro: false,
            mensagem: "Upload realizado com sucesso!"
        }) 
    }

    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Upload não realizado"
    }) 
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})