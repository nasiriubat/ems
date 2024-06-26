exports.isAdmin = function (req, res, next) {
    if (req.user.role !== 1) {
        return res.status(403).send({ message: 'Forbidden' });
    }
    next();
};

exports.isEmployee = function (req, res, next) {
    if (req.user.role !== 2) {
        return res.status(403).send({ message: 'Forbidden' });
    }
    next();
};

exports.isSelfOrAdmin = function (req, res, next) {
    if (req.user.role !== 1 && req.user.id !== req.params.id) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    next();
  };
  