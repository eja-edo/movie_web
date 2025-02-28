import React, {useEffect, useState} from "react";
import "./sort.scss";
import {useSearchParams} from "react-router-dom";

const SortDropdown = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOption, setSelectedOption] = useState(searchParams.get("order_by") || "");

    useEffect(() => {
        setSelectedOption(searchParams.get("order_by") || "");
    }, [searchParams]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        searchParams.set("order_by", newValue);
        setSearchParams(searchParams);
    };

    return (
        <div className="sort">
            <label htmlFor="sort-select" className="sort__label">
                Sắp xếp theo:
            </label>
            <select id="sort-select" className="sort__select" value={selectedOption} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;
