export default function handler(req, res) {
  const mockResults = [
    { title: "Samsung 50\" TV", price: "$999", image: "https://via.placeholder.com/150", link: "#" },
    { title: "LG 50\" TV", price: "$950", image: "https://via.placeholder.com/150", link: "#" }
  ];
  res.status(200).json(mockResults);
}
