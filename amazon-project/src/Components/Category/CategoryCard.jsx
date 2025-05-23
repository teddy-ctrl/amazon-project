// import React from 'react';

// const CategoryCard = ({ data }) => { 
//   return (
//     <div>
//       <h3>{data.title}</h3>
//       <img src={data.imgLink} alt={data.title} />
//       <p>shop now</p>
//     </div>
//   );
// };

// export default CategoryCard;




// import React from 'react';
// import styles from './CategoryCard.module.css'; 
// import { Link } from 'react-router-dom';

// const CategoryCard = ({ data }) => {
//   if (!data) {
//     return <p>No category data provided.</p>;
//   }


//   return (
//     <Link to={`/category/${data.name || 'unknown'}`} className={styles.card}> {/* Apply .card style to the <a> tag */}
//       <h3 className={styles.cardTitle}>{data.title}</h3>
      
//       {data.imgLink ? (
//         <img
//           src={data.imgLink}
//           alt={data.title} 
//           className={styles.cardImage} 
//           onError={(e) => {
//             console.error("Image load error for:", data.imgLink, e);
//             e.target.alt = `Failed to load: ${data.title}`;
           
//           }}
//         />
//       ) : (
//         <div className={styles.cardImage} >
//           No image
//         </div>
//       )}
      
//       <p className={styles.shopNowLink}>Shop now</p> 
//     </Link>
//   );
// };

// export default CategoryCard;




// ./CategoryCard.js
import React from 'react';
import styles from './CategoryCard.module.css';
import { Link } from 'react-router-dom'; // Assuming you have react-router-dom installed

const CategoryCard = ({ data }) => {
  if (!data) {
    // It's better to return null or a minimal placeholder if data is truly missing,
    // rather than rendering a card that says "no data provided" within the grid.
    // Or, ensure `categoryInfos` always provides valid objects.
    return null; // Or <div className={styles.cardError}>No data</div>
  }

  const categoryName = data.name || data.title?.toLowerCase().replace(/\s+/g, '-') || 'unknown';

  return (
    // Using <article> for each card as it's a self-contained piece of content
    // The Link component will render an <a> tag
    <Link to={`/category/${categoryName}`} className={styles.card} aria-label={`Shop ${data.title}`}>
      <h3 className={styles.cardTitle}>{data.title || 'Untitled Category'}</h3>
      
      <div className={styles.cardImageContainer}> {/* Added container */}
        {data.imgLink ? (
          <img
            src={data.imgLink}
            alt={data.title || 'Category image'} // Ensure alt text is descriptive
            className={styles.cardImage}
            loading="lazy" // Good for performance
            onError={(e) => {
              console.error("Image load error for:", data.imgLink, e);
              // Optionally, replace src with a placeholder image or hide the img tag
              e.target.style.display = 'none'; // Hide broken image
              // Or show a placeholder text inside the container:
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