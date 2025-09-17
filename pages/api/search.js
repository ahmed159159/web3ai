import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.body;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    // مباشرة نستخدم استعلام المستخدم
    const searchQuery = query;
    console.log("Search Query sent to SerpApi:", searchQuery);

    // SerpApi - البحث عن المنتجات
    const serpResponse = await fetch(
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(searchQuery)}&api_key=4d38783f124c02ac4ec09d27f0ba167868a59bb750405d5ad28076a66e4c41`
    );

    const serpData = await serpResponse.json();

    // تحويل النتائج للعرض في الموقع
    const products = serpData.shopping_results?.map(p => ({
      title: p.title,
      price: p.price,
      image: p.thumbnail,
      link: p.link
    })) || [];

    res.status(200).json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
