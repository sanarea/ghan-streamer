'use strict';
/**
 * 요청을 모아서... req.data 로 함친다.
 */
function merge(req) {
    var data = {};
    if (req.query) {
        data = Object.assign(data, req.query);
    }
    if (req.params  ) {
        data = Object.assign(data, req.query);
    }
    if (req._body &&req.body) {
        data = Object.assign(data, req.body);
    }

    return data;
}

module.exports = function () {
    return (req, res, next) => {
       
        var data = merge(req);
        req.data = data;
        return next();

    };
}