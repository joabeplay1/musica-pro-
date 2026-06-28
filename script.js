<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI App Builder Pro</title>
    <style>
        :root {
            --bg-principal: #0f172a;
            --bg-card: #1e293b;
            --texto: #f8fafc;
            --texto-secundario: #94a3b8;
            --primaria: #6366f1;
            --primaria-hover: #4f46e5;
            --borda: #334155;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--bg-principal);
            color: var(--texto);
            padding: 20px;
            display: flex;
            flex-direction: column;
            height: 100vh;
            gap: 20px;
        }

        header {
            text-align: center;
            margin-bottom: 10px;
        }

        header h1 {
            font-size: 24px;
            color: var(--texto);
        }

        header p {
            color: var(--texto-secundario);
            font-size: 14px;
        }

        /* Painel de Input */
        .input-panel {
            background: var(--bg-card);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid var(--borda);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .api-group {
            display: flex;
            gap: 10px;
        }

        .api-group input {
            flex: 1;
            padding: 10px;
            background: #0f172a;
            border: 1px solid var(--borda);
            border-radius: 6px;
            color: #fff;
        }

        textarea {
            width: 100%;
            height: 80px;
            padding: 12px;
            background: #0f172a;
            border: 1px solid var(--borda);
            border-radius: 8px;
            color: var(--texto);
            font-size: 14px;
            resize: vertical;
        }

        button {
            background: var(--primaria);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background: var(--primaria-hover);
        }

        button:disabled {
            background: #475569;
            cursor: not-allowed;
        }

        /* Status Log */
        .status-log {
            font-size: 13px;
            color: #38bdf8;
            font-family: monospace;
            min-height: 20px;
        }

        /* Container de Resultados (Lado a Lado) */
        .result-container {
            display: flex;
            gap: 20px;
            flex: 1;
            min-height: 250px;
        }

        .panel-box {
            width: 50%;
            background: var(--bg-card);
            border: 1px solid var(--borda);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel-box h2 {
            font-size: 14px;
            padding: 10px 15px;
            background: #111827;
            border-bottom: 1px solid var(--borda);
            color: var(--texto-secundario);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        pre {
            padding: 15px;
            overflow: auto;
            flex: 1;
            font-family: 'Consolas', monospace;
            font-size: 12px;
            background: #0b0f19;
            color: #e2e8f0;
            white-space: pre-wrap;
        }

        /* Preview Area */
        .preview-container {
            background: var(--bg-card);
            border: 1px solid var(--borda);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            height: 400px;
            overflow: hidden;
        }

        .preview-container h2 {
            font-size: 14px;
            padding: 10px 15px;
            background: #111827;
            border-bottom: 1px solid var(--borda);
            color: var(--texto-secundario);
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: white;
        }
    </style>
</head>
<body>

    <header>
        <h1>AI App Builder Pro</h1>
        <p>Arquitetura de Dois Motores: Especificação Avançada & Geração de Código</p>
    </header>

    <div class="input-panel">
        <div class="api-group">
            <input type="password" id="apiKeyInput" placeholder="Insira sua Gemini API Key aqui para testar">
        </div>
        <textarea id="ideaInput" placeholder="Ex: Um app de lista de tarefas (To-Do) com modo escuro, contador de tarefas concluídas e efeito de confete ao terminar..."></textarea>
        <button id="buildBtn" onclick="generateApp()">Criar Aplicativo</button>
        <div id="statusLog" class="status-log">Pronto para iniciar.</div>
    </div>

    <div class="result-container">
        <div class="panel-box">
            <h2>[Motor 1] Especificação Técnica Gerada</h2>
            <pre id="generatedPrompt">A especificação detalhada da arquitetura aparecerá aqui...</pre>
        </div>

        <div class="panel-box">
            <h2>[Motor 2] Código-Fonte (HTML/CSS/JS)</h2>
            <pre id="generatedCode">O código limpo gerado pela IA aparecerá aqui...</pre>
        </div>
    </div>

    <div class="preview-container">
        <h2>Visualização em Tempo Real (Iframe Sandbox)</h2>
        <iframe id="preview" sandbox="allow-scripts"></iframe>
    </div>

    <script>
        // Função utilitária para atualizar o feedback visual do usuário
        function log(message) {
            document.getElementById('statusLog').innerText = `⚡ Status: ${message}`;
        }

        // MOTOR 1: O Arquiteto & Engenheiro de Prompt integrado
        async function generatePrompt(userIdea) {
            log("Motor 1 Ativado: Criando especificação técnica detalhada...");
            
            // Simula o comportamento do Agente 1 (Architect) + Agente 2 (Prompt Engineer)
            // Criando uma super especificação estruturada baseada na ideia crua do usuário
            let technicalPrompt = `
Você é um Arquiteto de Software e Engenheiro de Prompt Sênior. 
Transforme a ideia do usuário em uma especificação técnica perfeita para um desenvolvedor Frontend.

Ideia do Usuário: "${userIdea}"

Gere uma especificação estruturada contendo:
1. OBJETIVO DO APP: O que ele faz.
2. REQUISITOS DE INTERFACE: Cores modernas (escuras/claras balanceadas), espaçamentos (padding/gap), bordas arredondadas, design limpo e responsivo.
3. FLUXO DE COMPORTAMENTO (JS): Quais funções dinâmicas devem existir (ex: cliques, manipulação de estado, persistência local se necessário).
4. REQUISITOS DE ENTREGA: O código deve vir em um ARQUIVO ÚNICO contendo HTML, CSS (em tag <style>) e JavaScript (em tag <script>). Não use bibliotecas externas a menos que seja estritamente necessário (como FontAwesome por CDN).

Retorne APENAS a especificação técnica detalhada em texto corrido ou markdown.
`;
            return technicalPrompt;
        }

        // MOTOR 2: O Gerador de Código realizando a chamada de IA real
        async function generateCode(technicalSpecification, apiKey) {
            log("Motor 2 Ativado: Escrevendo e depurando o código final...");

            // Endpoint oficial da API do Google Gemini (utilizando o modelo estável gemini-1.5-flash)
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const promptSistema = `Você é um Code Generator e Debugger IA especializado em construir aplicações Single Page (SPA) funcionais e lindas. 
Escreva APENAS o código puro (HTML, CSS e JS tudo junto no mesmo arquivo). 
Importante: Não use blocos de código com markdown (como \`\`\`html) na sua resposta. Retorne diretamente o código começando com <!DOCTYPE html>. 
Garanta que o código seja interativo, moderno e livre de erros.`;

            const payload = {
                contents: [{
                    parts: [{ text: `${promptSistema}\n\nSiga estritamente esta especificação técnica para criar o app:\n${technicalSpecification}` }]
                }]
            };

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "Erro na comunicação com a API do Gemini.");
            }

            const data = await response.json();
            let rawCode = data.candidates[0].content.parts[0].text;

            // Limpeza de segurança caso a IA use blocos de código markdown mesmo com as instruções
            rawCode = rawCode.replace(/```html/g, "").replace(/```/g, "").trim();

            return rawCode;
        }

        // Orquestrador do Fluxo Completo
        async function generateApp() {
            const idea = document.getElementById("ideaInput").value.trim();
            const apiKey = document.getElementById("apiKeyInput").value.trim();
            const buildBtn = document.getElementById("buildBtn");

            if (!idea) {
                alert("Por favor, descreva a ideia do seu aplicativo antes de gerar!");
                return;
            }

            if (!apiKey) {
                alert("Por favor, insira sua chave de API do Gemini para testar o envio real.");
                return;
            }

            // Bloqueia botão para evitar duplo clique
            buildBtn.disabled = true;

            try {
                // 1. Executa Motor 1 (Geração da Especificação Avançada)
                const promptGerado = await generatePrompt(idea);
                document.getElementById("generatedPrompt").textContent = promptGerado;

                // 2. Executa Motor 2 (Geração e Limpeza do Código via API)
                const codigoGerado = await generateCode(promptGerado, apiKey);
                document.getElementById("generatedCode").textContent = codigoGerado;

                // 3. Renderiza no Preview (Iframe)
                log("Renderizando a aplicação no Preview...");
                const iframe = document.getElementById("preview");
                iframe.srcdoc = codigoGerado;

                log("Aplicativo criado com sucesso! 🎉");

            } catch (error) {
                console.error(error);
                log(`Erro no processo: ${error.message}`);
                alert(`Ocorreu um erro: ${error.message}\nVerifique sua API Key ou sua conexão.`);
            } finally {
                buildBtn.disabled = false;
            }
        }
    </script>
</body>
</html>
