import React from 'react'
export default function PostsPagination(props) {
  const pages = [];

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
      pages.push(i)
    }

    return (

    <div className='PaginationList'>
        {pages.map((page, index) => {
          return(<button key={index} onClick={() => {props.setCurrentPage(page)}} id={page === props.currentPage ? 'PaginationActive' : ''}> {page} </button>)
        })}
    </div>

  )
}
