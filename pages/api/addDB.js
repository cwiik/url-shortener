const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const AWS_SETTINGS = {
    region: process.env.AWS_DEFAULT_REGION2,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID2,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY2,
};

module.exports = async (req, res) => {
    return new Promise((resolve, reject) => {
        AWS.config.update(AWS_SETTINGS);
        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: 'urlshortener',
            Item: {
                id: uuidv4(),
                shorturl: req.body.shorturl,
                longurl: req.body.longurl,
            },
        };

        docClient.put(params, function (err, data) {
            if (err) {
                return reject(res.json({ error: 'Sorry but something went wrong 😞' }));
            } else {
                return resolve(res.status(200).send('ok'));
            }
        });
    });
};
