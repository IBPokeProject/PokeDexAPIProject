const { Professor } = require('./models/Professor');

async function isAdmin(userId) {
  const user = await Professor.findByPk(userId);
  return user.role === 'Admin';
}

module.exports = { isAdmin };