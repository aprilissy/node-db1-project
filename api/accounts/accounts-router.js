const express = require('express');
const router = express.Router();
const Account = require('./accounts-model.js');
const { validateId, validateAccount } = require('../middleware/accounts-middleware');


router.get('/', async (req, res) => {
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
});

router.get('/:id', validateId, async (req, res) => {
  try {
    res.json(req.account)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
});

router.post('/', validateAccount, async (req, res) => {
  try {
    const account = req.body
    const data = await Account.create(account)
    res.json(data)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
});

router.put('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params
    const changes = req.body
    const data = await Account.update(id, changes)
   // const updated = await Account.getByID(id)
    res.json(data)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
});

router.delete('/:id', validateId, async (req, res) => {
  try {
    const { id } = req.params
    await Account.remove(id)
    res.json({ message: `Post with id ${id} was deleted`})
  } catch (error){
    res.status(500).json({ message: error.message })
  }
});

module.exports = router