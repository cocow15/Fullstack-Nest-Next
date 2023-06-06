import Link from 'next/link';
import styles from './card.module.css';
import Image from 'next/image';
import React from 'react';
type CardProps = {
  imageUrl: string;
  title: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, href }) => {
  return (
    <>
      <a className={styles.card}>
        <Image src={imageUrl} width={156} height={127} alt='logo' className={styles.image}/>
        <h3 className={styles.cardTitle}>{title}</h3>
      </a>
    </>
  );
}

export default Card;
