import axios from 'axios';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios({
        headers: {
          Authorization: req.body.accessToken,
        },
        url: `${process.env.baseURL}places/${req.body.id}/book`,
        method: 'post',
        rejectUnauthorized: false,
        data: {
          selectedType: req.body.selectedType,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
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
