export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", width: "300px" }}>
      <img src={product.image} alt={product.title} width="100%" />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        اشتري الآن
      </a>
    </div>
  );
}
