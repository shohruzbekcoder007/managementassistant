import React from 'react'
import styles from './Main.module.scss'
import { Sidebar } from '../../components/Sidebar'
import { ContextContainer } from '../../components/ContextContainer'

const Main: React.FC = () => {
  return (
    <div className={styles.wrapper}>
        <Sidebar />
        <ContextContainer>
            <p>salom</p>
        </ContextContainer>
    </div>
  )
}

export default Main