INSERT INTO nations (name) VALUES ('Phim Nhật Bản') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Thể Thao') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ricco Fajardo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Drew Breedlove') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Alex Hom') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Blue Block', 'Khóa màu xanh Blue Lock 2022 Các lý tưởng mạnh mẽ như địa ngục và các nhân vật chắc chắn mỗi người đều có một hương vị sức mạnh riêng trong số đó.
Nhật Bản liên tục thua World Cup, hết lần này đến lần khác. Sau khi Isagi Yoichi, tiền đạo của một đội trung học, bị loại trong trận đấu cuối cùng của vòng loại dành cho các tuyển thủ quốc gia, được mời tham gia một chương trình có tên ""Blue Lock"". Huấn luyện viên của họ sẽ là Ego Jinpachi, người có ý định ""tiêu diệt bóng đá thua cuộc của Nhật Bản"" bằng cách giới thiệu một chế độ đào tạo mới triệt để: cách ly 300 tiền đạo trẻ trong một cơ sở giống như nhà tù có tên ""Blue Lock"" và đưa họ vào quá trình đào tạo nghiêm ngặt nhằm tạo ra ""tiền đạo tự cao tự đại nhất thế giới"".', '2022-01-01', 22, (SELECT nation_id FROM nations WHERE name = 'Phim Nhật Bản'), '\media\normal\Blue Block\blue block.png', '\media\normal\Blue Block\Blue Block - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block'), (SELECT actor_id FROM actors WHERE name = 'Ricco Fajardo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block'), (SELECT actor_id FROM actors WHERE name = 'Drew Breedlove'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block'), (SELECT actor_id FROM actors WHERE name = 'Alex Hom'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block') , (SELECT genre_id FROM genres WHERE name = 'Phim Thể Thao'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Blue Block'), 1, 25, '\media\normal\Blue Block\Blue Block.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tâm Lý') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Vince Gilligan') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Bryan Cranston') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Aaron Paul') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Anna Gunn') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Breaking Bad', 'Tập Làm Người Xấu (Phần 1) Breaking Bad (Season 1) 2008 Walter White, một giáo viên hóa trung học 50 tuổi đang đối mặt với cuộc khủng hoảng tuổi trung niên, phát hiện ra mình mắc bệnh ung thư phổi giai đoạn 3, không thể chữa khỏi. Sau khi cùng anh rể, đặc vụ DEA Hank Schraeder, trong một cuộc đột kích phòng thí nghiệm methamphetamine , Walt nhận ra rằng anh có thể sử dụng kiến ​​thức về hóa học để nấu meth và kiếm đủ nuôi gia đình sau khi chết. Walt lần theo dấu vết của một cựu sinh viên đầu bếp / người buôn bán, Jesse Pinkman, người mà phòng thí nghiệm mà DEA đã đột kích, và nhờ anh ta giúp đỡ; họ bắt đầu nấu ăn trong Jesse''s RV . Khi Jesse cố gắng bán meth mà họ làm ra, những người buôn bán, một trong số họ, Emilio, là đối tác cũ của anh ta, người đã bị DEA bắt quả tang, bắt anh ta và bắt anh ta cho họ xem phòng thí nghiệm. Walt, khi biết những người buôn bán có ý định giết họ sau khi biết công thức của mình, đầu độc họ bằngkhí photphin', '2008-01-01', 7, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Breaking Bad\breaking bad.png', '\media\normal\Breaking Bad\Breaking Bad - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad'), (SELECT director_id FROM directors WHERE name = 'Vince Gilligan'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad'), (SELECT actor_id FROM actors WHERE name = 'Bryan Cranston'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad'), (SELECT actor_id FROM actors WHERE name = 'Aaron Paul'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad'), (SELECT actor_id FROM actors WHERE name = 'Anna Gunn'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad') , (SELECT genre_id FROM genres WHERE name = 'Phim Tâm Lý'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Breaking Bad'), 1, 58, '\media\normal\Breaking Bad\Breaking Bad.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Min Ye Ji') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Hye Ri') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jung Soo Bin') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kang Hye Won') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Oh Woo Ri') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Choi Young Jae') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Tae Hoon') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Bạn bè cạnh tranh', 'Bạn Bè Cạnh Tranh Friendly Rivalry 2025 Woo Seul Ki lớn lên trong một trại trẻ mồ côi ở tỉnh lẻ và sau đó chuyển đến Seoul, nơi cô nhập học tại Trường trung học Chaehwa, ngôi trường dành cho 1% học sinh giỏi nhất Hàn Quốc. Tại đây, Seul Ki không hòa đồng với bạn bè xung quanh. Một học sinh tên là Yoo Je Yi tiếp cận Seul Ki, và họ nhanh chóng trở thành bạn. Yoo Je Yi là học sinh giỏi nhất trường, sở hữu IQ cao, xuất thân từ gia đình giàu có và có ngoại hình hấp dẫn. Cô đã sống trong sự ghen tị từ khi còn nhỏ và nhận thức rõ sự vượt trội của mình. Cô cũng rất xảo quyệt và biết cách tận dụng vị trí xã hội của mình. Yoo Je Yi thể hiện sự quan tâm đặc biệt tới Woo Seul Ki, và mối quan hệ của họ dần trở nên phức tạp, kết hợp giữa tình bạn và sự ám ảnh. Sự kết nối này không chỉ mở ra những cánh cửa mới cho Seul Ki, mà còn dẫn đến những tình huống nguy hiểm và đầy bất ngờ giữa họ.', '2025-01-01', 16, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Bạn bè cạnh tranh\ban be canh tranh.png', '\media\normal\Bạn bè cạnh tranh\Bạn bè cạnh tranh - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT director_id FROM directors WHERE name = 'Min Ye Ji'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Lee Hye Ri'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Jung Soo Bin'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Kang Hye Won'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Oh Woo Ri'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Choi Young Jae'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), (SELECT actor_id FROM actors WHERE name = 'Kim Tae Hoon'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạn bè cạnh tranh'), 1, 28, '\media\normal\Bạn bè cạnh tranh\Bạn bè cạnh tranh.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Ham Joon Ho') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Han Ji Min') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Joon Hyuk') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Do Hoon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Yoon Hye') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Chàng Thư Ký Hoàn Hảo Của Tôi', 'Chàng Thư Ký Hoàn Hảo Của Tôi Love Scout 2025 Câu chuyện xoay quanh Kang Ji Yun, một nữ giám đốc điều hành nghiện công việc. Để quản lý công việc hiệu quả, cô quyết định thuê một thư ký – một người bố đơn thân tốt bụng. Sự xuất hiện của anh khiến công việc và cuộc sống của Kang Ji Yun trở nên hỗn loạn. Ban đầu, họ thường xuyên mâu thuẫn do tính cách trái ngược, nhưng dần dần, qua những thử thách và khó khăn, họ hiểu và tôn trọng nhau hơn. Mối quan hệ của họ phát triển từ đồng nghiệp thành bạn bè thân thiết, cùng nhau khám phá ý nghĩa của sự chia sẻ và đồng lòng. Với diễn xuất của Han Ji Min, Lee Joon Hyuk, Kim Do Hoon, và Ham Joon Ho, câu chuyện mang lại những phút giây hài hước và cảm động về tình bạn và công việc.', '2025-01-01', 12, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Chàng Thư Ký Hoàn Hảo Của Tôi\love-scout.webp', '\media\normal\Chàng Thư Ký Hoàn Hảo Của Tôi\Chàng Thư Ký Hoàn Hảo Của Tôi - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), (SELECT director_id FROM directors WHERE name = 'Ham Joon Ho'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), (SELECT actor_id FROM actors WHERE name = 'Han Ji Min'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), (SELECT actor_id FROM actors WHERE name = 'Lee Joon Hyuk'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), (SELECT actor_id FROM actors WHERE name = 'Kim Do Hoon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), (SELECT actor_id FROM actors WHERE name = 'Kim Yoon Hye'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chàng Thư Ký Hoàn Hảo Của Tôi'), 1, 80, '\media\normal\Chàng Thư Ký Hoàn Hảo Của Tôi\Chàng Thư Ký Hoàn Hảo Của Tôi.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Bai Shan') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lưu Thi Thi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Đậu Kiêu') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trịnh') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Chưởng Tâm', 'Chưởng Tâm Kill My Sins 2025 Diệp Bình An là một thần y nổi tiếng trong giới giang hồ. Trong một lần chữa trị cho khách tại kinh thành, nàng bất ngờ vướng vào một vụ án ly kỳ và trở thành nghi phạm. Diệp Bình An khéo léo và thấu hiểu lòng người, điều này khiến nhiều người sợ hãi và tránh xa nàng. Nguyên Thiếu Thành, thuộc Đại Lý Tự, xuất thân từ khu nghèo, dù có chức vị nhưng thường bị coi thường. Chàng khao khát quyền lực và luôn tìm cách leo lên vị trí cao hơn, âm thầm xảo quyệt. Khi nhận trách nhiệm điều tra vụ án của Diệp Bình An, Nguyên Thiếu Thành muốn lợi dụng tình thế để đưa nàng vào chỗ chết, qua đó thăng quan tiến chức. Nhưng không ngờ, đây lại chính là một phần trong kế hoạch báo thù của Diệp Bình An, và chàng đã trở thành con cờ đầu tiên trong trò chơi đầy bất ngờ của cô.', '2025-01-01', 30, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Chưởng Tâm\Chuong tam.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm'), (SELECT director_id FROM directors WHERE name = 'Bai Shan'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm'), (SELECT actor_id FROM actors WHERE name = 'Lưu Thi Thi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm'), (SELECT actor_id FROM actors WHERE name = 'Đậu Kiêu'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm'), (SELECT actor_id FROM actors WHERE name = 'Trịnh'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Chưởng Tâm'), 1, 3, '\media\normal\Chưởng Tâm\Chưởng Tâm.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kim Moon Kyo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ji Sung') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jeon Mi Do') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kwon Yool') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Kyung') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Connection', 'Mối Liên Kết Bí Ẩn Connection 2024 được phát sóng vào ngày 24 tháng 5 năm 2024 trên PhimMoi. Đây là một bộ phim thuộc thể loại hành động và kịch tính, xoay quanh câu chuyện về một tình bạn biến chất và sự phản bội qua hai thập kỷ, được khơi mào bởi cái chết của một người bạn thời trung học để lại số tiền bảo hiểm lên đến 5 tỷ won. Cốt truyện khám phá các chủ đề về lòng tin, sự lừa dối và các mối quan hệ phức tạp trong một nhóm bạn cũ khi họ bị kéo vào một cuộc điều tra tội phạm.
Diễn viên chính trong phim gồm Ji Sung vào vai Jang Jae-kyeong, một thám tử xuất sắc trong đội chống ma túy, và Jeon Mi-do vào vai Oh Yoon-jin, một phóng viên tin tức địa phương quyết đoán, đóng vai trò then chốt trong việc khám phá bí mật. Các diễn viên khác như Kwon Yool và Kim Kyung-nam cũng góp phần tăng thêm sự hồi hộp và bí ẩn cho cốt truyện​', '2024-01-01', 14, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Connection\connection.png', '\media\normal\Connection\Connection - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), (SELECT director_id FROM directors WHERE name = 'Kim Moon Kyo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), (SELECT actor_id FROM actors WHERE name = 'Ji Sung'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), (SELECT actor_id FROM actors WHERE name = 'Jeon Mi Do'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), (SELECT actor_id FROM actors WHERE name = 'Kwon Yool'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), (SELECT actor_id FROM actors WHERE name = 'Kim Kyung'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Connection'), 1, 65, '\media\normal\Connection\Connection.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Hoàng Xuân') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trần Triết Viễn') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lương Khiết') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Cây Ô Liu Màu Trắng', 'Cây Ô Liu Màu Trắng The White Olive Tree 2025 “Cây ô liu màu trắng” là bộ phim truyền hình với sự tham gia của Trần Triết Viễn và Lương Khiết, dựa trên tiểu thuyết của Cửu Nguyệt Hi. Câu chuyện theo chân phóng viên Tống Nhiễm (Lương Khiết) trong một nhiệm vụ ở Đông Quốc, nơi cô bị nguy hiểm nhưng được Lý Toản (Trần Triết Viễn), một kỹ sư thuốc nổ, cứu. Từ sự hòa hợp và tấm lòng nhân ái, tình yêu nảy nở giữa họ. Tuy nhiên, một vụ nổ bất ngờ chia cách họ và khiến họ gặp khó khăn trong cuộc sống. Sau khi mất liên lạc, họ tình cờ gặp lại và cùng nhau hồi sinh cuộc sống, gieo những hạt giống của cây ô liu trắng, biểu tượng của hòa bình và hy vọng.', '2025-01-01', 38, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Cây Ô Liu Màu Trắng\cay o li mau trang.png', '\media\normal\Cây Ô Liu Màu Trắng\Cây Ô Liu Màu Trắng - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cây Ô Liu Màu Trắng'), (SELECT director_id FROM directors WHERE name = 'Hoàng Xuân'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cây Ô Liu Màu Trắng'), (SELECT actor_id FROM actors WHERE name = 'Trần Triết Viễn'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cây Ô Liu Màu Trắng'), (SELECT actor_id FROM actors WHERE name = 'Lương Khiết'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Cây Ô Liu Màu Trắng') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cây Ô Liu Màu Trắng'), 1, 45, '\media\normal\Cây Ô Liu Màu Trắng\Cây Ô Liu Màu Trắng - Tập 1.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kim Hee Won') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ju Ji Hoon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Park Bo Young') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Seol Hyun') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Bae Sung Woo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Uhm Tae Goo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Jung Eun') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Cửa Hàng Ánh Sáng', 'Không có nội dung phim', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Cửa Hàng Ánh Sáng\light shop.png', '\media\normal\Cửa Hàng Ánh Sáng\Cửa Hàng Ánh Sáng - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT director_id FROM directors WHERE name = 'Kim Hee Won'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Ju Ji Hoon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Park Bo Young'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Kim Seol Hyun'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Bae Sung Woo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Uhm Tae Goo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), (SELECT actor_id FROM actors WHERE name = 'Lee Jung Eun'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Cửa Hàng Ánh Sáng'), 1, 44, '\media\normal\Cửa Hàng Ánh Sáng\Cửa Hàng Ánh Sáng.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Park Noo Ri') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jo Woo Jin') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ji Chang Wook') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ha Yoon Kyung') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Bibi') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Gangnam B-Side', 'Bên Lề Gangnam Gangnam B-Side 2024 là một bộ phim truyền hình Hàn Quốc thuộc thể loại hành động, tội phạm và bí ẩn, dự kiến phát hành vào ngày 6 tháng 11 năm 2024 trên nền tảng Disney+ và PhimMoi. 
Bộ phim lấy bối cảnh tại quận Gangnam, Seoul, nơi xảy ra hàng loạt vụ mất tích bí ẩn. Jae-Hee (do BIBI thủ vai), một nhân viên tại quán bar nổi tiếng ở Gangnam, nắm giữ bí mật liên quan đến chuỗi vụ mất tích này nhưng sau đó cũng biến mất. Ba nhân vật chính gồm:
Kang Dong-Woo (do Jo Woo-Jin thủ vai): Một thám tử từng tốt nghiệp học viện cảnh sát danh giá nhưng bị giáng chức. Anh bị cuốn vào vụ án do tính cách quyết đoán và không ngại đối đầu.
Yoon Gil-Ho (do Ji Chang-Wook thủ vai): Một người môi giới bí ẩn, kiểm soát thế giới ngầm của Gangnam và đã sống cuộc đời ở đáy xã hội để sinh tồn.
Min Seo-Jin (do Ha Yoon-Kyung thủ vai): Một công tố viên tốt nghiệp từ trường đại học quốc gia địa phương, không có mối quan hệ nhưng đã vươn lên trong văn phòng công tố.
Cả ba hợp tác để điều tra sự thật đằng sau các vụ mất tích, đối mặt với những thế lực ngầm và âm mưu đen tối trong lòng Gangnam.', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Gangnam B-Side\gangnam b-side.png', '\media\normal\Gangnam B-Side\Gangnam B-Side - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), (SELECT director_id FROM directors WHERE name = 'Park Noo Ri'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), (SELECT actor_id FROM actors WHERE name = 'Jo Woo Jin'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), (SELECT actor_id FROM actors WHERE name = 'Ji Chang Wook'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), (SELECT actor_id FROM actors WHERE name = 'Ha Yoon Kyung'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), (SELECT actor_id FROM actors WHERE name = 'Bibi'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Gangnam B-Side'), 1, 49, '\media\normal\Gangnam B-Side\Gangnam B-Side.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Adam Wingard') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Dan Stevens') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Rebecca Hall') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Brian Tyree Henry') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kaylee Hottle') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trần Pháp Lai') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Godzilla vs Kong The New Empire', 'Godzilla x Kong: Đế Chế Mới Godzilla x Kong: The New Empire 2024 là phần tiếp theo được mong đợi trong MonsterVerse, đạo diễn bởi Adam Wingard và có sự tham gia của dàn diễn viên bao gồm Rebecca Hall, Brian Tyree Henry, Dan Stevens, Fala Chen, Alex Ferns và Rachel House. Phim này, được thiết lập để khám phá sâu hơn về lịch sử và nguồn gốc của những Titan huyền thoại này, theo chân Godzilla và Kong khi họ liên minh chống lại một mối đe dọa khổng lồ, chưa từng được khám phá, ẩn náu trong Trái Đất Rỗng, được biết đến với tên gọi Skar King​​​​​​.
Bộ phim sẽ giới thiệu các Titan và siêu loài khác nhau, bao gồm Godzilla, King Kong, Mothra và nhiều hơn nữa, cũng như một loạt các quái vật khác, vũ khí, phương tiện và tổ chức quan trọng cho câu chuyện được show ra​​.
Quá trình quay phim diễn ra chủ yếu ở Gold Coast, Queensland, với việc quay chính thức bắt đầu vào ngày 29 tháng 7 năm 2022. Sản xuất có sự quay trở lại của nhiều thành viên trong ekip từ các phim MonsterVerse trước, đảm bảo sự liên tục trong câu chuyện hình ảnh và chủ đề của loạt phim. Tom Holkenborg, người đã soạn nhạc cho Godzilla vs Kong, trở lại để sáng tác nhạc phim cho phần tiếp theo này, phối hợp với Antonio Di Iorio​​.
Dự kiến phát hành tại Việt Nam vào ngày 29 tháng 3 năm 2024, ""Godzilla x Kong: The New Empire"" hứa hẹn một cuộc đối đầu huyền thoại không chỉ đặt những sinh vật mạnh mẽ này chống lại một kẻ thù đáng gờm mà còn khám phá sâu vào mối liên kết sâu sắc giữa những Titan này và loài người​​. Phim nhằm mục đích khám phá những câu chuyện phong phú về Godzilla và Kong, làm sáng tỏ những trận chiến cổ đại đã hình thành sự tồn tại của họ và mối liên hệ của họ với loài người. Với Adam Wingard làm đạo diễn và câu chuyện được phát triển bởi Terry Rossio, Simon Barrett và Jeremy Slater, bộ phim được đặt để là một bổ sung thú vị cho bộ sưu tập MonsterVerse​, cùng PhimMoi theo dõi nha', '2024-01-01', 1, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Godzilla vs Kong The New Empire\godzilla vs kong.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT director_id FROM directors WHERE name = 'Adam Wingard'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT actor_id FROM actors WHERE name = 'Dan Stevens'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT actor_id FROM actors WHERE name = 'Rebecca Hall'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT actor_id FROM actors WHERE name = 'Brian Tyree Henry'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT actor_id FROM actors WHERE name = 'Kaylee Hottle'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), (SELECT actor_id FROM actors WHERE name = 'Trần Pháp Lai'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Godzilla vs Kong The New Empire'), 1, 3, '\media\normal\Godzilla vs Kong The New Empire\Godzilla vs Kong The New Empire.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Otto Bathurst') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Pablo Schreiber') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Shabana Azmi') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Halo', 'Halo (Phần 2) Hào Quang (Season 2) 2024 khởi chiếu từ ngày 8 tháng 2 năm 2024 trên Paramount+, tiếp tục câu chuyện về Master Chief và cuộc chiến chống lại liên minh ngoài hành tinh Covenant. Mùa này hứa hẹn sẽ gần gũi hơn với cốt truyện của trò chơi, bao gồm sự kiện quan trọng ""sự sụp đổ của Reach"".', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Halo\halo.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Halo'), (SELECT director_id FROM directors WHERE name = 'Otto Bathurst'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Halo'), (SELECT actor_id FROM actors WHERE name = 'Pablo Schreiber'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Halo'), (SELECT actor_id FROM actors WHERE name = 'Shabana Azmi'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Halo') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Halo'), 1, 2, '\media\normal\Halo\Halo.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hài Hước') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Park Shin woo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Min ho') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Gong Hyo jin') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Hỏi Các Vì Sao', 'Hỏi Các Vì Sao When the Stars Gossip 2024 Kể về cuộc gặp gỡ định mệnh giữa Gong Ryong (Lee Min Ho thủ vai) một bác sĩ sản khoa tham gia chuyến du lịch vũ trụ với nhiệm vụ bí mật, và Eve Kim (Gong Hyo Jin thủ vai) chỉ huy của trạm vũ trụ. Tại đây họ cùng nhau trải qua những tình huống dở khóc dở cười, dần phát triển mối quan hệ lãng mạn trong môi trường không trọng lực.', '2024-01-01', 16, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Hỏi Các Vì Sao\when-the-stars-gossip.jpg', '\media\normal\Hỏi Các Vì Sao\Hỏi Các Vì Sao - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao'), (SELECT director_id FROM directors WHERE name = 'Park Shin woo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao'), (SELECT actor_id FROM actors WHERE name = 'Lee Min ho'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao'), (SELECT actor_id FROM actors WHERE name = 'Gong Hyo jin'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao') , (SELECT genre_id FROM genres WHERE name = 'Phim Hài Hước'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Hỏi Các Vì Sao'), 1, 75, '\media\normal\Hỏi Các Vì Sao\Hỏi Các Vì Sao.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jack Black') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Rita Ora') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('James Hong') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Kung Fu Panda', 'Kung Fu Panda: Hiệp sĩ rồng Kung Fu Panda The Dragon Knight 2022 Theo chân Po, người hợp tác với một hiệp sĩ người Anh vô danh tên là Wandering Blade để tìm bộ sưu tập bốn vũ khí mạnh mẽ trước khi một cặp chồn bí ẩn làm, và cứu thế giới khỏi sự hủy diệt.
Khi một cặp chồn bí ẩn nhắm vào bộ sưu tập bốn vũ khí mạnh mẽ, Po phải rời khỏi nhà của mình để bắt tay vào hành trình tìm kiếm sự cứu chuộc và công lý trên toàn cầu. Cùng nhau, hai chiến binh không phù hợp này bắt đầu một cuộc phiêu lưu sử thi để tìm kiếm vũ khí ma thuật trước tiên và cứu thế giới khỏi sự hủy diệt và thậm chí họ có thể học được một hoặc hai điều từ nhau trên đường đi.', '2022-01-01', 11, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Kung Fu Panda\kung fu panda.png', '\media\normal\Kung Fu Panda\Kung Fu Panda - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Kung Fu Panda'), (SELECT actor_id FROM actors WHERE name = 'Jack Black'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Kung Fu Panda'), (SELECT actor_id FROM actors WHERE name = 'Rita Ora'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Kung Fu Panda'), (SELECT actor_id FROM actors WHERE name = 'James Hong'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Kung Fu Panda') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Kung Fu Panda'), 1, 92, '\media\normal\Kung Fu Panda\Kung Fu Panda.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kỳ') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Lưu Thủy Điều Điều', 'Lưu Thủy Điều Điều Love of Nirvana 2024 là một bộ phim truyền hình cổ trang lịch sử và tình cảm của Trung Quốc. Phim xoay quanh cuộc đời của Tiêu Vô Hà, thiếu thành chủ của thành Nguyệt Lạc. Anh đã sống ẩn danh dưới tên Vệ Chiêu ở nước Lương nhiều năm, chịu đựng bị mang tiếng là gian thần. Vệ Chiêu âm thầm điều tra sự thật về cái chết bí ẩn của gia đình mình năm xưa và tìm cách bắt cóc người còn sống sót duy nhất trong vụ án Tề Vương. Tuy nhiên, một cô gái trẻ tên Giang Từ đã vô tình phá hỏng kế hoạch của anh. Bùi Diễm, nhân cơ hội này, đã đưa Giang Từ bị thương nặng về nhà mình để tìm ra kẻ phá hoại. Qua quá trình tiếp xúc, Vệ Chiêu và Giang Từ dần nhận ra và cảm mến những điểm tốt của nhau, từ đó nảy sinh tình cảm. Cuối cùng, họ cùng Bùi Diễm đã quyết định buông bỏ những ân oán cá nhân để cùng nhau đấu tranh chống lại Lương Đế, bảo vệ thành Nguyệt Lạc và xây dựng một thế giới mới tốt đẹp hơn.', '2024-01-01', 40, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Lưu Thủy Điều Điều\luu thuy dieu dieu.png', '\media\normal\Lưu Thủy Điều Điều\Lưu Thủy Điều Điều - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Lưu Thủy Điều Điều'), (SELECT director_id FROM directors WHERE name = 'Kỳ'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Lưu Thủy Điều Điều') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Lưu Thủy Điều Điều') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Lưu Thủy Điều Điều'), 1, 44, '\media\normal\Lưu Thủy Điều Điều\Lưu Thủy Điều Điều.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Khoa Học') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Louise Malkinson') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jeff Wise') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Florence De Changy') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('MH370 Chiếc Bay Biến Mất', 'MH370 Chiếc Máy Bay Biến Mất MH370: The Plane That Disappeared 2023 Chúng ta có thể sẽ không bao giờ biết điều gì đã thực sự xảy ra với Chuyến bay 370 của Malaysia Airlines. Chiếc máy bay Boeing 777 đã làm đắm chìm thế giới bằng cách biến mất lần đầu tiên cất cánh từ Sân bay Quốc tế Kuala Lumpur lúc 12:42 sáng giờ địa phương vào Thứ Bảy, ngày 8 tháng 3 năm 2014. Chuyến bay , được gọi là MH370 theo mã của Malaysia Airlines, được cho là đến Sân bay Quốc tế Thủ đô Bắc Kinh vào khoảng 6:30 sáng nhưng đã biến mất khỏi màn hình radar lúc 1:21 sáng. 
Những gì tiếp theo là một trong những hoạt động tìm kiếm rộng rãi nhất trong lịch sử. Chính phủ Malaysia ngay lập tức mở một cuộc điều tra thiếu sót trên mặt đất. Chính phủ Úc, nơi có nguồn lực điều tra hải quân vượt trội, đã dẫn đầu cuộc tìm kiếm từ biển. Cuối cùng, các công ty tư nhân và một số quốc gia khác cũng sẽ tham gia vào cuộc cạnh tranh với mục đích duy nhất là tìm ra bất kỳ dấu vết nào mà MH370 để lại.
Bộ phim tài liệu của Netflix sẽ giới thiệu một cộng đồng toàn cầu bao gồm các thành viên gia đình, nhà khoa học và nhà báo điều tra, tất cả đều tiếp tục tìm kiếm sự kết thúc.
Tập đầu tiên sẽ giới thiệu vài giờ và vài ngày đầu tiên sau khi máy bay mất tích, bao gồm cả những gì đã xảy ra khi các thuyết âm mưu bắt đầu xuất hiện.
Trong tập 2, các chuyên gia sẽ thảo luận về khả năng hai chiếc máy bay – MH370 và MH17 _ làm nảy sinh thêm nhiều giả thuyết.
Tập 3 sẽ thảo luận về một phần lớn của cánh máy bay dạt vào bờ biển ngoài khơi Bờ biển Đông Phi được xác nhận là của chiếc máy bay mất tích.', '2023-01-01', 3, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\MH370 Chiếc Bay Biến Mất\mh370.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'MH370 Chiếc Bay Biến Mất'), (SELECT director_id FROM directors WHERE name = 'Louise Malkinson'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'MH370 Chiếc Bay Biến Mất'), (SELECT actor_id FROM actors WHERE name = 'Jeff Wise'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'MH370 Chiếc Bay Biến Mất'), (SELECT actor_id FROM actors WHERE name = 'Florence De Changy'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'MH370 Chiếc Bay Biến Mất') , (SELECT genre_id FROM genres WHERE name = 'Phim Khoa Học'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'MH370 Chiếc Bay Biến Mất'), 1, 2, '\media\normal\MH370 Chiếc Bay Biến Mất\MH370 Chiếc Bay Biến Mất.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('MooryMA') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Angelababy') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Vương An Vũ') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trình Tiêu') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kuang Mu Ye') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Zhang Yu Jian') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Thịnh Anh Hào') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Mạn Ảnh Tầm Trung', 'Mạn Ảnh Tầm Tung Back For You 2025 Câu chuyện diễn ra vào những năm đầu của Trung Hoa Dân Quốc, xoay quanh A Lai, một cảnh sát bị một băng đảng tấn công. Trong lúc ngàn cân treo sợi tóc, anh được Lu Na, một người phụ nữ bí ẩn, cứu sống. Tuy nhiên, Lu Na bị thương nặng và rơi vào trạng thái hôn mê. Để đánh thức Lu Na, A Lai sử dụng mười hai cuốn truyện tranh mà cô mang theo, kể những câu chuyện liên quan đến các vụ án mà anh đã từng xử lý. Những câu chuyện này không chỉ giúp A Lai tìm ra manh mối giải quyết vụ án mà còn dần dần kết nối anh với Lu Na.', '2025-01-01', 12, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Mạn Ảnh Tầm Trung\back for you.png', '\media\normal\Mạn Ảnh Tầm Trung\Mạn Ảnh Tầm Trung - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT director_id FROM directors WHERE name = 'MooryMA'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Angelababy'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Vương An Vũ'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Trình Tiêu'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Kuang Mu Ye'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Zhang Yu Jian'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), (SELECT actor_id FROM actors WHERE name = 'Thịnh Anh Hào'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Mạn Ảnh Tầm Trung'), 1, 38, '\media\normal\Mạn Ảnh Tầm Trung\Mạn Ảnh Tầm Trung.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Brian Kirk') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Anthony Philipson') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Paul Wilmshurst') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Anu Menon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Eddie Redmayne') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lashana Lynch') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Eleanor Matsuura') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Ngày Của Chó Rừng', 'Ngày Của Chó Rừng The Day of The Jackal 2024 Tái hiện câu chuyện về một sát thủ người Anh, được biết đến với biệt danh ""The Jackal"", chuyên thực hiện các vụ ám sát cho những ai trả giá cao nhất. Sau một vụ giết người gần đây, anh ta bị truy đuổi bởi một sĩ quan tình báo Anh kiên trì, dẫn đến một cuộc rượt đuổi căng thẳng khắp châu Âu.', '2024-01-01', 10, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Ngày Của Chó Rừng\ngay cua cho rung.png', '\media\normal\Ngày Của Chó Rừng\Ngày Của Chó Rừng - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT director_id FROM directors WHERE name = 'Brian Kirk'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT director_id FROM directors WHERE name = 'Anthony Philipson'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT director_id FROM directors WHERE name = 'Paul Wilmshurst'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT director_id FROM directors WHERE name = 'Anu Menon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT actor_id FROM actors WHERE name = 'Eddie Redmayne'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT actor_id FROM actors WHERE name = 'Lashana Lynch'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), (SELECT actor_id FROM actors WHERE name = 'Eleanor Matsuura'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngày Của Chó Rừng'), 1, 57, '\media\normal\Ngày Của Chó Rừng\Ngày Của Chó Rừng.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Dương Hoan') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Bạch Vân Mặc') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Mã') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lư Dục Hiểu') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Vương Tinh Việt') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lưu Tá') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Ngũ Phúc Lâm Môn', 'Ngũ Phúc Lâm Môn Perfect Match 2025 Câu chuyện diễn ra vào thời Bắc Tống, khi Bà Lý từ Lạc Dương chuyển đến Biện Kinh cùng năm cô con gái xinh đẹp. Mục tiêu của bà là tái ngộ với con gái thứ hai Phúc Huệ và tìm chồng tốt cho các con. Tuy nhiên, các cô gái gặp khó khăn trong việc kết hôn: Thọ Hoa góa chồng, Khang Ninh tính khí hung dữ, và Vũ Nương được cưng chiều quá mức.
Sự tự tin của gia đình nhanh chóng bị hiện thực đập tan khi họ phải đối mặt với nhiều thử thách. Gia đình họ Lý khởi nghiệp lại, đi tìm kiếm người chồng lý tưởng vừa chính trực vừa tài giỏi. Hành trình của họ đầy khúc quanh và tiếng cười, cuối cùng, các cô con gái đã tìm được một người phù hợp, tạo nên một bộ phim hài hước hấp dẫn về hôn nhân trong triều đại Bắc Tống.', '2025-01-01', 36, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Ngũ Phúc Lâm Môn\Ngu phuc lam mon.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT director_id FROM directors WHERE name = 'Dương Hoan'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT director_id FROM directors WHERE name = 'Bạch Vân Mặc'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT director_id FROM directors WHERE name = 'Mã'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT actor_id FROM actors WHERE name = 'Lư Dục Hiểu'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT actor_id FROM actors WHERE name = 'Vương Tinh Việt'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), (SELECT actor_id FROM actors WHERE name = 'Lưu Tá'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Ngũ Phúc Lâm Môn'), 1, 3, '\media\normal\Ngũ Phúc Lâm Môn\Ngũ Phúc Lâm Môn.mp4');
INSERT INTO nations (name) VALUES ('Phim Nhật Bản') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Anime') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Konosuke Uda') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Akemi Okamura') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kappei Yamaguchi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Mayumi Tanaka') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('One Piece', 'One Piece Vua Hải Tặc Đảo Hải Tặc Hải Tặc Mũ Rơm 1999 là một series anime và manga Nhật Bản được sáng tạo bởi Eiichiro Oda. Phim anime được phát sóng lần đầu tiên vào năm 1999 và nhanh chóng trở thành một trong những series anime phổ biến nhất trên thế giới. Câu chuyện xoay quanh Monkey D. Luffy, một chàng trai trẻ với giấc mơ trở thành Vua Hải Tặc. Luffy, người có khả năng co giãn như cao su sau khi ăn nhầm Trái Ác Quỷ, lãnh đạo nhóm Hải Tặc Mũ Rơm đi khắp Grand Line để tìm kiếm kho báu huyền thoại One Piece và theo đuổi giấc mơ của mình. Series nổi tiếng với cốt truyện phong phú, nhân vật đa dạng, và những pha hành động hấp dẫn.. theo dõi trọn bộ One Piece trên phimmoi vào chủ nhật hàng tuần.', '1999-01-01', 25, (SELECT nation_id FROM nations WHERE name = 'Phim Nhật Bản'), '\media\normal\One Piece\one piece.png', '\media\normal\One Piece\One Piece - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece'), (SELECT director_id FROM directors WHERE name = 'Konosuke Uda'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece'), (SELECT actor_id FROM actors WHERE name = 'Akemi Okamura'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece'), (SELECT actor_id FROM actors WHERE name = 'Kappei Yamaguchi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece'), (SELECT actor_id FROM actors WHERE name = 'Mayumi Tanaka'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece') , (SELECT genre_id FROM genres WHERE name = 'Phim Anime'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'One Piece'), 1, 25, '\media\normal\One Piece\One Piece.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kogonada') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Justin Chon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Youn Yuh-jung') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Min-ho') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jin Ha') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Anna Sawai') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Minha') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Soji Arai') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kaho Minami') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Xem Pachinko 2') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Panchiko', 'Pachinko Pachinko 2022 Dựa trên cuốn sách bán chạy nhất của Thời báo New York , câu chuyện sâu sắc này ghi lại những hy vọng và ước mơ của một gia đình nhập cư Hàn Quốc qua bốn thế hệ khi họ rời quê hương trong một nhiệm vụ bất khuất để tồn tại và phát triển.
Phim Pachinko Kim Sun-Ja sinh ra và lớn lên tại Busan, Hàn Quốc, khi Hàn Quốc nằm dưới sự cai trị của Nhật Bản. Cô đã yêu một người đàn ông tên là Koh Han-Su. Khi cô ấy biết rằng Koh Han-Su đã kết hôn với một người phụ nữ khác, cô ấy đã mang thai. Cô ấy bị tàn phá bởi hoàn cảnh của mình. Một linh mục nhà thờ tên là Baek Isak đã cứu cô bằng cách kết hôn với cô. Cô và Baek Isak sau đó chuyển đến Nhật Bản. Ở đó, cô ấy sinh ra đứa con của mình. Cuộc sống đối với những người Hàn Quốc sống ở Nhật Bản vào thời điểm đó không hề dễ dàng. Đôi khi họ bị khinh thường và phân biệt đối xử, họ phải vật lộn để tồn tại.', '2022-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Panchiko\panchiko.png', '\media\normal\Panchiko\Panchiko - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT director_id FROM directors WHERE name = 'Kogonada'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT director_id FROM directors WHERE name = 'Justin Chon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Youn Yuh-jung'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Lee Min-ho'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Jin Ha'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Anna Sawai'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Kim Minha'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Soji Arai'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Kaho Minami'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), (SELECT actor_id FROM actors WHERE name = 'Xem Pachinko 2'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Panchiko'), 1, 55, '\media\normal\Panchiko\Panchiko.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hài Hước') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Park Joon Hwa') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ju Ji Hoon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jung Yu Mi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Ye Won') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Si Woo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Kim Jung Young') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Phải Lòng Tình Địch', 'Không có nội dung phim', '2024-01-01', 12, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Phải Lòng Tình Địch\phai long tinh dich.png', '\media\normal\Phải Lòng Tình Địch\Phải Lòng Tình Địch - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT director_id FROM directors WHERE name = 'Park Joon Hwa'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT actor_id FROM actors WHERE name = 'Ju Ji Hoon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT actor_id FROM actors WHERE name = 'Jung Yu Mi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT actor_id FROM actors WHERE name = 'Kim Ye Won'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT actor_id FROM actors WHERE name = 'Lee Si Woo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), (SELECT actor_id FROM actors WHERE name = 'Kim Jung Young'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch') , (SELECT genre_id FROM genres WHERE name = 'Phim Hài Hước'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Phải Lòng Tình Địch'), 1, 66, '\media\normal\Phải Lòng Tình Địch\Phải Lòng Tình Địch.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Hoàng Dĩnh') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lâm Duẫn') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Phương Dật Luân') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Triệu Tinh') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lâm Bá Duệ') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Quách Già') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Sao Địch Nổi Sắc Đẹp Tuyệt Trần', 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần Les Belles 2025 Câu chuyện xoay quanh La Lệnh Dư, con gái của thế gia sa cơ, đến Kiến Nghiệp cùng muội muội nhờ cậy họ hàng. Trên đường, nàng cứu một chàng trai nhưng vì lễ giáo, đã ép chàng nhảy xuống nước giữa đêm. Khi tới Lục gia, Lệnh Dư muốn chọn một chồng tốt mà không biết tam công tử Lục gia mà nàng để ý chính là chàng trai hôm đó. Nàng dùng mọi cách để lấy lòng chàng nhưng liên tiếp thất bại. Trong khi chàng lạnh lùng vạch trần những mánh khóe của nàng, khi Lệnh Dư bắt đầu nản lòng và quay sang người khác, chàng lại không chấp nhận. Giữa lòng chàng sắt đá và vẻ đẹp của nàng, mối tình giữa họ dần nảy nở qua những thử thách đầy hài hước và cảm động.', '2025-01-01', 26, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Sao Địch Nổi Sắc Đẹp Tuyệt Trần\Sao dich noi nhan sac dep tuyet tran.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT director_id FROM directors WHERE name = 'Hoàng Dĩnh'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT actor_id FROM actors WHERE name = 'Lâm Duẫn'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT actor_id FROM actors WHERE name = 'Phương Dật Luân'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT actor_id FROM actors WHERE name = 'Triệu Tinh'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT actor_id FROM actors WHERE name = 'Lâm Bá Duệ'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), (SELECT actor_id FROM actors WHERE name = 'Quách Già'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sao Địch Nổi Sắc Đẹp Tuyệt Trần'), 1, 2, '\media\normal\Sao Địch Nổi Sắc Đẹp Tuyệt Trần\Sao Địch Nổi Sắc Đẹp Tuyệt Trần.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Keanu Reeves') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Arnold Schwarzenegger') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Emily Swallow') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Secret Level', 'Secret Level Cấp Độ Bí Mật 2024 Mỗi tập phim sẽ khám phá một thế giới trò chơi điện tử khác nhau, mang đến những câu chuyện độc đáo và phong cách nghệ thuật đa dạng. Các trò chơi được chuyển thể bao gồm ""Armored Core"", ""Dungeons & Dragons"", ""Pac-Man"", ""Mega Man"", ""Sifu"", ""Warhammer 40,000"" và nhiều tựa game khác.', '2024-01-01', 15, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Secret Level\secret level.png', '\media\normal\Secret Level\Secret Level - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Secret Level'), (SELECT actor_id FROM actors WHERE name = 'Keanu Reeves'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Secret Level'), (SELECT actor_id FROM actors WHERE name = 'Arnold Schwarzenegger'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Secret Level'), (SELECT actor_id FROM actors WHERE name = 'Emily Swallow'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Secret Level') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Secret Level'), 1, 16, '\media\normal\Secret Level\Secret Level.mp4');
INSERT INTO nations (name) VALUES ('Phim Nhật Bản') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Brian Duffield') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Darren Barnet') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Benjamin Bratt') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Skull Island', 'Đảo Đầu Lâu Skull Island (TV Series) 2023 Một nhóm các nhà thám hiểm tốt bụng đã giải cứu Annie khỏi đại dương mà không biết rằng hành động anh hùng của họ sẽ dẫn họ đến Đảo Đầu lâu nguy hiểm. Nơi bí ẩn này là nơi sinh sống của những sinh vật kỳ dị và những con quái vật đáng sợ, bao gồm cả chính người khổng lồ hùng mạnh Kong.', '2023-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Nhật Bản'), '\media\normal\Skull Island\skull island.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Skull Island'), (SELECT director_id FROM directors WHERE name = 'Brian Duffield'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Skull Island'), (SELECT actor_id FROM actors WHERE name = 'Darren Barnet'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Skull Island'), (SELECT actor_id FROM actors WHERE name = 'Benjamin Bratt'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Skull Island') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Skull Island'), 1, 2, '\media\normal\Skull Island\Skull Island.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Erik Wiese') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Logan McPherson') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Andrew Duncan') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kiran Sangherra') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Deven Christian Mack') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Ashleigh Ball') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Adam') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Sonic Prime 2', 'Sonic Prime (Phần 2) Sonic Prime (Season 2) 2023 Mùa mới bắt đầu từ nơi mà mùa trước kết thúc với việc chú nhím cứng đầu phải giải quyết hậu quả do hành động của mình gây ra. Căng thẳng gia tăng giữa cặp Shadow và Sonic, khi người trước đối đầu với người sau vì sự hủy diệt rõ ràng của Green Hill. Câu chuyện trên màn ảnh nhỏ lấy bối cảnh nhân vật chính trong trò chơi điện tử nổi tiếng Sonic ( Deven Christian Mack ) đối đầu trong một cuộc đụng độ khác với kẻ thù truyền kiếp Dr. Eggman ( Brian Drummond) .). Như với tất cả các câu chuyện hay, có một sự thay đổi trong cuộc đụng độ này. Trong cuộc đối đầu, một tinh thể bí ẩn được gọi là Lăng kính Nghịch lý bị phá hủy, và voir là...vũ trụ bị phá vỡ và các cõi khác nhau bắt đầu va chạm. Sonic sớm vượt qua đa vũ trụ này - ở đây được gọi là Shatterverse, nơi người chơi tốc độ gặp gỡ các phiên bản khác nhau của bạn bè mình. Nhiệm vụ mới của anh ấy đòi hỏi phải thu thập tất cả các mảnh của Lăng kính Nghịch lý để sửa chữa vũ trụ. Các phiên bản mới của những người bạn mà anh ấy gặp trên hành trình này bao gồm những người như Tails, Amy, Knuckles và Rouge,', '2023-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Sonic Prime 2\sonic prime 2.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT director_id FROM directors WHERE name = 'Erik Wiese'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT director_id FROM directors WHERE name = 'Logan McPherson'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT director_id FROM directors WHERE name = 'Andrew Duncan'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT director_id FROM directors WHERE name = 'Kiran Sangherra'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT actor_id FROM actors WHERE name = 'Deven Christian Mack'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT actor_id FROM actors WHERE name = 'Ashleigh Ball'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), (SELECT actor_id FROM actors WHERE name = 'Adam'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Sonic Prime 2'), 1, 24, '\media\normal\Sonic Prime 2\Sonic Prime 2.mp4');
INSERT INTO nations (name) VALUES ('Phim Hàn Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Hwang Dong Hyuk') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Jung Jae') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Byung Hun') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Wi Ha Joon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Gong Yoo') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Lee Seo Hwan') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Squid Game 2', 'Trò Chơi Con Mực (Phần 2) Squid Game (Season 2) 2024 mùa 2 tiếp tục câu chuyện ba năm sau khi Seong Gi-hun (Lee Jung-jae) giành chiến thắng ở mùa đầu tiên. Bị ám ảnh bởi những gì đã trải qua Gi-hun quyết định quay lại trò chơi với mục tiêu phá hủy nó từ bên trong. Anh sử dụng số tiền thắng được để truy tìm những kẻ đứng sau tổ chức tàn ác này bắt đầu từ việc tìm kiếm người đàn ông bí ẩn trong tàu điện ngầm', '2024-01-01', 7, (SELECT nation_id FROM nations WHERE name = 'Phim Hàn Quốc'), '\media\normal\Squid Game 2\squid game 2.png', '\media\normal\Squid Game 2\Squid Game 2 - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT director_id FROM directors WHERE name = 'Hwang Dong Hyuk'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT actor_id FROM actors WHERE name = 'Lee Jung Jae'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT actor_id FROM actors WHERE name = 'Lee Byung Hun'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT actor_id FROM actors WHERE name = 'Wi Ha Joon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT actor_id FROM actors WHERE name = 'Gong Yoo'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), (SELECT actor_id FROM actors WHERE name = 'Lee Seo Hwan'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Squid Game 2'), 1, 65, '\media\normal\Squid Game 2\Squid Game 2.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Eric Kripke') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Karl Urban') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jack Quaid') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Antony Starr') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Erin Moriarty') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Dominique McElligott') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jessie T. Usher') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('The Boys 4', 'Siêu Anh Hùng Phá Hoại (Phần 4) The Boys (Season 4) 2024 sẽ tiếp tục mang đến nhiều cảnh quay kịch tính và gay cấn khi câu chuyện về cuộc chiến chống lại các siêu anh hùng tham nhũng biến chất tiếp diễn. Phần này dự kiến ​​khởi chiếu vào ngày 13 tháng 6 năm 2024, với ba tập đầu tiên được phát liền và kết thúc với tám tập vào ngày 18 tháng 7 năm 2024. Phần bốn đặc biệt quan trọng vì có thể là các tập cuối cùng cho nhân vật Billy Butcher, do Karl Urban thủ vai.
Cốt truyện chính của The Boys Mùa 4 xoay quanh Victoria Neuman do Claudia Doumit đóng, người đang tiến gần hơn đến việc đảm nhận một vị trí chính trị quan trọng, trong khi vẫn chịu sự ảnh hưởng của Homelander. Mùa này cũng chào đón sự gia nhập của Jeffrey Dean Morgan trong một vai bí ẩn, làm gia tăng thêm chiều sâu cho câu chuyện đã rất phức tạp. Các mối quan hệ trong ""The Seven"" cũng bị xáo trộn với sự tham gia của các thành viên mới như Sister Sage và Firecracker.
Một điểm nhấn quan trọng từ phần phụ ""Gen V"" được mang sang, liên quan đến một loại virus có khả năng làm suy yếu các Supes. Cùng PhimMoi theo dõi bộ phim hài ""dark"" này với những pha vietsub táo bạo đến từ subteam của chúng tôi.', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\The Boys 4\the boys 4.png', '\media\normal\The Boys 4\The Boys 4 - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT director_id FROM directors WHERE name = 'Eric Kripke'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Karl Urban'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Jack Quaid'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Antony Starr'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Erin Moriarty'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Dominique McElligott'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), (SELECT actor_id FROM actors WHERE name = 'Jessie T. Usher'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Boys 4'), 1, 65, '\media\normal\The Boys 4\The Boys 4.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Jonathan E. Steinberg') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Robert Levine') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jeff Bridges') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('John Lithgow') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Bill Heck') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('The Old Man 2', 'Lão Già Gân (Phần 2) The Old Man (Season 2) 2024 tiếp tục câu chuyện về Dan Chase một cựu điệp viên CIA và cựu chiến binh Afghanistan do Jeff Bridges thủ vai. Mùa này Dan đối mặt với những thách thức ngày càng phức tạp liên quan đến con gái nuôi Emily và cha ruột của cô là Faraz Hamzad. Câu chuyện khám phá sâu vào mối quan hệ phức tạp giữa họ trong khi Dan cố gắng bảo vệ Emily khỏi những hiểm nguy ngày càng tăng từ quá khứ của anh ta và những kẻ thù cũ.', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\The Old Man 2\the old man 2.png', '\media\normal\The Old Man 2\The Old Man 2 - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), (SELECT director_id FROM directors WHERE name = 'Jonathan E. Steinberg'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), (SELECT director_id FROM directors WHERE name = 'Robert Levine'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), (SELECT actor_id FROM actors WHERE name = 'Jeff Bridges'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), (SELECT actor_id FROM actors WHERE name = 'John Lithgow'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), (SELECT actor_id FROM actors WHERE name = 'Bill Heck'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Old Man 2'), 1, 48, '\media\normal\The Old Man 2\The Old Man 2.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Lauren LeFranc') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Colin Farrell') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Cristin Milioti') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Rhenzy Feliz') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('The Penguin', 'Đế Chế Chim Cánh Cụt The Penguin 2024 là một series truyền hình pháp lý tội phạm của Mỹ, được tạo ra bởi Lauren LeFranc. Dựa trên nhân vật Penguin của DC Comics, series này là một phần phụ của bộ phim The Batman (2022), với sự trỗi dậy của Penguin trong thế giới tội phạm ngầm của thành phố Gotham. Series tập trung vào nỗ lực của Oz để nắm quyền kiểm soát thế giới tội phạm tại Gotham, đánh dấu sự tiếp nối và mở rộng quy mô của Matt Reeves về thành phố Gotham qua góc nhìn của Penguin.', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\The Penguin\the penguin.png', '\media\normal\The Penguin\The Penguin - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin'), (SELECT director_id FROM directors WHERE name = 'Lauren LeFranc'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin'), (SELECT actor_id FROM actors WHERE name = 'Colin Farrell'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin'), (SELECT actor_id FROM actors WHERE name = 'Cristin Milioti'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin'), (SELECT actor_id FROM actors WHERE name = 'Rhenzy Feliz'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Penguin'), 1, 66, '\media\normal\The Penguin\The Penguin.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Lauren Schmidt Hissrich') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Henry Cavill') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Freya Allan') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Anya Chalotra') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Joey Batey') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('MyAnna Buring') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('The Witcher', 'Thợ Săn Quái Vật (Phần 3) The Witcher (Season 3) 2023 vì mùa này có thể là quá lớn nên không phát sóng tất cả trong một lượt: nó được phát hành thành hai phần. Part 1 bao gồm tập 1 đến tập 5 đã ra mắt vào hôm nay (29/6). Part 2, bao gồm các tập từ 6 đến 8, ra mắt vào ngày 27 tháng 7.
Đối với một số bối cảnh khác, sê-ri thứ ba dựa trên cuốn tiểu thuyết thứ hai trong cuốn sách The Witcher saga: Time of Contempt. Điều này sẽ chứng kiến ​​​​rất nhiều quái vật và pháp sư để chống lại như Geralt of Rivia (Henry Cavill), Công chúa Cirilla của Cintra (Freya Allan) và Yennefer of Vengerberg (Anya Chalotra) có một số thay đổi lớn ở thế giới khác trong tay họ.
Đằng sau hậu trường, phần 3 tạo bối cảnh cho một số thay đổi *chính* trong sê-ri. Cụ thể, đây là loạt phim cuối cùng có sự góp mặt của Henry Cavill trong vai Liam Hemsworth sẽ đảm nhận vai diễn của anh ấy trong phần 4 .', '2023-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\The Witcher\the witcher 3.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT director_id FROM directors WHERE name = 'Lauren Schmidt Hissrich'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT actor_id FROM actors WHERE name = 'Henry Cavill'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT actor_id FROM actors WHERE name = 'Freya Allan'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT actor_id FROM actors WHERE name = 'Anya Chalotra'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT actor_id FROM actors WHERE name = 'Joey Batey'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher'), (SELECT actor_id FROM actors WHERE name = 'MyAnna Buring'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'The Witcher') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Doãn Đào') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Đặng Vi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Hướng Hàm Chi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trần Hâm Hải') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Trương Duy') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Tiên Đài Có Cây', 'Tiên Đài Có Cây Love of the Divine Tree 2024 “Tiên Đài Có Cây” là bộ phim võ hiệp do đạo diễn Doãn Đào chỉ đạo, với sự tham gia của Đặng Vi và Hướng Hàm Chi. Phim được chuyển thể từ tiểu thuyết của Tấn Giang Cuồng Thượng Gia Cuồng. Câu chuyện xoay quanh Tô Dịch Thủy (Đặng Vi), một thiên tài võ thuật, và sư phụ của anh, Mục Thanh Ca (Hướng Hàm Chi). Mười tám năm trước, Mục Thanh Ca đã thay đổi số phận của Tô Dịch Thủy, khiến cô trở thành ""Nữ Ma Đầu"" và chịu án oan. Mười tám năm sau, cô đã biến thành Tiết Nhiễm Nhiễm, và Tô Dịch Thủy giờ là Trưởng môn phái Tây Sơn. Anh đưa Tiết Nhiễm Nhiễm vào phái của mình, hứa sẽ bảo vệ cô. Mối quan hệ của họ sẽ đầy bi hài và cảm động khi họ đối mặt với những thử thách trong tình thầy trò đặc biệt này.', '2024-01-01', 40, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Tiên Đài Có Cây\Tien dai co cay.png', '\media\normal\Tiên Đài Có Cây\Tiên Đài Có Cây - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), (SELECT director_id FROM directors WHERE name = 'Doãn Đào'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), (SELECT actor_id FROM actors WHERE name = 'Đặng Vi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), (SELECT actor_id FROM actors WHERE name = 'Hướng Hàm Chi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), (SELECT actor_id FROM actors WHERE name = 'Trần Hâm Hải'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), (SELECT actor_id FROM actors WHERE name = 'Trương Duy'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Tiên Đài Có Cây'), 1, 46, '\media\normal\Tiên Đài Có Cây\Tiên Đài Có Cây.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('N/A') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Toàn Chức Pháp Sư', 'Toàn Chức Pháp Sư 5 Quanzhi Fashi 5th Season 2021 kể về câu chuyện của Mo Fan, một học sinh trung học nhận thấy mình đang ở trong một vũ trụ song song chứa đầy phép thuật. Mọi thứ trong vũ trụ này đều giống với kiếp trước của anh ấy. Anh vẫn là con của một người lao động nghèo và là anh em kế của một người chị bị tàn tật. Trong vũ trụ này, những học sinh giỏi nhất được dạy sử dụng ma thuật để tự vệ khỏi những con thú bất chính ẩn nấp trong rừng sâu xung quanh thành phố', '2021-01-01', 12, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Toàn Chức Pháp Sư\toan chuc phap su.png', '\media\normal\Toàn Chức Pháp Sư\Toàn Chức Pháp Sư - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Toàn Chức Pháp Sư'), (SELECT director_id FROM directors WHERE name = 'N/A'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Toàn Chức Pháp Sư') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Toàn Chức Pháp Sư'), 1, 20, '\media\normal\Toàn Chức Pháp Sư\Toàn Chức Pháp Sư.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Thần Thoại') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Zack Snyder') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Eric Carrasco') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Sylvia Hoeks') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Stuart Martin') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Pilou Asbæk') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('John') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Twilight of the Gods', 'Ngày Tàn Của Các Vị Thần Twilight of the Gods 2024 là một series phim hoạt hình dành cho người lớn của Mỹ, dựa trên thần thoại Bắc Âu, được tạo ra bởi Zack Snyder. Phim được sản xuất bởi The Stone Quarry và Xilam Animation, và dự kiến sẽ phát sóng trên Netflix vào ngày 19 tháng 9 năm 2024. Series này đi sâu vào các sự kiện dẫn đến sự hủy diệt của Midgard và Asgard, cũng như cái chết của hầu hết các vị thần Æsir và Vanir trong một trận chiến cuối cùng chống lại cái ác, lực lượng thiên nhiên và các người khổng lồ.', '2024-01-01', 8, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Twilight of the Gods\twilight of the god.png', '\media\normal\Twilight of the Gods\Twilight of the Gods - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT director_id FROM directors WHERE name = 'Zack Snyder'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT director_id FROM directors WHERE name = 'Eric Carrasco'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT actor_id FROM actors WHERE name = 'Sylvia Hoeks'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT actor_id FROM actors WHERE name = 'Stuart Martin'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT actor_id FROM actors WHERE name = 'Pilou Asbæk'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), (SELECT actor_id FROM actors WHERE name = 'John'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods') , (SELECT genre_id FROM genres WHERE name = 'Phim Thần Thoại'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Twilight of the Gods'), 1, 33, '\media\normal\Twilight of the Gods\Twilight of the Gods.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hành Động') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Kelly Marcel') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Tom Hardy') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Juno Temple') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Alanna Ubach') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Stephen Graham') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Venom 3', 'Venom 3: Kèo Cuối Venom: The Last Dance 2024 là phần cuối trong loạt phim Venom tiếp nối câu chuyện của Eddie Brock và Venom sau khi họ trở về vũ trụ của mình từ chuyến du hành ngắn ngủi sang MCU trong ""Spider-Man: No Way Home"" (2021).  Lần này cặp đôi cộng sinh phải đối mặt với những thách thức mới khi bị săn đuổi bởi cả hai thế giới: loài người và đồng loại của Venom.Cụ thể hơn Eddie bị truy đuổi bởi một tổ chức bí ẩn muốn bắt giữ Venom để nghiên cứu, trong khi Venom phải đối đầu với một symbiote mới đến từ hành tinh của mình.  Mối quan hệ giữa Eddie và Venom cũng bị ảnh hưởng nặng nề bởi những biến cố này, đẩy họ đến ""điệu nhảy cuối cùng"" đầy bi kịch.', '2024-01-01', 1, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Venom 3\venom the last dance.png', '') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), (SELECT director_id FROM directors WHERE name = 'Kelly Marcel'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), (SELECT actor_id FROM actors WHERE name = 'Tom Hardy'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), (SELECT actor_id FROM actors WHERE name = 'Juno Temple'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), (SELECT actor_id FROM actors WHERE name = 'Alanna Ubach'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), (SELECT actor_id FROM actors WHERE name = 'Stephen Graham'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3') , (SELECT genre_id FROM genres WHERE name = 'Phim Hành Động'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Venom 3'), 1, 3, '\media\normal\Venom 3\Venom 3.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Viễn Tưởng') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Stephan Franck') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jeffrey Wright') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Terri Douglas') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Matthew Wood') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('What If 2', 'What If…? (Phần 2) Sẽ Ra Sao Nếu...? (Season 2) 2023 Mùa thứ hai của What If...? tiếp tục khám phá các thực tế thay thế trong vũ trụ Marvel, từ Nebula gia nhập Nova Corps đến Peter Quill tấn công nhóm anh hùng mạnh nhất Trái Đất. Mỗi tập phim là một câu chuyện riêng biệt với những khả năng và kết cục mới mẻ cho các nhân vật quen thuộc.
một series phim hoạt hình thuộc vũ trụ điện ảnh Marvel, đã ra mắt trên Disney+ vào ngày 22 tháng 12 năm 2023. Phần này khám phá các thời không thay thế, cho thấy điều gì sẽ xảy ra nếu các sự kiện quan trọng trong MCU xảy ra khác đi. Mùa gồm chín tập phim với các câu chuyện như ""What If... Nebula Joined the Nova Corps?"" và ""What If... Peter Quill Attacked Earth''s Mightiest Heroes?"" Các tập phim sẽ được phát hành hàng ngày cho đến ngày 30 tháng 12 năm 2023.', '2023-01-01', 9, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\What If 2\what if 2.png', '\media\normal\What If 2\What If 2 - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2'), (SELECT director_id FROM directors WHERE name = 'Stephan Franck'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2'), (SELECT actor_id FROM actors WHERE name = 'Jeffrey Wright'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2'), (SELECT actor_id FROM actors WHERE name = 'Terri Douglas'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2'), (SELECT actor_id FROM actors WHERE name = 'Matthew Wood'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2') , (SELECT genre_id FROM genres WHERE name = 'Phim Viễn Tưởng'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'What If 2'), 1, 29, '\media\normal\What If 2\What If 2.mp4');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Chiếu Rạp') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Peter Sohn') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Leah Lewis') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Mamoudou Athie') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Xứ Sở Các Nguyên Tố', 'Xứ Sở Các Nguyên Tố Elemental 2023 Bộ Phim Hoạt Hình của Mỹ phát sóng 2023 này kể về một thế giới nơi các yếu tố tự nhiên được nhân hóa. Nguyên tố lửa Ember Lumen (Lewis) phải lòng nguyên tố nước Wade Ripple (Athie) sau cuộc gặp gỡ định mệnh. Mặc dù không thể chạm vào nhau, nhưng Ember và Wade nhận ra họ có rất nhiều điểm chung. Thông qua câu chuyện tình yêu nhiều rào cản của nước và lửa, bộ phim mong muốn truyền tải những thông điệp tích cực về nạn phân biệt chủng tộc hiện vẫn còn tồn tại ở khắp nơi trên thế giới.', '2023-01-01', 1, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\media\normal\Xứ Sở Các Nguyên Tố\elemental.png', '\media\normal\Xứ Sở Các Nguyên Tố\Xứ Sở Các Nguyên Tố - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố'), (SELECT director_id FROM directors WHERE name = 'Peter Sohn'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố'), (SELECT actor_id FROM actors WHERE name = 'Leah Lewis'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố'), (SELECT actor_id FROM actors WHERE name = 'Mamoudou Athie'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố') , (SELECT genre_id FROM genres WHERE name = 'Phim Chiếu Rạp'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Xứ Sở Các Nguyên Tố'), 1, 101, '\media\normal\Xứ Sở Các Nguyên Tố\Xứ Sở Các Nguyên Tố.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Vũ') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Cảnh Du') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Tôn Thiên') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Đông Chí', 'Đông Chí Love Song in Winter 2024 Bác sĩ gây mê Lục Yên (do Tôn Thiên thủ vai) trong một ca trực đêm tình cờ ""gặp lại"" người bạn thân Đặng Mạn (do Hà Hồng Sâm thủ vai) người đã qua đời nhiều năm trước. Từ đó hàng loạt sự việc kỳ lạ bắt đầu xảy ra xung quanh cô.
Trong quá trình điều tra để tìm hiểu sự thật, Lục Yên và người yêu cũ – cảnh sát hình sự Giang Thành Ngật (do Hoàng Cảnh Du thủ vai) – bị cuốn vào một vụ án giết người hàng loạt. Hai người cùng nhau làm sáng tỏ bí mật bị chôn giấu suốt tám năm, hóa giải những hiểu lầm trong quá khứ và hàn gắn lại tình cảm đã tan vỡ.', '2024-01-01', 36, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\media\normal\Đông Chí\love song in winter.png', '\media\normal\Đông Chí\Đông Chí - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Đông Chí'), (SELECT director_id FROM directors WHERE name = 'Vũ'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Đông Chí'), (SELECT actor_id FROM actors WHERE name = 'Cảnh Du'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Đông Chí'), (SELECT actor_id FROM actors WHERE name = 'Tôn Thiên'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Đông Chí') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Đông Chí'), 1, 37, '\media\normal\Đông Chí\Đông Chí.mp4');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Tình Cảm') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Chen Shu Jun') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Garvey Jin') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Feng Chu Xuan') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Chang Zhe Kuan') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Liu De Xi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jacinda Li') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('101 Lần Hôn Nhân Cưỡng Ép', '101 Lần Hôn Nhân Cưỡng Ép 101 Marriages 2024 Tình yêu và hôn nhân, đôi khi giống như những hạt cát, cố gắng nắm chặt lại càng trôi đi. Đây là câu chuyện đầy bi kịch của cặp vợ chồng Thịnh Thế và Cố Lan San, hai người bắt đầu mối quan hệ với nhau dẫn đến hôn nhân đầy đau khổ và mâu thuẫn.
Thịnh Thế và Cố Lan San có một khởi đầu không suôn sẻ. Thịnh Thế, từng mê Cố Lan San từ thời học trung học, nhưng cô lại không để ý đến anh và yêu người khác. Thịnh Thế, với tâm trí chiếm hữu, đã dùng mọi thủ đoạn để đưa Cố Lan San về bên mình, thậm chí bắt ép cô trở thành vợ mình bằng các biện pháp đau lòng.
Cuộc hôn nhân của họ bắt đầu trong tiếc nuối và uất ức. Mặc dù đến với nhau thông qua sự ép buộc, cả hai cuối cùng cũng phải đối diện với thử thách thực sự của tình yêu và hôn nhân khi em trai của Cố Lan San gặp nạn và cần sự giúp đỡ của Thịnh Thế.
Nhìn nhận và hiểu rõ tình cảm của đối phương, Thịnh Thế và Cố Lan San đã dần trưởng thành và học được rằng chỉ khi họ giúp đỡ, thông cảm và thấu hiểu cho nhau, họ mới có thể cảm nhận được sự thật về tình yêu đích thực và tạo cho mình cơ hội để bắt đầu lại. Đó là lúc họ biết rằng chỉ bằng cách giải thoát cho nhau, họ mới thật sự có thể tìm thấy niềm tin và cơ hội cho một hồi sinh mới, nơi tình yêu có thể bắt đầu rực cháy trong hạnh phúc và sự chân thành.', '2024-01-01', 24, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\hls\101 Lần Hôn Nhân Cưỡng Ép\101 marriages.png', '\hls\101 Lần Hôn Nhân Cưỡng Ép\101 Lần Hôn Nhân Cưỡng Ép - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Chen Shu Jun'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Garvey Jin'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Feng Chu Xuan'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Chang Zhe Kuan'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Liu De Xi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), (SELECT actor_id FROM actors WHERE name = 'Jacinda Li'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép') , (SELECT genre_id FROM genres WHERE name = 'Phim Tình Cảm'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = '101 Lần Hôn Nhân Cưỡng Ép'), 1, 37, '\hls/101 Lần Hôn Nhân Cưỡng Ép/epi_num1/master.m3u8');
INSERT INTO nations (name) VALUES ('Phim Âu Mỹ') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Hoạt Hình') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Anime') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Ash Brannon') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Vi') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jinx') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Jayce') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Caitlyn') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Silco') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Arcane (Liên Minh Huyền Thoại)', 'Arcane (Liên Minh Huyền Thoại) Arcane: Animated Series 2021 Lấy bối cảnh trong quá khứ, phim kể lại câu chuyện nguồn gốc của một số nhân vật từ Piltover và Zaun. Giống như trò chơi liên minh huyền thoại, Arcane nhắm đến đối tượng ""14+"" và sẽ đi sâu về một số chủ đề lớn hơn.  Vào tháng 9 năm 2021, đã có thông báo rằng Hailee Steinfeld , Ella Purnell , Kevin Alejandro , Katie Leung , Jason Spisak , Toks Olagundoye , JB Blanc và Harry Lloyd đã tham gia lồng tiếng.
Arcane lấy bối cảnh Piltover không tưởng và thế giới ngầm bị áp bức của Zaun, từ đây sẽ kể về nguồn gốc của hai nhà vô địch Liên minh mang tính biểu tượng và sức mạnh có thể chia cắt họ, họ chấp nhận số phậ', '2021-01-01', 9, (SELECT nation_id FROM nations WHERE name = 'Phim Âu Mỹ'), '\hls\Arcane (Liên Minh Huyền Thoại)\acrane.png', '\hls\Arcane (Liên Minh Huyền Thoại)\Arcane (Liên Minh Huyền Thoại) - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT director_id FROM directors WHERE name = 'Ash Brannon'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT actor_id FROM actors WHERE name = 'Vi'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT actor_id FROM actors WHERE name = 'Jinx'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT actor_id FROM actors WHERE name = 'Jayce'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT actor_id FROM actors WHERE name = 'Caitlyn'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), (SELECT actor_id FROM actors WHERE name = 'Silco'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)') , (SELECT genre_id FROM genres WHERE name = 'Phim Hoạt Hình'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)') , (SELECT genre_id FROM genres WHERE name = 'Phim Anime'));
INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Arcane (Liên Minh Huyền Thoại)'), 1, 37, '\hls/Arcane (Liên Minh Huyền Thoại)/epi_num1/master.m3u8');
INSERT INTO nations (name) VALUES ('Phim Trung Quốc') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Cổ Trang') ON CONFLICT DO NOTHING;
INSERT INTO genres (name) VALUES ('Phim Thần Thoại') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Cố Chí Vi') ON CONFLICT DO NOTHING;
INSERT INTO directors (name) VALUES ('Chu Nhuệ Bân') ON CONFLICT DO NOTHING;
INSERT INTO actors (name) VALUES ('Bạch Lộc') ON CONFLICT DO NOTHING;
INSERT INTO movies (title, description, release_date, runtime, nation_id, poster_url, trailer_url) VALUES ('Bạch Nguyệt Phạn Tinh', 'Bạch Nguyệt Phạn Tinh Moonlight Mystique 2025 do Chu Nhuệ Bân đạo diễn, với sự tham gia của Bạch Lộc trong vai Bạch Thước, Ngao Thụy Bằng trong vai Phạm Việt, cùng Đại Lộ Oa và Thường Hoa Sâm. Phim được chuyển thể từ tiểu thuyết nổi tiếng của Tinh Linh.
Câu chuyện xoay quanh Bạch Thước, con gái út trong một gia đình tướng quân, có ước nguyện trở thành tiên nhân để đền đáp ơn nghĩa người đã cứu sống mình thuở nhỏ. Trên hành trình tìm kiếm tiên nhân, cô đã tình cờ cứu sống Phạm Việt, yêu vương của yêu tộc.
Từ sự gặp gỡ đầy bất ngờ ấy, Bạch Thước và Phạm Việt trải qua nhiều thăng trầm trong mối quan hệ, từ những lợi dụng lẫn nhau qua những thử thách và hiểu lầm, họ dần dần nảy sinh tình cảm sâu sắc. Tuy nhiên, tình yêu ấy lại không thiếu phần đau thương và phải đối mặt với nhiều khó khăn cũng như những cuộc chia cách.
Dù phải vượt qua muôn vàn thử thách, tình yêu giữa họ vẫn đủ mạnh mẽ để chinh phục mọi trắc trở, trở thành một câu chuyện tình cảm chân thành và cảm động, khẳng định sức mạnh của tình yêu vượt qua thời gian và số phận.', '2025-01-01', 40, (SELECT nation_id FROM nations WHERE name = 'Phim Trung Quốc'), '\hls\Bạch Nguyệt Phạn Tinh\Bach nguyet phan tinh.png', '\hls\Bạch Nguyệt Phạn Tinh\Bạch Nguyệt Phạn Tinh - Trailer.mp4') RETURNING movie_id;
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh'), (SELECT director_id FROM directors WHERE name = 'Cố Chí Vi'));
INSERT INTO movieDirectors (movie_id, director_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh'), (SELECT director_id FROM directors WHERE name = 'Chu Nhuệ Bân'));
INSERT INTO movieActors (movie_id, actor_id) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh'), (SELECT actor_id FROM actors WHERE name = 'Bạch Lộc'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh') , (SELECT genre_id FROM genres WHERE name = 'Phim Cổ Trang'));
INSERT INTO movieGenres (movie_id, genre_id)VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh') , (SELECT genre_id FROM genres WHERE name = 'Phim Thần Thoại'));

INSERT INTO episodes (movie_id, episode_number, runtime, url_video) VALUES ((SELECT movie_id FROM movies WHERE title = 'Bạch Nguyệt Phạn Tinh'), 1, 37, 'http://localhost:8080\hls/Bạch Nguyệt Phạn Tinh/epi_num1/master.m3u8');


-- tin tức data


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

('Na tra 2 khuynh đảo phòng vé quốc tế',
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
 'static/assets/docx/wtpring/images/image1.jpg', '2025-02-19 15:30:00', TRUE)


