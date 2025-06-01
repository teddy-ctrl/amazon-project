import React from 'react'
import {categoryInfos} from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import styles from './CategoryCard.module.css'

const Category = () => {
  return (
    <section className={styles.categorySection}>
      {
        categoryInfos.map((infos) => {
            return <CategoryCard data={infos} key={infos.name} /> 
        })
      }
    </section>
  )
}

export default Category