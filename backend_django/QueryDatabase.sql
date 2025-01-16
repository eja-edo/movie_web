CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(155),
    description TEXT,
    release_date TIMESTAMP DEFAULT NOW(),
    runtime INT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    rating FLOAT DEFAULT 0,
    genre_id INT,
    views BIGINT DEFAULT 0,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    movie_id INT,
    episode_number VARCHAR(15),
    description TEXT,
    runtime INT,
    release_date TIMESTAMP DEFAULT NOW(),
    url_video VARCHAR(255),
    CONSTRAINT constraint_name UNIQUE (movie_id, episode_number),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    profile_url VARCHAR(255)
);

CREATE TABLE directors (
    director_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    profile_url VARCHAR(255)
);

CREATE TABLE movieActors (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    actor_id INT,
    role VARCHAR(100),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (actor_id) REFERENCES actors(actor_id)
);

CREATE TABLE movieDirectors (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    director_id INT,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (director_id) REFERENCES directors(director_id)
);

CREATE TABLE profile_user (
    id INT NOT NULL PRIMARY KEY,
    DateOfBirth DATE,
    sex VARCHAR(10),
    country VARCHAR(30),
    idNumber CHAR(15),
    url_img VARCHAR(255),
    FOREIGN KEY (id) REFERENCES auth_user(id)
);

CREATE TABLE reviews (
    movie_id INT,
    user_id INT,
    PRIMARY KEY(movie_id, user_id),
    rating FLOAT CHECK(rating >= 0 AND rating <= 5),
    comment TEXT,
    create_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES profile_user(id),
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE watchlists (
    view_id SERIAL PRIMARY KEY,
    user_id INT,
    movie_id INT,
    watch_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES profile_user(id),
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    episode_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id),
    FOREIGN KEY (user_id) REFERENCES profile_user(id)
);



-- Chèn dữ liệu mẫu vào bảng genres và movies
INSERT INTO genres (name) VALUES
('Phim kinh dị'),
('Phim tình cảm trung quốc'),
('Phim hoạt hình'),
('TV show hài'),
('Phim tâm lý'),
('Phim tình cảm'),
('Phim hành động'),
('Phim phiêu lưu thám hiểm');

INSERT INTO movies (title, description, runtime, poster_url, trailer_url, genre_id, views) VALUES
('Kỵ sĩ cưỡi rồng', 'Vì thung lũng nơi bộ tộc của mình sinh sống bị loài người phá hủy, chú rồng bạc Firedrake xung phong đi tìm vành đai thiên đường-thánh địa bí ẩn của loài rồng.', 90, 'http://127.0.0.1:8000/static/assets/img/kysicuoirong.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (11).mp4', 3, 100),
('Doraemon', 'Không thấy vui vẻ khi nhận nhiệm vụ giúp đỡ Nobita nhưng sau nhiều năm gắn bó, chú mèo máy thông minh Doraemon đã trở thành người bạn thân thiết của cậu', 90, 'http://127.0.0.1:8000/static/assets/img/doraemondoibanthan.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (2).mp4', 3, 100),
('Harry Potter 1', 'Harry Potter phát hiện ra cậu là phù thủy và được mời đến trường Hogwarts để học phép thuật. Nơi đây là thế giới hoàn toàn mới lạ với cậu. Cậu phải học cách thích nghi và cậu nhanh chóng nhận ra không phải mọi phù thủy đều đáng tin cậy.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter3.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (5).mp4', 3, 100),
('Harry Potter 2', 'Câu chuyện xảy ra khi Harry bước vào năm thứ hai ở trường phép thuật. Trên tường của hành lang xuất hiện một loạt các tin nhắn, cảnh báo về việc phòng chứa bí mật đã được mở ra và người thừa kế của Slytherin sẽ sát hại những học sinh máu bù.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter5.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (7).mp4', 3, 100);



