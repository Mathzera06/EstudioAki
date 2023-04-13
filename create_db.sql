USE estudio_aki;
SELECT * FROM users;

CREATE TABLE users (
	id int primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);

CREATE TABLE tb_instrumentos (
id_instrumentos int primary key auto_increment,
id_estudio int,
instrumento varchar(200),
descricao varchar(200)
)

CREATE TABLE tb_agenda (
id_agenda int primary key auto_increment,
datas_estudios timestamp,
id_estudio int
)

CREATE TABLE tb_estudio(
id_estudio int primary key auto_increment,
nome_estudio varchar(40),
endereco varchar(100),
logradouro varchar(100),
bairro varchar(100),
estado varchar(50),
datas_estudio timestamp
)


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
