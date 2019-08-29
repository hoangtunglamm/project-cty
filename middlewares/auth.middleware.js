const authorize = (req, res, next) => {
  if (!req.session || !req.session.user) {
      res.send('login plz?')
     
    } else next();
  };
  
  module.exports = { authorize };