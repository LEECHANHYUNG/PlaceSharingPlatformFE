import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}mypage/qna`,
        method: 'post',
        headers: {
          Authorization: req.body.accessToken,
        },
        rejectUnauthorized: false,
        data: {
          title: req.body.title,
          question: req.body.question,
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
