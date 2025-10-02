import React from 'react';
import { GiHotMeal } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { Container, Text } from '@mantine/core';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/', label: 'Search' },
  { link: '/gallery', label: 'Gallery' },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = links.map((link) => {
    const isActive = location.pathname === link.link;
    return (
      <Link
        key={link.label}
        to={link.link}
        className={`${styles.link} ${isActive ? styles.active : ''}`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={styles.header}>
      <Container size="md" className={styles.inner}>
        <GiHotMeal className={styles.icon}  onClick={() => navigate('/')}/>
        <Text className={styles.title} onClick={() => navigate('/')}>Food Finder</Text>

        <nav className={styles.links} aria-label="Main navigation">
          {items}
        </nav>
      </Container>
    
    </header>
  );
}

export default Header;
