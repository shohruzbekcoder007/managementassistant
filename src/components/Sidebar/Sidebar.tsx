import React from 'react'
import styles from './Sidebar.module.scss'
import { Divider, Logo, NavListItem } from '../../ui'
import { TbReportSearch } from "react-icons/tb";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
            <Logo />
        </div>
        <div className={styles.sidebarNavList}>
          <ul>
            {[1,2,3,4,5,6,7,8,9,10].map(item => {
              return <li key={item}><NavListItem href="/" active={item === 1} icon={<TbReportSearch />}><span>Reports</span></NavListItem></li>
            })}
          </ul>
        </div>
        <div className={styles.sidebarFooter}>
            <Divider margin="0 15px"/>
            <p>salom</p>
        </div>
    </div>
  )
}

export default Sidebar