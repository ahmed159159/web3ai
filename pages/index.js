import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Product Search</h1>
      <input 
        type="text" 
        placeholder="اكتب اسم المنتج" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px", marginLeft: "10px" }}>
        ابحث
      </button>

      {loading && <p>جاري البحث...</p>}

      <div style={{ marginTop: "20px" }}>
        {results.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
