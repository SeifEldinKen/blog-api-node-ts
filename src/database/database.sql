CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE blog_db;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)