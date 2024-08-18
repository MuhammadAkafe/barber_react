import React from 'react'
import styles from "./NoPage.module.css"
function NoPage() {

    return (
        <>
            <div className={`${styles.container}`}>
                <h1 className={`${styles.header}`}>Page not found 404</h1>
                <p className={`${styles.text}`}>Oops! The page you're looking for doesn't exist.</p>
            </div>
        </>
    )
}

export default NoPage

