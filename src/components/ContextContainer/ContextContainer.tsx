import React from 'react'
import styles from './ContextContainer.module.scss'

type Props = {
    children: React.ReactNode
}

const ContextContainer: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.contextContainer}>
        {children}
    </div>
  )
}

export default ContextContainer