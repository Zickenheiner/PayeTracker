create table user (
  id int primary key auto_increment not null,
  email varchar(40) not null unique,
  hashed_password varchar(255) not null,
  firstname varchar(40) not null,
  lastname varchar(40) not null,
  birthdate date not null,
  sex varchar(5) not null,
  rate float not null
);