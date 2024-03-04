class PagesController {
  welcome(req, res, next) {
    if (!req.user) return res.send("welcome");
    next();
  }
}

module.exports = PagesController;
