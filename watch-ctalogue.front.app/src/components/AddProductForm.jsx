import React, { useState } from "react";
import styles from "./AddProductForm.module.css";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter the watch name.";
    }

    if (!form.price.trim()) {
      newErrors.price = "Please enter the price.";
    } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Please enter the description.";
    }

    if (!form.image.trim()) {
      newErrors.image = "Please enter the image URL.";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(form.image.trim())) {
      newErrors.image = "Please enter a valid image URL ending in jpg, png, gif, or webp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Add Watch Product</h1>
          <p>Fill in the details below to add a new watch to the catalogue.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
              <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Rolex Submariner"
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
            />
            {errors.name && (
              <div className={styles.errorMessage}>
                <span>⚠️</span> {errors.name}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price
              <span className={styles.required}>*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g., 5999.99"
              className={`${styles.input} ${errors.price ? styles.error : ""}`}
            />
            {errors.price && (
              <div className={styles.errorMessage}>
                <span>⚠️</span> {errors.price}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
              <span className={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the watch features, materials, and specifications..."
              className={`${styles.textarea} ${errors.description ? styles.error : ""}`}
            />
            {errors.description && (
              <div className={styles.errorMessage}>
                <span>⚠️</span> {errors.description}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>
              Image URL
              <span className={styles.required}>*</span>
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/watch.jpg"
              className={`${styles.input} ${errors.image ? styles.error : ""}`}
            />
            {errors.image && (
              <div className={styles.errorMessage}>
                <span>⚠️</span> {errors.image}
              </div>
            )}
          </div>

          <button type="submit" className={styles.button}>
            Add Watch to Catalogue
          </button>
        </form>

        {submitted && (
          <div className={styles.successCard}>
            <h2>✓ Watch Added Successfully</h2>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Price:</strong> ${Number(form.price).toFixed(2)}
            </p>
            <p>
              <strong>Description:</strong> {form.description}
            </p>

            <div className={styles.imagePreviewSection}>
              <strong className={styles.imagePreviewLabel}>Image Preview:</strong>
              <img src={form.image} alt={form.name} className={styles.imagePreview} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
