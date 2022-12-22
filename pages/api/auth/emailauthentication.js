import axios from 'axios';

const handler = async (req, res) => {
  if (req.body.url === 'auth/sendemail') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}auth/sendemail`,
        method: 'post',
        rejectUnauthorized: false,
        data: {
          address: req.body.email,
        },
      });
      if (response.status === 200) {
        res.status(200).send('이메일 전송 완료');
      }
    } catch (err) {
      res.status(500).send(err.response.data.message);
    }
  } else if (req.body.url === 'auth/verifying') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}auth/verifying`,
        method: 'post',
        rejectUnauthorized: false,
        data: {
          email: req.body.email,
          code: req.body.authNumber,
        },
      });
      if (response.status === 200) {
        res.status(200).send('이메일 전송 완료');
      }
    } catch (err) {
      res.status(500).send(err.response.data.message);
    }
  }
};

export default handler;
