import React from 'react'
import styles from './Loading.module.css';


interface LoadingProps {
  loading: boolean;
  error: null | string;
}


function Loading({ loading, error }: LoadingProps) {

  return (
    <>
      <div className={styles.submit}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : 'Submit'}
        </button>
      </div>
      
      <div className={styles.message}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : null
        }
      </div>
    </>
  )
}

export default Loading