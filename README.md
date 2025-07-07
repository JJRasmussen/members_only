# The "Members Only" project from The Odin Project
## Project description
An open message board where with anonymized messages.
To create a message the user needs to login.
To view the author of other users messages the user needs to become a member.

## Technologies used
- Node with the Express framework
- Passport.js for authentication w. the local strategy
- EJS as the view engine
- PostgreSQL as the database

## Site map overview

![image](https://github.com/user-attachments/assets/79f30468-612b-400b-9fd3-f26f682018c4)

## Database design:
For the postgreSQL database I will need three tables.
1. The users, with their information and hashed password.
2. The messages, their creation date and the associated user.
3. The session table used by pg-connect-simple to keep track of sessions.


_A link to the project description can be found here:_
https://www.theodinproject.com/lessons/node-path-nodejs-members-only
