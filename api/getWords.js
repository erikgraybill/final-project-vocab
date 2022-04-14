import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
  // connects to the database
  const conn = new PSDB('main');

  // queries all from vocab_database db
  const [dbResult] = await conn.query('select * from VOCAB');

  // cache
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=300');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.json(await dbResult);
}