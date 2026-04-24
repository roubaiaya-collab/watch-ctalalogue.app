import React, { useEffect, useState } from "react";
import styles from "./WatchProductList.module.css";

const fallbackProducts = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: 12499.99,
    description: "A timeless diver watch with bold luminous markers and reliable automatic movement.",
    image: "https://images.unsplash.com/photo-1518546305927-c0f326a1950c?auto=format&fit=crop&w=900&q=80",
    strap: "Stainless steel",
    category: "Diver",
  },
  {
    id: 2,
    name: "Omega Speedmaster",
    price: 9999.99,
    description: "Legendary chronograph with a classic black dial, built for precision and endurance.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    strap: "Leather",
    category: "Chronograph",
  },
  {
    id: 3,
    name: "Tag Heuer Carrera",
    price: 6899.0,
    description: "Modern racing-inspired watch with a clean layout and striking contrast details.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    strap: "Rubber",
    category: "Sport",
  },
  {
    id: 4,
    name: "Cartier Santos",
    price: 7999.0,
    description: "Elegant square-case dress watch with soft curves and a polished bracelet.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    strap: "Leather",
    category: "Dress",
  },
];

export default function WatchProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : fallbackProducts);
      } catch (fetchError) {
        console.warn("WatchProductList: falling back to local data", fetchError);
        setProducts(fallbackProducts);
        setError("Unable to load products from the database. Displaying fallback catalogue.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Watch Catalogue</h2>
        <p>Browse all stored watches with the same premium card styling as the add product form.</p>
      </div>

      {error && <div className={styles.alert}>{error}</div>}

      {loading ? (
        <div className={styles.emptyState}>
          <strong>Loading watch products…</strong>
          <span>Please wait while we fetch the latest catalogue.</span>
        </div>
      ) : products.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>No watches found</strong>
          <span>There are currently no products stored in the database.</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productBody}>
                <div className={styles.productHeader}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                </div>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productMeta}>
                  <span className={styles.metaItem}>
                    <strong className={styles.metaLabel}>Category:</strong> {product.category}
                  </span>
                  <span className={styles.metaItem}>
                    <strong className={styles.metaLabel}>Strap:</strong> {product.strap}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
