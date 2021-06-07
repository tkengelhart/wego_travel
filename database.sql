
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "itinerary" (
	"id" serial NOT NULL,
	"start" DATE,
	"end" DATE,
	"trip_name" TEXT,
	CONSTRAINT "itinerary_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "activity" (
	"id" serial NOT NULL,
	"name" TEXT,
	"constraints" TEXT,
	"activity_url" varchar(255),
	"activity_location" varchar(255),
	CONSTRAINT "activity_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "_itinerary" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"itinerary_id" int NOT NULL,
	CONSTRAINT "user_itinerary_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itinerary_activity" (
	"id" serial NOT NULL,
	"itinerary_id" serial NOT NULL,
	"activity_id" serial NOT NULL,
	"time_of_day" varchar(255),
	"date" DATE,
	"notes" TEXT,
	CONSTRAINT "itinerary_activity_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "user_itinerary" ADD CONSTRAINT "user_itinerary_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_itinerary" ADD CONSTRAINT "user_itinerary_fk1" FOREIGN KEY ("itinerary_id") REFERENCES "itinerary"("id");

ALTER TABLE "itinerary_activity" ADD CONSTRAINT "itinerary_activity_fk0" FOREIGN KEY ("itinerary_id") REFERENCES "itinerary"("id");
ALTER TABLE "itinerary_activity" ADD CONSTRAINT "itinerary_activity_fk1" FOREIGN KEY ("activity_id") REFERENCES "activity"("id");

INSERT INTO "user" (username, password)
VALUES ('test2', 'test2');

INSERT INTO "itinerary" ("start", "end", "trip_name") 
VALUES ('08-13-2021', '08-21-2021', 'nashville');

INSERT INTO "itinerary" ("start", "end", "trip_name") 
VALUES ('10-02-2021', '10-05-2021', 'minneapolis');

INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
VALUES ('grand ole opry', 'must do august 13 or 14', 'https://www.opry.com/', 'nashville'), ('dollywood', 'none', 'https://www.dollywood.com/', 'pigeon forge');

SELECT * FROM "activity";

INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
VALUES ('mall of america', 'none', 'https://www.mallofamerica.com/', 'minneapolis');

INSERT INTO "itinerary_activity" ("itinerary_id", "activity_id", "time_of_day", "date", "notes")
VALUES ('1', '1', 'evening', '08-13-2021', 'whole family');

INSERT INTO "user_itinerary" ("user_id", "itinerary_id")
VALUES ('1', '1');

INSERT INTO "user_itinerary" ("user_id", "itinerary_id")
VALUES ('1', '2');

INSERT INTO "itinerary_activity" ("itinerary_id", "activity_id", "time_of_day", "date", "notes")
VALUES ('2', '3', 'morning', '10-03-2021', 'open 11-7pm');


SELECT "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
LEFT JOIN
"activity"
ON 
"activity"."id" = "itinerary_activity"."activity_id";

SELECT "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
LEFT JOIN
"activity"
ON 
"activity"."id" = "itinerary_activity"."activity_id"
JOIN
"itinerary"
ON
"itinerary"."id" = "itinerary_activity"."itinerary_id"
WHERE "itinerary"."trip_name" = 'nashville';


INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
VALUES ('capitol', 'none', 'none', 'bismarck');

DELETE FROM "activity"
WHERE "activity"."id" = 4;

UPDATE "itinerary_activity" SET "time_of_day" = 'afternoon' 
WHERE "itinerary_activity"."id" = 2;