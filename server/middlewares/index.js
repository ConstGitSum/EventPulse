module.exports = {
  checkUpdateId
}

function checkUpdateId(req, res, next) {
  if (req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }

  next();
}
