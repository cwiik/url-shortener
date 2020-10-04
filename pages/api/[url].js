const AWS = require('aws-sdk');

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
            FilterExpression: 'shorturl = :shorturl',
            ExpressionAttributeValues: {
                ':shorturl': req.query.url,
            },
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                return reject(res.json({ error: 'Sorry but something went wrong 😞' }));
            } else {
                if (data.Items[0] !== undefined) {
                    return resolve(res.status(200).send(data.Items[0].longurl));
                } else {
                    return reject(res.json({ error: 'Sorry but something went wrong 😞' }));
                }
            }
        });
    });
};
