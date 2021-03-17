const redis_client = require("../config/redisConfig");

module.exports = checkCache = (req, res, next) => {
    const { slug, id } = req.params;

    redis_client.get(`${slug}:${id}`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }

        if (data != null) {
            res.json({ ...JSON.parse(data), fromCache: true });
        } else {
            next();
        }

    });

};