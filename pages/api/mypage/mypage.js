import axios from 'axios';

const handler = async (req, res) => {
  try {
    const response = await axios({
      url: `${process.env.baseURL}${req.body.url}${req.body.page}`,
      headers: {
        Authorization: req.body.accessToken,
      },
      rejectUnauthorized: false,
    });

    if (response.status === 200) {
      res.status(200).send(response.data);
    } else {
      return new Promise.reject(response.data);
    }
  } catch (error) {
    res.status(error.response.status).send(error);
  }
};
export default handler;
