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

create table work_session (
  id int primary key auto_increment not null,
  user_id int not null,
  foreign key (user_id) references user(id) on delete cascade,
  date date not null,
  start time not null,
  end time not null
);

create table work_periods (
  id int primary key auto_increment not null,
  work_session_id int not null,
  foreign key (work_session_id) references work_session(id) on delete cascade,
  start time not null,
  end time not null
);