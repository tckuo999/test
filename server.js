const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API 端點：執行 PowerShell 指令
app.post("/run-powershell", (req, res) => {
    const { command } = req.body;

    if (!command) {
        return res.status(400).json({ error: "請提供 PowerShell 指令。" });
    }

    exec(`powershell.exe -Command "${command}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行於 http://localhost:${PORT}`);
});
