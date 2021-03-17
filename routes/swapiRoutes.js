const router = require("express").Router();

const axios = require("axios");

const checkCache = require("../middleware/checkCache");

const redis_client = require("../config/redisConfig");

router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const swapiInfo = await axios.get(
            `https://www.swapi.tech/api/${slug}`
        );
        const swapiData = swapiInfo.data;
        return res.json(swapiData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }

})


router.get("/:slug/:id", checkCache, async (req, res) => {
    try {
        const { slug, id } = req.params;
        const swapiInfo = await axios.get(
            `https://www.swapi.tech/api/${slug}/${id}`
        );
        const swapiData = swapiInfo.data;

        redis_client.setex(`${slug}:${id}`, 60, JSON.stringify(swapiData));

        return res.json(swapiData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }

})

module.exports = router