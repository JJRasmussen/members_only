const { Client } = require('pg');
const { format } = require('date-fns');
require('dotenv').config({ path: '../.env' });

const SQL = `
CREATE TABLE IF NOT EXISTS `