import React from "react";
import './comment.scss'

const Comment = (movie_id, episode_data) => {





    return (
        <>
            <p>Bình luận</p>
            <div id="binh_luan">
                <div id="nhap_bl">
                    <i className="fa-solid fa-user"></i>{' '}
                    <textarea placeholder="Thêm bình luận..." />
                </div>
            </div>
        </>
    )
}
export default Comment;