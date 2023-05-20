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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  gender genders,
  registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  admin admin DEFAULT 'user',
  is_active BOOLEAN NOT NULL DEFAULT FALSE
);