INSERT INTO movies (title, description, runtime, poster_url, trailer_url, genre_id, views) VALUES
('Kỵ sĩ cưỡi rồng', 'Vì thung lũng nơi bộ tộc của mình sinh sống bị loài người phá hủy, chú rồng bạc Firedrake xung phong đi tìm vành đai thiên đường-thánh địa bí ẩn của loài rồng.', 90, 'http://127.0.0.1:8000/static/assets/img/kysicuoirong.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (11).mp4', 3, 100), ('Doraemon', 'Không thấy vui vẻ khi nhận nhiệm vụ giúp đỡ Nobita nhưng sau nhiều năm gắn bó, chú mèo máy thông minh Doraemon đã trở thành người bạn thân thiết của cậu', 90, 'http://127.0.0.1:8000/static/assets/img/doraemondoibanthan.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (2).mp4', 3, 100), ('Harry Potter 1', 'Harry Potter phát hiện ra cậu là phù thủy và được mời đến trường Hogwarts để học phép thuật. Nơi đây là thế giới hoàn toàn mới lạ với cậu. Cậu phải học cách thích nghi và cậu nhanh chóng nhận ra không phải mọi phù thủy đều đáng tin cậy.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter3.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (5).mp4', 3, 100), ('Harry Potter 2', 'Câu chuyện xảy ra khi Harry bước vào năm thứ hai ở trường phép thuật. Trên tường của hành lang xuất hiện một loạt các tin nhắn, cảnh báo về việc phòng chứa bí mật đã được mở ra và người thừa kế của Slytherin sẽ sát hạt những học sinh Máu bù.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter5.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (7).mp4', 3, 100), ('Harry Potter 3', 'Harry, Ron cùng Hermione trở lại và trở thành thiếu niên trong học kỳ thứ ba tại trường Phù thủy và Pháp sư Hogwarts. Họ phải đối mặt với kẻ thù nguy hiểm.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter4.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (6).mp4', 3, 100), ('Harry Potter 4', 'Một cuộc thi tài năng được tổ chức giữa 3 trường pháp thuật. Chiếc Cốc Lửa lựa chọn người vào tranh tài trong trận chung kết... không phải ai khác chính là Harry Potter.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter1.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (3).mp4', 3, 100), ('Harry Potter 5', 'Một mùa hè đã qua kể từ khi Harry chạm trán Chúa Tể Hắc Ám. Harry trở về và nhận ra cộng đồng phù thủy phủ nhận sự trở lại của Voldermort. Bộ trưởng Pháp thuật cho rằng hiệu trưởng Dumbledore nói dối.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter7part2.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (10).mp4', 3, 100), ('Harry Potter 6', 'Harry Potter quay lại trường Hogwats năm thứ 6... để đối mặt với một mối nguy hiểm đang lớn dần... có thể vượt ngoài sức mạnh pháp thuật ngày càng củng cố của cậu.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter7part1.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (9).mp4', 3, 100), ('Harry Potter 7 part1', 'Harry, Ron và Hermione trong hành trình bắt đầu nhiệm vụ nguy hiểm...truy tìm và hủy diệt bí mật của sự bất tử và sự hủy diệt của Voldemort: Trường Sinh Linh Giá nắm bắt giữ các mảnh linh hồn của hắn.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter2.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (4).mp4', 3, 100), ('Harry Potter 7 part2', 'Kết hợp giữa sự lôi cuốn về thị giác và câu truyện buồn thảm, bộ phim nhượng quyền tỉ đô la siêu thành công này...đang dần tới kết thúc thắng lợi.', 90, 'http://127.0.0.1:8000/static/assets/img/harrypotter6.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_dark_gathering (8).mp4', 3, 100), ('Đinh sư phụ:', 'Bộ phim kể về võ sư Ngọc Đinh (Đinh sư phụ) lui về ở ẩn bốc thuốc chữa bệnh cho bà con dân làng. Trong một lần chữa bệnh, ông bị vu oan làm cho bệnh nhân bị liệt. Đinh sư phụ phải làm gì giữa “sóng to gió lớn” đang kéo đến?', 90, 'http://127.0.0.1:8000/static/assets/img/thanaichiai.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_DinhSuPhu.mp4', 7, 100), ('Tiệm chụp ảnh ma quái:', 'Seo Ki Joo là một nhiếp ảnh gia và điều hành một studio ảnh nhỏ. Anh ta là chủ sở hữu thứ 7 của studio ảnh và cửa hàng chỉ dành cho ma. Ki Joo chụp chân dung những hồn ma bước vào cửa hàng.Han Bom là một luật sư đam mê công việc và không chấp nhận sự bất công. Bằng cách nào đó, cô ấy lại hợp tác với studio ảnh của Ki Joo. Studio còn có hai nhân viên: Trợ lý giám đốc Go và Baek Nam Gu. Trợ lý giám đốc Go phụ trách việc đưa ma đến làm khách hàng, còn Nam Gu phụ trách lo những công việc lặt vặt xung quanh cửa hàng.', 90, 'http://127.0.0.1:8000/static/assets/img/vancodanhvong.jpeg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_Tiemchupanhmaquai_02.mp4', 5, 100), ('Giữa cơn bão tuyết:', 'Là thiên tài bi-a nổi tiếng nhưng Lâm Diệc Dương vẫn hoãn lại ước mơ để đi du học. Ở xứ người, anh phải cố gắng vượt qua nỗi nhớ nhà để vật lộn trang trải cho cuộc sống. Trong một cơn bão tuyết, anh vô tình gặp cô gái đồng hương Ân Quả, cũng là một tên tuổi trong lĩnh vực bi-a. Vì có cùng sở thích nên cả hai trở nên thân thiết và cuộc sống của họ cũng bắt đầu thay đổi kể từ cuộc gặp gỡ định mệnh giữa cơn bão tuyết.', 90, 'http://127.0.0.1:8000/static/assets/img/giuaconbaotuyet.png', 'http://127.0.0.1:8000/static/assets/short-video/teaser_giuaconbaotuyet.mp4', 6, 100), ('Ván cờ danh vọng :', 'Ván Cờ Danh Vọng là hành trình đi tìm hung thủ giết cha của Thái Dương. Với sự giúp sức của một nhân vật giấu mặt, Dương dần hé mở quá khứ và khám phá ra bí mật động trời của những người anh hết mực tôn kính. Đồng thời, mối tình giữa anh với Bảo Vy cũng vì thế mà gặp phải muôn vàn trắc trở.', 90, 'http://127.0.0.1:8000/static/assets/img/tiemchupanhmaquai.jpg', 'http://127.0.0.1:8000/static/assets/short-video/teaser_Vancodanhvong.mp4', 5, 100), ('Cõng anh mà chạy:', 'Cõng Anh Mà Chạy kể về câu chuyện tình cảm của cô nàng Im Sol và thần tượng của cô là Ryu Sun Jae, một ngôi sao K-Pop hàng đầu. Bất ngờ du hành về thời gian 15 năm trước, Im Sol được gặp gỡ Sun Jae khi anh vẫn còn là học sinh trung học. Kể từ đó, cô phải đối mặt với nhiều thử thách khó khăn để ngăn cản Sun Jae gặp phải kết cục bất hạnh trong tương lai.', 90, 'http://127.0.0.1:8000/static/assets/img/dinhsuphu.png', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_conganhmachay_1m.mp4', 6, 100), ('Lẩn Trốn:', 'Bộ phim Truyền hình [Lẩn Trốn - Hide 2024] với những diễn viên nổi tiếng nhất, được bình chọn top phim hay. Bộ phim Lẩn Trốn (Mất Tích - Hide 2024) nói về Na Moon Young khám phá bí ẩn về sự mất tích của người chồng Cha Sung Jae. Na Moon Young là cựu công tố viên và luật sư pháp lý của công ty Luật Cha Woong. Bên cạnh sự nghiệp thành công, cô còn có một người chồng yêu thương cô hết mực.Để tìm kiếm sự thật đằng sau sự mất tích đột ngột của chồng, Na Moon Young đã truy tìm những manh mối còn sót lại. Đồng hành cùng với cô là người hàng xóm thân thiết - Ha Yeon Joo và người nắm giữ bí mật về vụ mất tích - Do Jin Woo.', 90, 'http://127.0.0.1:8000/static/assets/img/godzilla.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_Hide_LanTron.mp4', 5, 100), ('Thân ái chí ái:', 'Nội dung bộ phim này xoay quanh câu chuyện tình cảm của Ngãi Tình và Ngô Bạch. Trong lần gặp mặt Ngãi Tình đầu tiên, mọi người đã vô cùng ngạc nhiên khi thấy Ngô Bạch nói liền 12 câu. Dù lạnh lùng, trầm tính kiệm lời đến đâu nhưng khi đứng trước Ngãi Tình anh trở thành một người hoàn toàn khác. Vì thần tượng Ngãi Tình từ lâu, Ngô Bạch đã nỗ lực không ngừng để gia nhập đội tuyển của Hàn Thương Ngôn, đi theo con đường Esports. Còn Ngãi Tình luôn đồng hành cùng Ngô Bạch trong những cuộc thi chế tạo robot cũng như những giải đấu lớn mang tầm quốc tế. Hai người cùng sát cánh bên nhau vượt qua không ít những khó khăn, trở ngại trên con đường làm tuyển thủ chuyên nghiệp. Bộ phim vô cùng ngọt ngào và hấp dẫn cùng lối diễn xuất ấn tượng của dàn diễn viên tài năng sẽ đem đến cho khán giả nhưng giây phút thư giãn, thoải mái nhất. Thân Ái Chi Ái chắc chắn sẽ không làm khán giả thất vọng. Hãy cùng đón xem bộ phim lãng mạn này nhé!', 90, 'http://127.0.0.1:8000/static/assets/img/conganhmachay.png', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_ThanAiChiAi_1_chuanmoi.mp4', 2, 100), ('Thất nghiệp chuyển sinh sang thế giới khác tôi sẽ nghiêm túc 2:', 'Redeus Greyrat, 34 tuổi, một người thất nghiệp, bị đuổi khỏi nhà không một xu dính túi và thấy rằng cuộc đời mình hoàn toàn bị dồn vào chân tường. Ngay khi anh ta có suy nghĩ hối hận, anh ta đã bị một chiếc xe tải đâm và thiệt mạng. Sau đó, nơi cậu tỉnh dậy là—một thế giới khác của kiếm và ma thuật! !', 90, 'http://127.0.0.1:8000/static/assets/img/lantron.png', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_ThatNghiepChuyenSinh_S2.mp4', 3, 100), ('GODZILA:', 'Quái Vật Godzilla: Godzilla phiên bản reboot lần này của đạo diễn Gareth Edwards sẽ là sự tái sinh của Godzilla và mở ra một cuộc phiêu lưu hoành tráng, trong đó con quái vật huyền thoại lần này sẽ không chỉ tung hoành phá hủy mọi thứ trên đường đi của nó mà còn đụng độ với những sinh vật hung ác khác, vốn được tạo ra bởi các nhà khoa học kiêu căng, và tất cả chúng sẽ đe dọa sự tồn vong của toàn nhân loại. Thậm chí, lần xuất hiện này hứa hẹn còn ấn tượng, hấp dẫn và kịch tính hơn so với tất cả các lần trước đây. Trong phiên bản mới, Godzilla chính là hiện thân cho cơn phẫn nộ của thiên nhiên, cho sự phản kháng mạnh mẽ của những sinh vật bị con người đối xử tàn tệ trong một thời gian dài. Godzilla 2014 được sản xuất bởi một ê kíp tài năng và đầy danh tiếng, mà trong đó nổi bật nhất là đạo diễn Gareth Edward và quay phim Seamus Mc Garvey. Với tài năng của mình, họ đã lồng ghép những yếu tố thực và ảo, hòa quyện với nhau một cách bài bản, khiến cho câu chuyện về Godzilla trở nên gần gũi, chân thực và cũng đáng sợ hơn.', 90, 'http://127.0.0.1:8000/static/assets/img/thatnghiepchuyensinh2.png', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_Godzilla.mp4', 8, 100), ('7 nụ cười xuân mùa 7:', '7 nụ cười xuân là một gameshow giải trí giúp khán giả thư giãn và trở thành món ăn tinh thần không thể thiếu mỗi dịp tết đến xuân về', 90, 'http://127.0.0.1:8000/static/assets/img/7nu-mua7.png', 'http://127.0.0.1:8000/static/assets/short-video/teaser_7nucuoixuanmua7.mp4', 4, 100), ('Vùng Đất Quỷ Dữ 1', 'Vùng Đất Quỷ Dữ 1: Bối cảnh chính trong phim Vùng Đất Quỷ Dữ 2002 là phòng thí nghiệm bí mật dưới lòng đất The Hive, thuộc tập đoàn Umbrella. Tại đây đang nghiên cứu một loại virus biến đổi gen. Trong một lần sơ hở trong phim hd này, loại virus này đã bị phát tán ra khắp phòng thí nghiệm, biến các nhân viên thành những xác chết di động. Tập đoàn Umbrella đã gửi đến một đội quân chiến đấu tinh nhuệ. Tại đây họ gặp Alice, cô gái bị mất trí nhớ do hít phải khí thần kinh. Đội quân đã chiến đấu với những xác chết đột biến và hệ thống máy tính trước khi loại virus chết người kia kịp lan truyền ra toàn thế giới… Phim Xác Chết Hồi Sinh là phần đầu tiên của loạt phim kinh dị dựa trên video game nổi tiếng cùng tên.', 90, 'http://127.0.0.1:8000/static/assets/img/vungdatquydu1.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_VungDatQuyDu.mp4', 1, 100), ('Vùng Đất Quỷ Dữ 2-Khải Huyền', 'Vùng Đất Quỷ Dữ 2: Khải Huyền – Tiếp nối câu chuyện từ phần 1, trong phim Vùng Đất Quỷ Dữ 2, mọi chuyện tưởng như đã chấm dứt sau 13 giờ kể từ khi trụ sở Umbrella dưới lòng đất bị đóng cửa. Tập đoàn Umbrella quyết định tiến hành điều tra. Trong phim hay này, chuyên viên được phái xuống lòng đất để làm nhiệm vụ nhưng ngờ đâu, làn sóng zombie đã ập lên thành phố Raccoon. Alice, cô gái đang mang giữ căn bệnh dịch sinh hoá từ phần trước, trong phần này phải tham gia vào một nhiệm vụ bất đắc dĩ để giải thoát cô bé Angie và cố gắng thoát khỏi thành phố chết người này trước khi nó bị chính phủ ném bom nguyên tử để hủy diệt…', 90, 'http://127.0.0.1:8000/static/assets/img/vungdatquydu2.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_VungDatQuyDu2_KhaiHuyen.mp4', 1, 100), ('Vùng Đất Quỷ Dữ 3-Tuyệt Diệt', 'Trong phim Vùng Đất Quỷ Dữ 3: Tuyệt Diệt , thảm họa virus T đã lây lan khắp toàn cầu. Thế giới bây giờ chỉ còn lại những nhóm người sống sót lẻ loi cùng với hàng đàn zombie lang thang khắp nơi. Trong bối cảnh đó, mọi người tin rằng ở Alaska vẫn còn nơi chưa bị virus quấy rầy và bắt đầu di chuyển về đó. Alice – giờ đây đã mang trong mình sức mạnh siêu nhiên – cũng không ngoại lệ. Tuy nhiên tập đoàn Umbrella đang cố gắng bắt Alice vì máu của cô chính là thuốc giải cho virus T. Từ đây trong phim này, cuộc chiến giữa Alice và những người bạn của mình với tên bác sĩ Issaac ác độc – người tạo ra các phiên bản vô tính của cô nhằm tìm thuốc giải – bắt đầu…', 90, 'http://127.0.0.1:8000/static/assets/img/vungdatquydu3.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_VungDatQuyDu3_TuyetDiet.mp4', 1, 100), ('Vùng Đất Quỷ Dữ 4-Kiếp Sau', 'Vùng Đất Quỷ Dữ 4: Kiếp Sau – Alice tiếp tục hành trình tìm kiếm những con người sống sót và dẫn dắt họ tới nơi an toàn. Cuộc đối đầu với tổ chức Umbrella tiếp tục diễn ra cam go, nhưng Alice lần này nhận được sự giúp đỡ không ngờ tới từ một người bạn cũ.', 90, 'http://127.0.0.1:8000/static/assets/img/vungdatquydu4.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_VungDatQuyDu4_KiepSau.mp4', 1, 100), ('Vùng Đất Quỷ Dữ 5-Báo Thù', 'Vùng Đất Quỷ Dữ 5: Báo Thù – Tỉnh dậy sau một giấc mơ, Alice tiếp tục cuộc chiến với các thây ma và tìm hiểu về bí mật của tập đoàn Umbrella. Những quái vật khổng lồ có hình thù kỳ dị vẫn là những “chướng ngại vật” trong hành trình của Alice phần này. Bối cảnh chính của phần 5 sẽ diễn ra ở bốn thành phố: New York, Washington (Mỹ), Matxcơva (Nga) và Tokyo (Nhật Bản).', 90, 'http://127.0.0.1:8000/static/assets/img/vungdatquydu5.jpg', 'http://127.0.0.1:8000/static/assets/short-video/VungDatQuyDu5_BaoThu.mp4', 1, 100), ('Thảm họa thiên thạch', 'Khi một cụm sao chổi đang lao tới đe dọa phá hủy phần lớn hành tinh, một gia đình phải chiến đấu trước nỗi sợ leo thang và tình cảnh hỗn loạn để đến nơi an toàn.', 90, 'http://127.0.0.1:8000/static/assets/img/thamhoathienthach.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_Greenland_ThamHoaThienThach.mp4', 1, 100), ('The Wave', 'Tiếp nối thành công từ chuỗi các bộ phim khai thác về thảm hoạ thiên nhiên, tác phẩm mới nhất SÓNG TỬ THẦN (Tên tiếng anh: THE WAVE) dựa trên một thảm họa thiên nhiên từ 80 năm trước, khi một số làng ở Na Uy đã bị nhấn chìm và hàng ngàn người bị nuốt chửng bởi một cơn sóng thần khổng lồ được tạo thành sau khi một sườn núi bất ngờ đổ sụp vào vịnh hẹp. Một lần nữa, con người phải đối mặt với thiên nhiên dữ dội, chống chọi với con sóng thần cao 85 mét. Họ có 10 phút để chạy thoát khỏi tay tử thần. Giữa ranh giới sự sống và cái chết, tình cảm gia đình thiêng liêng sẽ giúp họ sống sót khỏi cơn thịnh nộ của thiên nhiên? Bộ phim cho khán giả thấy được nghị lực và khát vọng được sống của con người dù rất mong manh nhưng lại không kém phần dữ dội và mãnh liệt. THE WAVE là một trong những tác phẩm điện ảnh xuất sắc của Na Uy do đạo diễn Roar Uthaug chỉ đạo.', 90, 'http://127.0.0.1:8000/static/assets/img/TheWave.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_TheWave_chuanmoi.mp4', 1, 100), ('Ký Sinh Trùng', 'Bộ phim giả tưởng kể về loại ký sinh trùng Yeongasi nguy hiểm có khả năng liên tục biến đổi, kiểm soát não bộ rồi dần dần phá hủy cơ thể vật chủ.', 90, 'http://127.0.0.1:8000/static/assets/img/kysinhtrung2012.jpeg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_KySinhTrung2012.mp4', 1, 100), ('Đại Dịch Cúm FLU', 'Trong phim giật gân năm 2013 này, cách ly và hỗn loạn bao trùm khi ngày càng nhiều người chết vì căn bệnh lây qua không khí ở một vùng ngoại ô Hàn Quốc.', 90, 'http://127.0.0.1:8000/static/assets/img/daidichcum.jpeg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_DaiDichCum_Flu.mp4', 1, 100), ('Chuyến Tàu Băng Giá', 'Chuyến Tàu Băng Giá - Snowpiercer (2013) trước vấn nạn Trái Đất đang nóng lên, các nhà lãnh đạo trên toàn thế giới đã quyết định tung lên bầu khí quyển vật chất CW-7, nhằm giúp nhiệt độ trung bình của địa cầu ổn định trở lại. Thế nhưng kết quả mà loài người thu được thì thật kinh hoàng: toàn bộ thế giới bị đóng băng, sự sống cứ thế dần tuyệt diệt. Chỉ có duy nhất một con tàu có tên Snowpiercer do Ngài Wilford cầm lái vẫn cứ thế lầm lũi chạy xuyên băng tuyết, chở trên đó những kẻ sót lại cuối cùng của nhân loại...', 90, 'http://127.0.0.1:8000/static/assets/img/chuyentaubanggia.jpg', 'http://127.0.0.1:8000/static/assets/short-video/Teaser_ChuyenTauBangGia.mp4', 1, 100);
