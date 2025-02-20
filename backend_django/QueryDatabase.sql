-- Xóa bảng phụ thuộc trước (có ràng buộc FOREIGN KEY)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS watchlists CASCADE;
DROP TABLE IF EXISTS movieActors CASCADE;
DROP TABLE IF EXISTS movieDirectors CASCADE;
DROP TABLE IF EXISTS episodes CASCADE;
DROP TABLE IF EXISTS banners CASCADE;
DROP TABLE IF EXISTS codeMonopoly CASCADE;
DROP TABLE IF EXISTS movieGenres CASCADE;

-- Xóa bảng thông tin độc lập
DROP TABLE IF EXISTS actors CASCADE;
DROP TABLE IF EXISTS directors CASCADE;
DROP TABLE IF EXISTS codes CASCADE;
DROP TABLE IF EXISTS news CASCADE;

-- Xóa bảng phụ thuộc liên quan đến người dùng
DROP TABLE IF EXISTS profile_user CASCADE;

-- Xóa bảng cha cuối cùng
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS nations CASCADE;
DROP TABLE IF EXISTS monopolys CASCADE;


--Bảng quốc gia
CREATE TABLE nations(
	nation_id serial Primary key,
	name varchar(50) unique
);


-- Bảng thể loại phim
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) unique,
	description text
);

--Bảng độc quyền
CREATE TABLE monopolys (
    monopoly_id SERIAL PRIMARY KEY,       -- ID độc quyền
    name VARCHAR(100) unique NOT NULL,           -- Tên loại độc quyền
    description TEXT                      -- Mô tả chi tiết
);


-- Bảng phim
CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(155) unique,
    description TEXT,
    release_date TIMESTAMP DEFAULT NOW(),
    runtime INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    rating FLOAT DEFAULT 0,
	monopoly_id int,
	nation_id int,
    views BIGINT DEFAULT 0,
	foreign key (nation_id) references nations(nation_id) on delete set null,
	foreign key (monopoly_id) references Monopolys(monopoly_id) on delete set null
);

--Bảng liên kết movies và genres
create table movieGenres(
	movie_id int,
	genre_id int,
	primary key(movie_id, genre_id),
	foreign key (movie_id) references movies(movie_id) ON DELETE CASCADE,
	foreign key (genre_id) references genres(genre_id) ON DELETE CASCADE
);


-- Bảng banner
CREATE TABLE banners (
    banner_id SERIAL PRIMARY KEY,
    movie_id INT,
    url_banner VARCHAR(255),
    title VARCHAR(255) NOT NULL unique,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE default current_date,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Bảng tập phim
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    movie_id INT,
    episode_number VARCHAR(15),
    description TEXT,
    runtime INT,
    release_date TIMESTAMP DEFAULT NOW(),
    url_video VARCHAR(255),
    CONSTRAINT unique_episode UNIQUE (movie_id, episode_number),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Bảng diễn viên
CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) unique,
    profile_url VARCHAR(255)
);

-- Bảng đạo diễn
CREATE TABLE directors (
    director_id SERIAL PRIMARY KEY,
    name VARCHAR(100) unique,
    profile_url VARCHAR(255)
);

-- Liên kết phim và diễn viên
CREATE TABLE movieActors (
    movie_id INT,
    actor_id INT,
    role VARCHAR(100) DEFAULT 'Diễn viên',
	primary key(movie_id, actor_id, role),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors(actor_id) ON DELETE CASCADE
);

