import Link from 'next/link';
import styles from './card2.module.css';
import Image from 'next/image';
import React from 'react';
type CardProps = {
  imageUrl: string;
  title: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, href }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={styles.cardContent}>
        <Image src={imageUrl} width={44.5} height={40.875} alt='logo' className={styles.image}/>
        <h3 className={styles.cardTitle}>{title}</h3>
      </a>
    </Link>
  );
}

export default Card;
