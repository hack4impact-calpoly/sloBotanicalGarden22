import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_SECRET_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_SECRET_USER_POOL_WEB_CLIENT_ID
    }
});

// You can get the current config object
const currentConfig = Auth.configure();