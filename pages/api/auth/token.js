import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: req.body.url,
        headers: { Authorization: req.body.accessToken },
      });
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(500).send(response.data);
    }
  }
};

export default handler;
