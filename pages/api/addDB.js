const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const AWS_SETTINGS = {
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

module.exports = async (req, res) => {
    return new Promise((resolve, reject) => {
        AWS.config.update(AWS_SETTINGS);
        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: 'urlshortener',
            Item: {
                id: uuidv4(),
                url: req.body.url,
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
