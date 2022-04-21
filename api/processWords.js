import { PSDB } from 'planetscale-node';

export default async function handler(req, res) {
    console.log(req.query);
    const url = '/api/getWords';
    const words = [];
    const { paragraph } = req.query;
    const wordArray = paragraph.split(" ");

    await fetch(url).then(res => res.json()).then((data) => {
        words = data.filter(el => wordArray.includes(el.Word));
        // for(const item of data) {
        // }
    });

    console.log(words);
    res.json(words); 
}