-- Liên kết phim và đạo diễn
CREATE TABLE movieDirectors (
    movie_id INT,
    director_id INT,
	primary key(movie_id,director_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (director_id) REFERENCES directors(director_id) ON DELETE CASCADE
);

-- Bảng thông tin người dùng
CREATE TABLE profile_user (
    id INT NOT NULL PRIMARY KEY,
    DateOfBirth DATE,
    sex VARCHAR(10),
    country VARCHAR(30),
    idNumber CHAR(15),
    url_img VARCHAR(255),
    FOREIGN KEY (id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- Bảng đánh giá phim
CREATE TABLE reviews (
    movie_id INT,
    user_id INT,
    PRIMARY KEY(movie_id, user_id),
    rating FLOAT CHECK(rating >= 0 AND rating <= 5),
    comment TEXT,
    create_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES profile_user(id) ON DELETE CASCADE
);

-- Bảng danh sách theo dõi
CREATE TABLE watchlists (
    view_id SERIAL PRIMARY KEY,
    user_id INT,
    movie_id INT,
    watch_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES profile_user(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Bảng bình luận
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    episode_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES profile_user(id) ON DELETE CASCADE
);

CREATE TABLE codes (
    code_id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
	description text,  
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(), -- Ngày tạo mã
    expired_at TIMESTAMP	             -- Ngày hết hạn của mã
);

CREATE TABLE codeMonopoly (
    code_id INT NOT NULL,               -- Liên kết đến bảng codes
    monopoly_id INT NOT NULL,           -- Liên kết đến bảng Monopolys
    FOREIGN KEY (code_id) REFERENCES codes(code_id) ON DELETE CASCADE,
    FOREIGN KEY (monopoly_id) REFERENCES Monopolys(monopoly_id) ON DELETE CASCADE,
	primary key(code_id,monopoly_id)
);

CREATE TABLE news (
    news_id SERIAL PRIMARY KEY,                -- Mã tin tức (auto-increment)
    title VARCHAR(255) NOT NULL,                -- Tiêu đề bài viết
    content_url varchar(255),                     -- Nội dung bài viết 
	main_content text,							-- Nội dụng chính của bài viết
    image_url VARCHAR(255),                    -- URL của hình ảnh đại diện (nếu có)
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Ngày đăng tin tức
    is_active BOOLEAN DEFAULT TRUE,            -- Trạng thái bài viết (hiển thị hay không)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo bài viết
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian cập nhật bài viết
    CONSTRAINT check_title_length CHECK (length(title) > 0)  -- Ràng buộc để tiêu đề không trống
);

-- CREATE TABLE notifications (
--     notification_id SERIAL PRIMARY KEY,        -- Mã thông báo (auto-increment)
--     user_id INT,                              -- ID người nhận thông báo
--     title VARCHAR(255),                        -- Tiêu đề của thông báo
--     content TEXT NOT NULL,                     -- Nội dung thông báo
--     status VARCHAR(50) DEFAULT 'unread',       -- Trạng thái thông báo (unread hoặc read)
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo thông báo
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian cập nhật thông báo
--     is_active BOOLEAN DEFAULT TRUE,            -- Trạng thái hoạt động của thông báo (hiển thị hay không)
--     FOREIGN KEY (user_id) REFERENCES profile_user(id),  -- Liên kết đến bảng người dùng
--     CONSTRAINT check_title_length CHECK (length(title) > 0)  -- Ràng buộc tiêu đề không trống
-- );

SELECT m.movie_id, m.title, m.description, m.release_date, m.runtime, m.poster_url, m.trailer_url, m.rating, m.views, g.name
FROM movies m
JOIN movieGenres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
WHERE g.genre_id = 1;


SELECT genres.genre_id, genres.name, SUM(movies.views) AS total_views
FROM genres
JOIN moviegenres ON genres.genre_id = moviegenres.genre_id
JOIN movies ON moviegenres.movie_id = movies.movie_id
GROUP BY genres.genre_id
ORDER BY total_views DESC
LIMIT 5;

CREATE TABLE news (
    news_id SERIAL PRIMARY KEY,                -- Mã tin tức (auto-increment)
    title VARCHAR(255) NOT NULL,                -- Tiêu đề bài viết
    content_url varchar(255),                     -- Nội dung bài viết 
	main_content text,							-- Nội dụng chính của bài viết
    image_url VARCHAR(255),                    -- URL của hình ảnh đại diện (nếu có)
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Ngày đăng tin tức
    is_active BOOLEAN DEFAULT TRUE,            -- Trạng thái bài viết (hiển thị hay không)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian tạo bài viết
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Thời gian cập nhật bài viết
    CO`NSTRAINT check_title_length CHECK (length(title) > 0)  -- Ràng buộc để tiêu đề không trống
);
INSERT INTO news (title, content_url, main_content, image_url, publish_date, is_active) 
VALUES 
('"Lấy Danh Nghĩa Người Nhà" bản Hàn: Cuộc gặp gỡ của 3 nhóc tì không hoàn hảo', 'static/assets/docx/familybychoice/familybychoice.html', 
 'Tập 1 "Family By Choice" ("Lấy Danh Nghĩa Người Nhà" bản Hàn) kể về hoàn cảnh gặp gỡ của 3 "nhóc tì" Yoon Joo Won (Jung Chae Yeon), 
 Kang Hae Joon (Bae Hyun Sung), Kim San Ha (Hwang In Yeop). Ba đứa trẻ có những vết thương lòng khác nhau trở nên thân thiết vì hoàn cảnh đưa đẩy. .', 
 'static/assets/docx/familybychoice/images/image1.jpg', '2025-02-20 10:00:00', TRUE),

('Phim hoạt hình “Flow”: Không lời nhưng gây kinh ngạc bởi thông điệp sâu sắc',
'static/assets/docx/flow/flow.html', 
 'Cuộc phiêu lưu xuôi dòng nước của một chú mèo đen cùng bè bạn trong bộ phim hoạt hình không lời “Flow” đã gây 
 kinh ngạc cho những ai thưởng thức bởi sự tinh tế và vẻ đẹp như thơ.', 
 'static/assets/docx/flow/images/image1.jpg', '2025-02-19 15:30:00', TRUE),

('Jisoo tái xuất màn ảnh gây chú ý',
'static/assets/docx/jisoo/jisoo.html', 
 'Với Newtopia vừa phát sóng, Jisoo tiếp tục là tâm điểm khi tái ngộ khán giả 
 với tư cách diễn viên.', 
 'static/assets/docx/jisoo/images/image1.jpg', '2025-02-19 15:30:00', TRUE),

('Choi Woo Sik, Park Bo Young ngọt ngào hết cỡ trong Melo Movie',
'static/assets/docx/melo_movie1/melo_movie1.html', 
 'Ra mắt đúng dịp Valentine, Melo Movie mang đến những thước phim đầy 
 ngọt ngào về câu chuyện tình yêu, ước mơ và hoài bão của tuổi trẻ.', 
 'static/assets/docx/melo_movie1/images/image2.jpg', '2025-02-19 15:30:00', TRUE),

('Melo Movie: Nhẹ nhàng, chữa lành với Choi Woo Shik - Park Bo Young ngọt dịu',
'static/assets/docx/melo2/melo2.html', 
 'Choi Woo Shik và Park Bo Young vừa nên duyên với nhau trong "Melo Movie".
 Quy tụ dàn sao hạng A và được chấp bút bởi biên kịch Lee Na Eun, người từng làm nên thành công của "Our Beloved Summer",
 tựa phim lãng mạn này có xứng đáng với kỳ vọng của khán giả?.', 
 'static/assets/docx/melo2/images/image3.jpg', '2025-02-19 15:30:00', TRUE),

(''Na Tra 2' khuynh đảo phòng vé quốc tế',
'static/assets/docx/natra2/na_tra2.html', 
 '"Na Tra: Ma đồng náo hải" của Trung Quốc vào top 5 doanh thu phòng vé Bắc Mỹ sau ba ngày ra mắt, 
 được giới chuyên môn khuyến khích tranh Oscar 2026.', 
 'static/assets/docx/natra2/images/image2.jpg', '2025-02-19 15:30:00', TRUE),
 
('Ngược Dòng Cuộc Đời gây tranh cãi: Người đồng cảm, người nói phim "quá hồng"',
'static/assets/docx/nguoc_dong_thoi_gian/nguoc_dong_thoi_gian.html', 
 'Khi công chiếu ở Trung Quốc, “Upstream” (Ngược Dòng Cuộc Đời) đã gây ra làn sóng tranh cãi.
 Người đồng cảm và khen phim hay, nhưng cũng có người nói phim quá “tô hồng”.', 
 'static/assets/docx/nguoc_dong_thoi_gian/images/image1.jpg', '2025-02-19 15:30:00', TRUE),
 
('Phim Hàn tháng 10: “Lấy Danh Nghĩa Người Nhà” bản Hàn sẽ tạo nên cơn sốt mới?',
'static/assets/docx/phimhan/phimhan.html', 
 'Trong danh sách các phim truyền hình Hàn Quốc lên sóng trong tháng 10, 
 “Family By Choice” là bộ phim duy nhất là tác phẩm remake. Dù vậy, 
 phim vẫn thu hút nhiều sự chú
 ý từ đông đảo khán giả bởi sự thành công của bản gốc “Lấy Danh Nghĩa Người Nhà”.', 
 'static/assets/docx/phimhan/images/image3.jpg', '2025-02-19 15:30:00', TRUE),
 
('Điện ảnh Việt đầu năm 2025: Hai phim trăm tỷ nhưng chất lượng không tương xứng',
'static/assets/docx/phimviet/phimviet.html', 
 'Trong ba phim chiếu rạp dịp Tết Nguyên đán 2025, hai tác phẩm "Bộ Tứ Báo Thủ" 
 và "Nụ Hôn Bạc Tỷ" đều thắng trên đường đua phòng vé với doanh thu trăm tỷ. 
 Tuy nhiên, chất lượng về nội dung và diễn xuất lại không được đánh giá cao.', 
 'static/assets/docx/phimviet/images/image4.jpg', '2025-02-19 15:30:00', TRUE),

 ('Rosie - Rosé BLACKPINK: Cuốn nhật ký thanh xuân ghi lại mọi cung bậc tình yêu',
'static/assets/docx/rosie/Rosie.html', 
 'Chính thức "thả xích" một trong những album được mong đợi 
 nhất nhì năm 2024, Rosé đã thành công thỏa mãn trái tim người hâm mộ bởi những ca khúc 
 mang đậm dấu ấn cá nhân và những thông điệp đong đầy cảm xúc về tình yêu.', 
 'static/assets/docx/rosie/images/image1.jpg', '2025-02-19 15:30:00', TRUE),

 ('Tiệm Ăn Của Quỷ - phim kinh dị Việt có gì hấp dẫn mà chiếm lĩnh Top 1 Netflix?',
'static/assets/docx/tiem_an_cua_quy/tiem_an_cua_quy.html', 
 'Bộ phim kinh dị "Tiệm Ăn Của Quỷ" đứng vị trí 
 số 1 xu hướng phim dài tập của Netflix Việt Nam nhờ nội dung và diễn xuất cuốn hút.', 
 'static/assets/docx/tiem_an_cua_quy/images/image1.jpg', '2025-02-19 15:30:00', TRUE),

  ('When the phone rings hạ màn với kết thúc viên mãn',
'static/assets/docx/wtpring/wtpring.html', 
 'Sau 2 tháng thổn thức cùng các nhân vật 
 trong phim When the phone rings, khán giả thở phào với cái kết viên mãn.', 
 'static/assets/docx/wtpring/images/image1.jpg', '2025-02-19 15:30:00', TRUE),

