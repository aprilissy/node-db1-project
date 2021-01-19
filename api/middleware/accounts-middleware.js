const Account = require('../accounts/accounts-model')

const validateId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.getByID(id);
    if (!account) {
      res.status(404).json({ message: `Account with id ${id} not found`})
    } else {
      req.account = account
      next()
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
};

function validateAccount(req, res, next) {
 if(!req.body) {
   res.status(400).json({ message: `missing user data`})
 } else if (!req.body.name || !req.body.budget) {
  res.status(400).json({ message: `missing required name or budget field`})
 } else {
  next()
 }
}

module.exports = {
  validateId,
  validateAccount
}