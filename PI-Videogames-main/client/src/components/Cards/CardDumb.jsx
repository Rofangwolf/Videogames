import React from "react";
import { Link } from "react-router-dom"

export default function CardVideogame({ name, image, genres, id }) {
    return (
        <Link to={`/videogames/${id}`}>
            <div className="carddumb">
                <h2>{name}</h2>
                <img src={image} alt="IMAGE NOT FOUND" width='300px' height='200px' />
                <h3>{ genres?.map(e => e).join(' - ')}</h3>
            </div>
        </Link>
    )
}