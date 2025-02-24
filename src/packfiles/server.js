const { exec } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

const port = 4201;

// Définir le chemin des fichiers statiques
const publicSrc = path.join(__dirname, "public");
const publicDest = path.join(process.cwd(), "public");

// Vérifier si `public/` existe après empaquetage, sinon le copier
if (!fs.existsSync(publicDest)) {
    fs.copySync(publicSrc, publicDest);
    console.log("📂 Fichiers copiés vers :", publicDest);
}

// Lancer http-server avec le bon chemin
const command = `npx http-server "${publicDest}" -p ${port} -o`;

console.log(`🚀 Démarrage du serveur sur http://localhost:${port}...`);

const serverProcess = exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error(`❌ Erreur: ${err.message}`);
        return;
    }
    console.log(stdout);
});

setTimeout(() => {
    console.log("🛑 Arrêt du serveur...");
    serverProcess.kill();
    process.exit(0);
}, 3000);