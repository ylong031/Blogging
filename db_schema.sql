
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)



CREATE TABLE IF NOT EXISTS blogSettings  (
    id INTEGER,
    blog_title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    author_name TEXT NOT NULL,
    UNIQUE(id)

);

CREATE TABLE IF NOT EXISTS articlesList (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL, 
    created TEXT NOT NULL,
    last_modified TEXT NOT NULL,
    article TEXT NOT NULL,
    publish TEXT NOT NULL,
    likes INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS commentSection (
    comment TEXT NOT NULL,
    posted TEXT NOT NULL,
    id INTEGER NOT NULL,
    FOREIGN KEY (id)
       REFERENCES articlesList (id) 
       ON DELETE CASCADE
);

--insert default data (if necessary here)



INSERT OR IGNORE INTO blogSettings('id','blog_title', 'subtitle','author_name') VALUES(1,'Adventure In Code', 'Coding Journey','Simon');


COMMIT;

