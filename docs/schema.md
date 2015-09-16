# Schema Information

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
followee_id | integer   | not null, foreign key (references users)
follower_id | integer   | not null, foreign key (references users)

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null
url         | string    | not null
plays       | integer   | not null (must be at least 0)
pic         | blob      |
description | text      |
private     | boolean   | not null

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
text        | string   | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks)
tag_id      | integer   | not null, foreign key (references tags)

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks)
liker_id    | integer   | not null, foreign key (references users)

## reposts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks)
reposter_id | integer   | not null, foreign key (references users)

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks)
commenter_id| integer   | not null, foreign key (references users)
comment     | string    | not null
track_time  | integer   | not null (measured in seconds)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
fname           | string    | not null
lname           | string    | not null
display_name    | string    |
location        | string    |
profile_pic     | blob      |
password_digest | string    | not null
session_token   | string    | not null, unique
