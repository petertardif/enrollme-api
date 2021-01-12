CREATE TABLE students (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER 
    REFERENCES users(id) ON DELETE SET NULL NOT NULL,
  gender TEXT,
  dob TEXT,
  race_ethnicity TEXT,
  isSped BOOLEAN DEFAULT false,
  isEnglishLearner BOOLEAN DEFAULT false,
  isDeleted BOOLEAN DEFAULT false NOT NULL,
  isActive BOOLEAN DEFAULT true NOT NULL,
  updatedAt TIMESTAMPTZ DEFAULT now() NOT NULL
);