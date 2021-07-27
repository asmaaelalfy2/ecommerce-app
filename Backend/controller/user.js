const bcrypt = require('bcrypt');
const User = require('../models/user');
const _ = require('lodash');

exports.signup = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('user already exist');
  }
  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save();
  res.send(user);
};
