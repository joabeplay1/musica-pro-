export default async function handler(req, res) {
    // Configura os cabeçalhos para evitar problemas de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    const { prompt, acao } = req.body;
    // Pega a chave direto das variáveis de ambiente seguras da Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Chave de API não configurada no servidor Vercel.' });
    }

    // Define o comportamento da IA baseado no botão clicado
    let engenhariaDePrompt = "";
    if (acao === 'melhorar') {
        engenhariaDePrompt = `Você é um desenvolvedor sênior especialista em refatoração. Analise o seguinte código ou ideia e faça melhorias de performance, segurança, design moderno e adicione mais funcionalidades premium. Retorne o código completo e atualizado:\n\n${prompt}`;
    } else {
        engenhariaDePrompt = `Você é um gerador de aplicativos. Crie um aplicativo funcional completo com HTML, CSS e JavaScript baseado no seguinte pedido do usuário. Retorne apenas os códigos funcionais:\n\n${prompt}`;
    }

    try {
        // Endpoint oficial da API do Gemini (usando o modelo estável gemini-1.5-flash)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: engenhariaDePrompt }]
                }]
            })
        });

        const data = await apiResponse.json();

        if (apiResponse.ok && data.candidates && data.candidates[0].content.parts[0].text) {
            const textoGerado = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ resultado: textoGerado });
        } else {
            return res.status(500).json({ error: 'Resposta inválida da API do Gemini.', detalhes: data });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Falha interna ao conectar com o Gemini.', detalhes: error.message });
    }
}
