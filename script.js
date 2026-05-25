async function processarApp(acao) {
    const promptInput = document.getElementById('promptInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const loader = document.getElementById('loader');

    if (!promptInput.trim()) {
        alert('Por favor, digite uma descrição ou o código que deseja melhorar!');
        return;
    }

    // Mostra o loader e limpa o resultado anterior
    loader.style.display = 'block';
    resultadoDiv.innerText = 'Pensando...';

    try {
        // Faz a requisição para a Serverless Function da Vercel
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt: promptInput,
                acao: acao // 'gerar' ou 'melhorar'
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Exibe a resposta do Gemini
            resultadoDiv.innerText = data.resultado;
        } else {
            resultadoDiv.innerText = `Erro: ${data.error || 'Erro ao processar requisição.'}`;
        }

    } catch (error) {
        console.error('Erro na comunicação:', error);
        resultadoDiv.innerText = 'Erro ao conectar com o servidor.';
    } finally {
        // Esconde o loader
        loader.style.display = 'none';
    }
}
