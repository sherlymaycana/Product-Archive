import axios from "axios";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk error handling

  // Fungsi untuk mengambil data dari API menggunakan axios
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products"); // Panggil API
      setProducts(response.data.products); // Simpan data produk di state
    } catch (err) {
      setError(err.message); // Tangkap error jika ada
    } finally {
      setLoading(false); // Matikan loading indicator di akhir proses
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // Render indikator loading, error, atau list produk
  if (loading) return <p>Loading...</p>; // Tampilkan indikator loading
  if (error) return <p>Error: {error}</p>; // Tampilkan pesan error

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "150px", height: "150px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
