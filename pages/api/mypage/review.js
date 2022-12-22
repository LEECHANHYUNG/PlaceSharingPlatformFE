import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}rating/new/${req.body.reservationId}`,
        headers: {
          Authorization: req.body.accessToken,
        },
        method: 'post',
        data: {
          ratingScore: req.body.ratingScore,
          ratingReview: req.body.ratingReview,
        },
      });
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  }
};
export default handler;
