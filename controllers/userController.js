const User = require('../models/user');

exports.getUsers = async function (req, res) {
    if (req.user.role !== 1) {
      return res.status(403).send({ message: 'Forbidden' });
    }

  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching users.' });
  }
};

exports.getUser = async function (req, res) {
  if (req.user.role !== 1 && req.user.id !== req.params.id) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (err) {
    // res.status(500).send({ message: 'Error fetching user.' });
    res.status(500).send({ message: err.message});
  }
};

exports.addUser = async function (req, res) {
  if (req.user.role !== 1) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(200).send({ message: 'User added!' });
  } catch (err) {
    // res.status(500).send({ message: 'Error adding user.' });
    res.status(500).send({ message: err.message});
  }
};

exports.updateUser = async function (req, res) {
  if (req.user.role !== 1 && req.user.id !== req.params.id) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.status(200).send({ message: 'User updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.deleteUser = async function (req, res) {
  // await User.deleteMany({});

  if (req.user.role !== 1) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  if (req.user.id === req.params.id) {
    return res.status(403).send({ message: 'Admins cannot delete their own account' });
  }

  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).send({ message: 'User deleted!' });
  } catch (err) {
    // res.status(500).send({ message: 'Error deleting user.' });
    res.status(500).send({ message: err.message });
  }
};

