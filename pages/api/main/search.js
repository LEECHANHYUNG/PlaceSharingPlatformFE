import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}main/search`,
        method: req.method,
        rejectUnauthorized: false,
        data: {
          searchWord: req.body.searchWord,
        },
        rejectUnauthorized: false,
      });
      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
};

export default handler;
