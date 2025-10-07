import React from 'react'
import styles from './uiStyles.module.scss'
import { Link } from 'react-router-dom';

type NavListItemProps = {
    children: React.ReactNode
    icon?: React.ReactNode;
    active?: boolean;
    href: string
}

const NavListItem: React.FC<NavListItemProps> = ({ children, icon, active, href }) => {
  return (
    <Link to={href}  className={`${styles.navListItem} ${active && styles.active}`}>
      <div>{icon}</div> <div>{children}</div>
    </Link>
  )
}

export default NavListItem