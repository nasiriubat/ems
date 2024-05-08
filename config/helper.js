
exports.isAdmin = function (user) {
    return user.role === 1;
};

exports.isEmployee = function (user) {
    return user.role === 2;
};
