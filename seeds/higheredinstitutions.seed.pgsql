BEGIN;

TRUNCATE TABLE
  higheredinstitutions
  RESTART IDENTITY CASCADE;

INSERT INTO higheredinstitutions (name, institution_type, short_name,cde_number,cde_name,isCE,isDE)
VALUES 
  ('Community College of Denver','COMMMUNITY_COLLEGE','CCD',1357,'Community College of Denver',true,false),
  ('Arapahoe Community College','COMMMUNITY_COLLEGE','ACC',1346,'Arapahoe Community College', true, false),
  ('Red Rocks Community College','COMMMUNITY_COLLEGE','RRCC',1388,'Red Rocks Community College (Lakewood Campus)', true, false),
  ('Community College of Aurora','COMMMUNITY_COLLEGE','CCA',1392,'Community College of Aurora', true, false),
  ('Aims Community College','COMMMUNITY_COLLEGE','Aims',1352,'Aims Community College',TRUE,FALSE),
  ('CSU Global','UNIVERSITY','CSU-G',9050,'Colorado State University - Global Campus',FALSE,TRUE),
  ('CU Succeed, Colorado Springs','UNIVERSITY','CUS-CS',1374,'University of Colorado - Colorado Springs',FALSE,TRUE),
  ('CU Succeed, Denver','UNIVERSITY','CUS-DEN',1375,'University of Colorado - Denver',FALSE,TRUE),
  ('Emily Griffith Technical College','UNIVERSITY','EGTC',1387,'EMILY GRIFFITH OPPORTUNITY SCHOOL',FALSE,TRUE),
  ('Front Range CC','COMMMUNITY_COLLEGE','FRCC',1391,'Front Range Community College',TRUE,FALSE),
  ('Metro State University of Denver','UNIVERSITY','MSU-Den',1360,'Metropolitan State College',TRUE,TRUE),
  ('Pickens Technical College','UNIVERSITY','Pickens',1330,'Pickens Technical College',TRUE,FALSE),
  ('Pikes Peak Community College','COMMMUNITY_COLLEGE','PPCC',1390,'Pikes Peak Community College',TRUE,FALSE),
  ('University of Colorado at Denver','UNIVERSITY','UCD',1375,'University of Colorado - Denver',FALSE,TRUE),
  ('University of Denver','UNIVERSITY','DU',1371,'University of Denver',FALSE,TRUE),
  ('Western Colorado State Universit','UNIVERSITY','Western',1372,'Western State College of Colorado',TRUE,TRUE),
  ('University of Northern Colorado','UNIVERSITY','UNC',1349,'University of Northern Colorado',FALSE,TRUE),
  ('Norfolk State University','UNIVERSITY','NSU',1300,'ANY OTHER COLLEGE WITHIN COLORADO NOT LISTED',FALSE,TRUE),
  ('AdvanceEDU','UNIVERSITY','AdvEDU',1300,'ANY OTHER COLLEGE WITHIN COLORADO NOT LISTED',FALSE,TRUE);

COMMIT;