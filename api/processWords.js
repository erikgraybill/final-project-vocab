import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
    console.log(req.query);

    const { paragraph } = req.query;
    const wordArray = paragraph.split(" ");

    const conn = new PSDB('main');
    const [dbResult] = await conn.query('SELECT * FROM VOCAB');

    const filteredArray = dbResult.filter(value => wordArray.includes(value.Word));

    res.json(await filteredArray);
}