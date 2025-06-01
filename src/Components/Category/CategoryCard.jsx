
import React from 'react';
import styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom'; 

const CategoryCard = ({ data }) => {
  if (!data) {
    
    return null;
  }

  const categoryName = data.name || data.title?.toLowerCase().replace(/\s+/g, '-') || 'unknown';

  return (
    
    <Link to={`/category/${categoryName}`} className={styles.card} aria-label={`Shop ${data.title}`}>
      <h3 className={styles.cardTitle}>{data.title || 'Untitled Category'}</h3>
      
      <div className={styles.cardImageContainer}> 
        {data.imgLink ? (
          <img
            src={data.imgLink}
            alt={data.title || 'Category image'}
            className={styles.cardImage}
            loading="lazy" 
            onError={(e) => {
              console.error("Image load error for:", data.imgLink, e);
              e.target.style.display = 'none'; 
              const parent = e.target.parentElement;
              if (parent && !parent.querySelector(`.${styles.noImagePlaceholder}`)) {
                const placeholder = document.createElement('p');
                placeholder.textContent = `Image not available for ${data.title || 'this category'}`;
                placeholder.className = styles.noImagePlaceholder;
                parent.appendChild(placeholder);
              }
            }}
          />
        ) : (
          // Placeholder for when no imgLink is provided
          <p className={styles.noImagePlaceholder}>No image available</p>
        )}
      </div>
      
      <span className={styles.shopNowLink}>Shop now</span>
    </Link>
  );
};

export default CategoryCard;