import React, { useState, useRef, useEffect } from "react";
import './showdisplay.scss'
import { useNavigate } from "react-router-dom";
const ShowDisplay = () => {
    const navigate = useNavigate()
    const [showIndex, setShowIndex] = useState(0);
    const showDisplayListRef = useRef(null);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowIndex((prevIndex) => (prevIndex >= 2 ? 0 : prevIndex + 1));
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (showDisplayListRef.current) {
            showDisplayListRef.current.style.transform = `translateX(-${showIndex * 98}%)`;
        }
    }, [showIndex]);



    return (
        <div className="display_show" id="show1">
            <button className="back" onClick={() => setShowIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="next" onClick={() => setShowIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex))}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className="show_display_list" ref={showDisplayListRef}>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                    <img src="http://127.0.0.1:8000/static/assets/img/9ex8qx1n_7nam_hb_web_2388_458.jpg" alt="" />
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                    <img
                        src="http://127.0.0.1:8000/static/assets/img/au1qvk6a_homebanner_khanhdunienweb_2388x3712_2388_458.jpg"
                        alt=""
                    />
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                    <img
                        src="http://127.0.0.1:8000/static/assets/img/kmmab8k0_web18ce19a0c0167a03a57e2b4bd93f5dd15_2388_458.jpg"
                        alt=""
                    />
                </a>
            </div>
        </div>)
}

export default ShowDisplay;