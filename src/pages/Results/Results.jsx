

// CategoryPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../Components/Product/products.json";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import LayOut from "../../Components/LayOut/LayOut";
import { Rating } from "@mui/material";

const createCategorySlug = (name) => {
  if (!name) return "unknown";
  return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
};

const getUniqueCategories = (products) => {
  const allCategories = products.map((p) => p.category).filter(Boolean);
  return [...new Set(allCategories)].sort();
};

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // The rest of your data filtering logic is solid and remains unchanged
  const uniqueCategories = getUniqueCategories(productsData);
  const filteredProducts = productsData.filter(
    (product) =>
      product.category && createCategorySlug(product.category) === categorySlug
  );
  const categoryName =
    filteredProducts.length > 0
      ? filteredProducts[0].category
      : categorySlug.replace(/-/g, " ");

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LayOut>
      <div className={styles.pageWrapper}>
        <header className={styles.headerContainer}>
          <p className={styles.resultsText}>
            1-{Math.min(endIndex, filteredProducts.length)} of over{" "}
            {filteredProducts.length} results for{" "}
            <strong>"{categoryName}"</strong>
          </p>
          <div className={styles.headerBottomRow}>
            <h1>Results</h1>
            <div className={styles.sortDropdown}>
              <select>
                <option>Sort by: Featured</option>
                <option>Sort by: Price: Low to High</option>
                <option>Sort by: Price: High to Low</option>
                <option>Sort by: Avg. Customer Review</option>
              </select>
            </div>
          </div>
        </header>

        <div className={styles.mainLayout}>
          <aside className={styles.leftSidebar}>
            {/* Sidebar content is already well-structured */}
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Department</h3>
              <ul className={styles.filterList}>
                {uniqueCategories.map((cat) => {
                  const isActive = createCategorySlug(cat) === categorySlug;
                  return (
                    <li
                      key={cat}
                      className={isActive ? styles.activeFilter : ""}
                    >
                      {" "}
                      <Link to={`/category/${createCategorySlug(cat)}`}>
                        {cat}
                      </Link>{" "}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>Avg. Customer Review</h3>
              <ul className={styles.ratingList}>
                {[4, 3, 2, 1].map((star) => (
                  <li key={star}>
                    <a href="#" className={styles.ratingLink}>
                      <Rating
                        name="read-only"
                        value={star}
                        readOnly
                        size="small"
                      />
                      <span className={styles.ratingText}>& Up</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className={styles.rightContent}>
            <div className={styles.productGrid}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderAdd={true}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination}>
                <button
                  className={`${styles.pageButton} ${
                    currentPage === 1 ? styles.disabledButton : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹ Previous
                </button>
                <span className={styles.currentPageText}>
                  {" "}
                  Page {currentPage}{" "}
                </span>
                <button
                  className={`${styles.pageButton} ${
                    currentPage === totalPages ? styles.disabledButton : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next ›
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
    </LayOut>
  );
};

export default CategoryPage;
