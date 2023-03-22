import Knex from 'knex';
import knexFile from './knexfile';

const env = process.env.NODE_ENV || 'development'
const options = knexFile[env];

console.log('options', options)

export default Knex(options)