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



