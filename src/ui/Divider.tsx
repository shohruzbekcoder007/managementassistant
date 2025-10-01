import React from 'react'
import styles from './uiStyles.module.scss'

type Props = {
    margin?: string
}

const Divider: React.FC<Props> = ({margin}) => {
    return (
        <div style={{margin: margin}}>
            <div className={styles.divider}></div>
        </div>
    )
}

export default Divider