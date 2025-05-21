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

## Database design:
For the postgreSQL database I will need two tables.
1. The users, with their information and password.
2. The messages, their creation date and the associated user.
![image](https://github.com/user-attachments/assets/83443ed6-71b3-4ebc-8111-ecafe54be2b9)

_A link to the project description can be found here:_
https://www.theodinproject.com/lessons/node-path-nodejs-members-only
