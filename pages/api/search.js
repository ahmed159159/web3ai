import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.body;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    // 1️⃣ Fireworks AI - تحليل استعلام المستخدم
    const fwResponse = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer fw_3Zkp2hChwvVakVxN5WzkwF8m"
      },
      body: JSON.stringify({
        model: "accounts/ahmed159/deployedModels/dobby-unhinged-llama-3-3-70b-new-bjqkuv2k",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Find Amazon/ecommerce products for: ${query}`
          }
        ]
      })
    });

    const fwData = await fwResponse.json();
    const searchQuery = fwData.choices?.[0]?.message?.content || query;

    // 2️⃣ SerpApi - البحث عن المنتجات
    const serpResponse = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(searchQuery)}&api_key=4d38783f124c02ac4ec09d27f0ba167868a59bb750405d5ad28076c9a66e4c41`
    );

    const serpData = await serpResponse.json();
    const products = serpData.shopping_results?.map(p => ({
      title: p.title,
      price: p.price,
      image: p.thumbnail,
      link: p.link
    })) || [];

    res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
