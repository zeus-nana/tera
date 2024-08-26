// import { Knex } from 'knex';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
//
// dotenv.config();
//
// /**
//  * Insert the default Administrator to the database. The ADMIN_USERNAME and the ADMIN_PASSWORD are
//  * previously stored in * the config.env file. Note that if you want to change the default username or
//  * password you will need to change the ADMIN_USERNAME and ADMIN_PASSWORD found in the config.env file.
//  * The same occurs if you want to change the number of ROUNDS.
//  *
//  * @param knex The database controller used to seed the entries to the specific table.
//  */
// export async function seed(knex: Knex) {
// 	await knex('administrators').insert({
// 		username: String(process.env.ADMIN_USERNAME),
// 		password: bcrypt.hashSync(String(process.env.ADMIN_PASSWORD), Number(process.env.ROUNDS))
// 	});
// }
