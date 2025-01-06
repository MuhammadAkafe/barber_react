import React from 'react'
import styles from './Loading.module.css';

interface LoadingProps {
    loading: boolean;
  }

function Loading({loading}:LoadingProps) {
  return (
    <div className={styles.submit}>
    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </div>
  )
}

export default Loading