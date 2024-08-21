const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ id: user.id, isSuperuser: user.isSuperuser }, 'secret', { expiresIn: '1h' });

  res.status(200).json({ token });
});


function isSuperuser(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'secret');

  if (!decoded.isSuperuser) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }

  req.user = decoded;
  next();
}

module.exports = { router, isSuperuser };
