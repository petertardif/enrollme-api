BEGIN;

TRUNCATE TABLE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (last_name,first_name,email,password,role )
VALUES 
  ('Peter','Tardif','peter_tardif@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER'),
  ('Erica','Ryan','erica_ryan@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER'),
  ('Alejandra','Gallardo','alejandra_gallardo@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER'),
  ('Tara','Schneider','tara_schneider@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER'),
  ('Kelly','Gilmore','kelly_gilmore@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER'),
  ('Alejandra','Nevarez','alejandra_nevarez@dpsk12.org','$2a$12$sGbmo.9ZQDSFIPRXbUEFu.GQLnTtiSFpY6xnaLPADzhjgzEp59qk.','SUPERUSER');

COMMIT;