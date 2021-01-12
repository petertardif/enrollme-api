BEGIN;

TRUNCATE TABLE
  higheredinstitutions
  RESTART IDENTITY CASCADE;

INSERT INTO higheredinstitutions (name, institution_type, short_name,cde_number,cde_name,isCE,isDE)
VALUES 
  ('Community College of Denver','2 YEAR COMMMUNITY COLLEGE','CCD',1357,'Community College of Denver',true,false),
  ('Arapahoe Community College','2 YEAR COMMMUNITY COLLEGE','ACC',1346,'Arapahoe Community College', true, false),
  ('Red Rocks Community College','2 YEAR COMMMUNITY COLLEGE','RRCC',1388,'Red Rocks Community College (Lakewood Campus)', true, false),
  ('Community College of Aurora','2 YEAR COMMMUNITY COLLEGE','CCA',1392,'Community College of Aurora', true, false),
  ('Aims Community College','2 YEAR COMMMUNITY COLLEGE','Aims',1352,'Aims Community College',TRUE,FALSE),
  ('CSU Global','4 YEAR UNIVERSITY','CSU-G',9050,'Colorado State University - Global Campus',FALSE,TRUE),
  ('CU Succeed, Colorado Springs','4 YEAR UNIVERSITY','CUS-CS',1374,'University of Colorado - Colorado Springs',FALSE,TRUE),
  ('CU Succeed, Denver','4 YEAR UNIVERSITY','CUS-DEN',1375,'University of Colorado - Denver',FALSE,TRUE),
  ('Emily Griffith Technical College','2 YEAR TECHNICAL COLLEGE','EGTC',1387,'EMILY GRIFFITH OPPORTUNITY SCHOOL',FALSE,TRUE),
  ('Front Range CC','2 YEAR COMMMUNITY COLLEGE','FRCC',1391,'Front Range Community College',TRUE,FALSE),
  ('Metro State University of Denver','4 YEAR UNIVERSITY','MSU-Den',1360,'Metropolitan State College',TRUE,TRUE),
  ('Pickens Technical College','2 YEAR TECHNICAL COLLEGE','Pickens',1330,'Pickens Technical College',TRUE,FALSE),
  ('Pikes Peak Community College','2 YEAR COMMMUNITY COLLEGE','PPCC',1390,'Pikes Peak Community College',TRUE,FALSE),
  ('University of Colorado at Denver','4 YEAR UNIVERSITY','UCD',1375,'University of Colorado - Denver',FALSE,TRUE),
  ('University of Denver','4 YEAR UNIVERSITY','DU',1371,'University of Denver',FALSE,TRUE),
  ('Western Colorado State Universit','4 YEAR UNIVERSITY','Western',1372,'Western State College of Colorado',TRUE,TRUE),
  ('University of Northern Colorado','4 YEAR UNIVERSITY','UNC',1349,'University of Northern Colorado',FALSE,TRUE),
  ('Norfolk State University','4 YEAR UNIVERSITY','NSU',1300,'ANY OTHER COLLEGE WITHIN COLORADO NOT LISTED',FALSE,TRUE),
  ('AdvanceEDU','4 YEAR UNIVERSITY','AdvEDU',1300,'ANY OTHER COLLEGE WITHIN COLORADO NOT LISTED',FALSE,TRUE);

COMMIT;