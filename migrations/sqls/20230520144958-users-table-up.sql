-- create users table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE genders AS ENUM (
  'male',
  'female'
);

CREATE TYPE admin AS ENUM (
  'user',
  'admin'
);


CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username        TEXT NOT NULL,
  email           TEXT NOT NULL,
  password_hashed TEXT NOT NULL,
  gender          genders NOT NULL,
  is_active       BOOLEAN NOT NULL DEFAULT FALSE,
  registered_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login      TIMESTAMP NOT NULL DEFAULT NOW(),
  admin           admin DEFAULT 'user'
);

-- CREATE TABLE users (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   username TEXT NOT NULL,
--   email TEXT NOT NULL,
--   password TEXT NOT NULL,
--   gender genders,
--   is_active BOOLEAN NOT NULL DEFAULT FALSE,
--   registered_at DATETIME NOT NULL DEFAULT UPDATE CURRENT_TIMESTAMP(),
--   updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
--   admin admin DEFAULT 'user'
-- );