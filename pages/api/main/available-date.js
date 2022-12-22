import axios from 'axios';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).json({ message: '올바르지 않은 요청입니다.' });
  }
  axios({
    url: `${process.env.baseURL}places/${req.body.placeId}/type/${req.body.type}/date/${req.body.date}`,
    rejectUnauthorized: false,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((err) => {
      res.status(400).send(err.response.data.message);
    });
};
export default handler;
