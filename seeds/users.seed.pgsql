BEGIN;

TRUNCATE TABLE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (last_name,first_name,email,password,role)
VALUES 
  ('Peter','Tardif','peter_tardif@dpsk12.org','DPSce123','SUPERUSER'),
  ('Erica','Ryan','erica_ryan@dpsk12.org','DPSce123','SUPERUSER'),
  ('Alejandra','Gallardo','alejandra_gallardo@dpsk12.org','DPSce123','SUPERUSER'),
  ('Tara','Schneider','tara_schneider@dpsk12.org','DPSce123','SUPERUSER'),
  ('Kelly','Gilmore','kelly_gilmore@dpsk12.org','DPSce123','SUPERUSER'),
  ('Alejandra','Nevarez','alejandra_nevarez@dpsk12.org','DPSce123','SUPERUSER');

COMMIT;