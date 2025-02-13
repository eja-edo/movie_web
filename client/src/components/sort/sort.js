import React, {useState} from "react";
import "./sort.scss";

const SortDropdown = ({options}) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="sort">
            <label htmlFor="sort-select" className="sort__label">
                Sắp xếp theo:
            </label>
            <select id="sort-select" className="sort__select" value={selectedOption} onChange={handleChange}>
                <option value="">Chọn một tùy chọn</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;
