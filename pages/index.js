import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const mockResults = [
      { title: "Samsung 50\" TV", price: "$999", image: "https://via.placeholder.com/150", link: "#" },
      { title: "LG 50\" TV", price: "$950", image: "https://via.placeholder.com/150", link: "#" }
    ];
    setResults(mockResults);
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

      <div style={{ marginTop: "20px" }}>
        {results.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
