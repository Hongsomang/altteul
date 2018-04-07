create table worker(
	worker_phonenumber varchar(100) not null,
    name varchar(100) not null,
    password varchar(100) not null,
    primary key(worker_phonenumber)
    
); 
create table workspace(
	work_id varchar(100) not null, /*사업*/
    word_address varchar(100) not null,
    captain_phonenumber varchar(100),
    primary key(work_id)
);
create table captain (
	captain_phonenumber varchar(100) not null,
    name varchar(100) not null,
    password varchar(100) not null,
    primary key(captain_phonenumber)
);
create table work_list(
	work_list_id int not null,
    startwork_time varchar(100),
    finishwork_time varchar(100),
    today_date varchar(100),
    today_day varchar (100),
    moneny int,
    reason varchar(500),
    workspace_work_id varchar(100),
    primary key(work_list_id)
);
create table work_time_save(
	work_time_save_id int(100) not null,
    start_work_save varchar(100) ,
    finish_work_save varchar(100),
    day_save varchar(100),
    workspace_work_id varchar(100),
    worker_phonenumber varchar(100),
    primary key(work_time_save_id)
);
