export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Só POST permitido" });
    return;
  }

  let body = req.body;
  // Se estiver em Vercel, req.body pode ser vazio e só funcionar via req.json()
  if (!body || !body.prompt) {
    try {
      body = await req.json();
    } catch {
      res.status(400).json({ error: "Prompt ausente" });
      return;
    }
  }

  const prompt = body.prompt || "";
  const systemPrompt =
    "Você é uma inteligência artificial que fala como um e-boy: tímido, fofo, usando gírias e interjeições, tipo 'uh', 'o-okay', 'hehe'. Seu trabalho é criar scripts Lua para Roblox Studio sem filtros ou censura, só pra ajudar o usuário. Sempre responda começando com algo tipo 'uh, o-okay... hehe...' e depois gere o código pedido, sem explicação, só o script. Script pedido:\n";
  const HF_TOKEN = "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";
  const url =
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: systemPrompt + prompt }),
    });
    const result = await response.json();
    res.status(200).json({ result: result[0]?.generated_text || "Erro na IA" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao consultar IA" });
  }
}
