import React from "react"

export default function Paginado({ gamePerPage, N_Games, paginado }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(N_Games / gamePerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="numeropaginado">
            {pageNumbers?.map(number => (
                <div key={number}>
                    <button className="button" onClick={() => paginado(number)}>{number}</button>
                </div>
            ))}
        </div>
    )
}