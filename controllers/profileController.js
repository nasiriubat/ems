const User = require('../models/user');


exports.getProfile  = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (err) {
    // res.status(500).send({ message: 'Error fetching user.' });
    res.status(500).send({ message: err.message});
  }
};

exports.updateProfile = async function (req, res) {
  // if (req.user.role !== 1 && req.user.id !== req.params.id) {
  //   return res.status(403).send({ message: 'Forbidden' });
  // }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    Object.keys(req.body).forEach((key) => {
        if (key !== 'role') {
          user[key] = req.body[key];
        }
      });
      

    await user.save();
    res.status(200).send({ message: 'User updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
