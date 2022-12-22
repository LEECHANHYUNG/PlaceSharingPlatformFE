import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}places/${req.body.placeId}/review?page=${req.body.currentPage}`,
        rejectUnauthorized: false,
      });
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data.data.message);
      }
    } catch (error) {
      res.status(400).send(error.response.data);
    }
  }
};
export default handler;
