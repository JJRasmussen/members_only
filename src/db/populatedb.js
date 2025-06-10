const { Client } = require('pg');
const { format } = require('date-fns');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const timeOfCreation = format(new Date(), "hh:mm 'on' dd/MM/yyyy");
const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, parseInt(process.env.HASH_LENGTH));

const SQL = `
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 22 ),
    hashed_password VARCHAR ( 255 ),
    user_creation_time TIMESTAMP,
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INTEGER references users(id),
    title VARCHAR ( 50 ),
    message_timestamp TIMESTAMP,
    text_content VARCHAR ( 255 )
);

INSERT INTO users (username, hashed_password, user_creation_time, is_member, is_admin) VALUES
    ('${process.env.ADMIN_USERNAME}', '${hashedPassword}', '${timeOfCreation}', true, true);
`

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`, //sslmode=require is needed when externally acessing Render db
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();