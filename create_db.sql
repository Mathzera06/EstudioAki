USE estudio_aki;
SELECT * FROM users;

CREATE TABLE users (
	id int primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;