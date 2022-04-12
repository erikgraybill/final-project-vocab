import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
    console.log(req.query);

    const { paragraph } = req.query;
    wordArray = paragraph.split(" ");

    

}