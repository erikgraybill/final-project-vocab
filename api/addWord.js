//addWord.js

import { PSDB } from 'planetscale-node';


export default async function handler(req, res) {
  // this is making wide sweeping assumptions of the data accuracy
  const { word, definition, links } = req.query;
  var vocab_database = {
    "word": word,
    "definition": definition,
    "links": links
  };
  // this option helps establish a more secure connection object
  const conn = new PSDB('main', {namedPlaceholders: true});
  // INSERT the values that came across into the words table
  const [dbResult] = await conn.execute(
    `INSERT INTO vocab_database(word, definition, links) VALUES( :word, :definition, :links)`,
    vocab_database
  );
  // take the id that comes back and then apply to the user object
  vocab_database.id = dbResult.insertId
  res.json(vocab_database);
}