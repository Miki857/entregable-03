import React from 'react'
import './pagination.css'

const Pagination = ({page, setPage, totalPages}) => {
    const handlePageNext = (value) => {
        if(value != totalPages){
            if(value != -totalPages){
                if(page + value <= totalPages && page + value >= 1){
                    setPage(page + value);
                }
            }else{
                setPage(1);
            }
        }else{
            setPage(totalPages);
        }
    }
    return (
        <div className='pagination__container'>
            <button className='page-btn' onClick={() => handlePageNext(-totalPages)}>{"<<"}</button>
            <button className='page-btn' onClick={() => handlePageNext(-1)}>{"<"}</button>
            <span>{page} / {totalPages}</span>
            <button className='page-btn' onClick={() => handlePageNext(1)}>{">"}</button>
            <button className='page-btn' onClick={() => handlePageNext(totalPages)}>{">>"}</button>
        </div>
    )
}

export default Pagination