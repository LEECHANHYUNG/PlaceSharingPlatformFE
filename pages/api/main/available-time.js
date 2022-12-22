import axios from 'axios';

const handler = (req, res) => {
  axios({
    url: `${process.env.baseURL}places/${req.body.placeId}/type/${req.body.selectedTypeEng}/date/${req.body.date}/startTime/${req.body.startTime}`,
    rejectUnauthorized: false,
    data: req.data,
  })
    .then((response) => {
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.response.data.message });
    });
};
export default handler;
