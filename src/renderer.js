const { exec } = require('child_process');

function abrirJogo(nomeRom) {
  exec(`emulator/mame.exe ${nomeRom}`, (erro) => {
    if (erro) {
      console.log("Erro ao abrir jogo");
    }
  });
}

window.abrirJogo = abrirJogo;
