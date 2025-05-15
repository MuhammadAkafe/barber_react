import React from 'react'

function Pagnation(
    {
        current_page,
        numberofpages,
        handlePageChange
    }:
    {
        current_page: number,
        numberofpages: number,
        handlePageChange: (page: number) => void
    }
):React.JSX.Element {
  return (
    <ul className="pagination">
    <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
      <button 
        className="page-link" 
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page === 1}
      >
        הקודם
      </button>
    </li>
    {[...Array(numberofpages)].map((_, index) => (
      <li key={index + 1} className={`page-item ${current_page === index + 1 ? 'active' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}
    
    <li className={`page-item ${current_page === numberofpages ? 'disabled' : ''}`}>
      <button 
        className="page-link" 
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page === numberofpages}
      >
        הבא
      </button>
    </li>
  </ul>
  )
}

export default Pagnation