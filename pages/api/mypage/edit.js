import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}mypage/edit`,
        headers: {
          Authorization: req.body.accessToken,
        },
        method: 'post',
        data: {
          tel: req.body.tel,
          job: req.body.job,
          preferType: req.body.preferType,
        },
      });
      if (response.status === 200) {
        res.status(200).send('정보 수정 완료.');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  }
};
export default handler;
