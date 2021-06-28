const express = require('express')
const { spawn, exec } = require('child_process')
const { stdout, stderr } = require('process')

const app = express()
const PORT = 4545

const stopPython = () => {
    exec('killall python3', (err, stdout, stderr) => {
        console.log(`Reply \n${err}\n${stdout}\n${stderr}`)
    })
}

const startWebServer = () => {
    const pythonWebServer = exec("cd web; python3 -m http.server 5000")
    pythonWebServer.stderr.on("data", (data) => {
        console.log(`Temp Server Err ${data}`)        
    })
}

const startPythonReader = () => {
    const pythonScript = spawn('python3', ["reader.py"])
    pythonScript.stderr.on("data", (data) => {
        console.log(`Temp Reader Err ${data}`)        
    })
}

app.get("/restart", (req, res) => {
    stopPython();
    startPythonReader();
    app.send({"successRestart": true})
})

app.get("/stop", (req, res) => {
    stopPython();
    app.send({"successStop": true})
})

app.get("/start_reader", (req, res) => {
    startPythonReader();
    app.send({"successStartPythonReader": true})
})

app.get("/start_server", (req, res) => {
    startWebServer();
    app.send({"successStartWebServer": true})
})

app.listen(PORT, () => console.log(`Temp Controller Server listening on ${PORT}`))