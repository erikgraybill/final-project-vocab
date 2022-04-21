import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
    console.log(req.query);

    const { paragraph } = req.query;
    const wordArray = paragraph.split(/([_\W])/);

    const conn = new PSDB('main');
    const [dbResult] = await conn.query('SELECT * FROM VOCAB');

    const filteredArray = wordArray.filter(value => dbResult.includes(value));

    res.json(await filteredArray);
}