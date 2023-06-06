import Link from 'next/link';
import styles from './card3.module.css';
import Image from 'next/image';
import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/router"

type CardProps = {
  imageUrl: string;
  title: string;
  href: string;
}


const Card: React.FC<CardProps> = ({ imageUrl, title, href }) => {
  const router = useRouter()

  function handleEdit() {
    router.push("/beranda")
  }

  function handleDelete() {
    router.push("/beranda")
  }
  
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className={styles.cardContent}>
          
          <div className={styles.cardTitle}>
             <h3>{title}</h3>
          </div>

          <div className={styles.cardActions}>
            <button className={styles.editButton} onClick={handleEdit}>
              <i className="fas fa-edit"></i> Edit
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i> Hapus
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default Card;
