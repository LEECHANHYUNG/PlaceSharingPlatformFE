import axios from 'axios';

const handler = async (req, res) => {
  if (req.body.company === 'kakaopay') {
    try {
      const response = await axios({
        url: `${process.env.baseURL}payment/${req.body.company}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.body.accessToken,
        },
        rejectUnauthorized: false,
        data: {
          reservationId: req.body.reservationId,
          payWay: 'PREPAYMENT',
          payType: req.body.payType,
          payMileage: +req.body.useMileage,
        },
      });
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  } else {
    try {
      const response = await axios({
        url: `${process.env.baseURL}payment/${req.body.company}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.body.accessToken,
        },
        rejectUnauthorized: false,
        data: {
          reservationId: +req.body.reservationId,
          card_number: req.body.card_number,
          expiry: req.body.expiry,
          birth: req.body.birth,
          pwd_2digit: req.body.pwd_2digit,
          payWay: req.body.payWay,
          payType: req.body.payType,
          payMileage: +req.body.payMileage,
        },
      });
      if (response.status === 200) {
        res.status(200).send(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  }
};
export default handler;
