import axios from 'axios';
async function handler(req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  const enteredName = req.body.name;
  const enteredPhone = req.body.phoneNumber;
  const enteredJob = req.body.job;
  const enteredPreferType = req.body.preferType;
  const checkedPassword = req.body.checkedPassword;

  try {
    const response = await axios({
      method: 'post',
      url: `${process.env.baseURL}auth/signup`,
      headers: { 'Content-Type': 'application/json' },
      rejectUnauthorized: false,
      data: {
        email: enteredEmail,
        password: enteredPassword,
        checkedPassword,
        name: enteredName,
        phoneNumber: enteredPhone,
        job: enteredJob,
        preferType: enteredPreferType,
      },
    });
    if (response.status === 200) {
      res.status(200).json({ message: '회원가입 성공' });
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    res.status(500).send(error.response.data.message);
  }
}

export default handler;
