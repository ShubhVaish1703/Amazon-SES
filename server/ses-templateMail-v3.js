const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
require('dotenv').config();

const SES_CONFIG = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_SES_REGION
};

// create SES service object
const sesClient = new SESClient(SES_CONFIG);

const sendMail = async (templateName, recipientEmail) => {
    const sendTemplateEmailCommand = new SendTemplatedEmailCommand({
        Destination: {
            ToAddresses: [
                recipientEmail
            ],
        },
        Source: process.env.AWS_SES_SENDER,
        Template: templateName,
        TemplateData: JSON.stringify({name: 'shivam kumar singh'}),
    })

    try {
        const res = await sesClient.send(sendTemplateEmailCommand);
        console.log("Email with SES Template has been sent!", res);
    } catch (error) {
        console.error(error);
    }
};

sendMail("SES-Template", 'shubh@dodev.in');