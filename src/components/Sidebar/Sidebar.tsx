import React from 'react'
import styles from './Sidebar.module.scss'
import { Divider, Logo } from '../../ui'

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
            <Logo />
        </div>
        <div className={styles.sidebarNavList}>
            {[1,2,3,4,5,6,7,8,9,10].map(item => <p key={item}>{item}</p>)}
            {[1,2,3,4,5,6,7,8,9,10].map(item => <p key={item}>{item}</p>)}
            {[1,2,3,4,5,6,7,8,9,10].map(item => <p key={item}>{item}</p>)}
            {[1,2,3,4,5,6,7,8,9,10].map(item => <p key={item}>{item}</p>)}
        </div>
        <div className={styles.sidebarFooter}>
            <Divider margin="0 15px"/>
            <p>salom</p>
        </div>
    </div>
  )
}

export default Sidebar