import axios from 'axios';

const handler = async (req, res) => {
  if (req.body.url === 'main/precheck') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}main/precheck`,
        method: 'post',
        data: {
          email: req.body.email,
          tel: req.body.tel,
        },
      });
      if (response.status === 200) {
        res.status(200).send(response.data.msg);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  } else if (req.body.url === 'main/findpw') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}main/findpw`,
        method: 'post',
        rejectUnauthorized: false,
        data: {
          email: req.body.email,
          tel: req.body.tel,
          password: req.body.password,
          checkPassword: req.body.checkPassword,
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
  } else if (req.body.url === 'main/findemail') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}main/findemail`,
        method: 'post',
        rejectUnauthorized: false,
        data: {
          tel: req.body.tel,
          name: req.body.name,
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
