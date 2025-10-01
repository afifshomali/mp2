import React from 'react';
import styles from './DetailPage.module.css';
import { useParams } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <h1>Detail Page</h1>
      <p>Showing details for item with id: {id}</p>
    </div>
  );
}

export default DetailPage;