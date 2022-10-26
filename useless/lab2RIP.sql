CREATE USER dbuser@'localhost' IDENTIFIED BY '1233';

DROP DATABASE gym_db;

CREATE DATABASE `gym_db` CHARACTER SET utf8 COLLATE utf8_general_ci;

GRANT ALL PRIVILEGES ON gym_db.* TO dbuser@'localhost';
use gym_db;
show tables;

select * from users WHERE login = "zaycev";
select * from workouts;
select * from exercises;
select * from workouts_exercises;
truncate workouts_exercises;
truncate exercises;

insert into users (login, password) values("pvrts","1233"),("shako","bukakchi"),("bibik", "camryOneLove");

insert into workouts (name,description,difficulty,duration,owner_id) values("Для реальных нигеров","все что тебе нужно, чтобы стать OG",10,"01:30:00",1), ("рыцарь","сделай из своего тела латы",7,"01:15:00",2);

insert into exercises (name,description,muscle_group,difficulty,video_url) 
values("Приседания","Базовое упражнение, которое поможет тебе прокачать твои костыли и сделать из них настоящие гусеницы для танка.", "ноги", 3, "youtube"),
("Отжимания", "Самое простое и примитивное упражнение. Используется в любой армии мира, в любом виде спорта, любой health-coach включит их в твою ЛИЧНУЮ программу и все это не просто так. Сделают из тебя монстра в кратчайшие сроки, используй как можно чаще.", "руки", 5, "youtube" ),
("Подтягивания", "Твой каркас, фундамент, основа. На нем ты будешь строить свой театр имени мышц. ", "верх", 8,"youtube" );

insert into workouts (name,description,difficulty,duration,owner_id) values
("Молодая мама","простой набор для восстановления молодых мам после беременности.",2,"00:30:00",1),
 ("Детский набор","отличный набор для маленьких спортсменов",3,"00:45:00",1),
 ("Демон-Итер","25 душ, 7 слотов, годлайк ",2,"00:25:00",1)
 ;
 


insert into workouts_exercises (workout_id,exercise_id) values(1,1),(1,2),(1,3),
(2,1),(2,2),
(3,1),(3,2),
(4,1),(4,2),(4,3),
(5,1),(5,2),(5,3)
;
insert into workouts_exercises (workout_id,exercise_id) values(5,1),(5,2),(5,3);
SET FOREIGN_KEY_CHECKS = 0;
UPDATE WORKOUTS SET name = REPLACE(name,"Для реальных нигеров","Мощная тренировка");
UPDATE WORKOUTS SET name = REPLACE(name,"рыцарь","Рыцарская");
SET SQL_SAFE_UPDATES = 0;