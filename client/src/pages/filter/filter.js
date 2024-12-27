import React from "react";
import { useParams } from "react-router-dom";
import './filter.scss';


function Filter() {
    const { listFilm } = useParams()
    console.log(listFilm)
}
export default Filter;