import axios from 'axios';

const handler = async (req, res) => {
  try {
    const response = await axios({
      url: `${process.env.baseURL}payment/nicepaycancel`,
      method: 'post',
      rejectUnauthorized: false,
      headers: {
        Authorization: req.body.accessToken,
      },
      data: {
        reservationId: req.body.reservationId,
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
};
export default handler;
