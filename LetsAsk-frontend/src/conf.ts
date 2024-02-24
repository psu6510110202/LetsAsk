const isProd = import.meta.env.PROD;

const conf = {
    isProd,
    apiPrefix: isProd? 'https://api.lets-ask.online' : 'http://localhost:1337'
    // apiPrefix: isProd? 'http://api.lets-ask.online:1337' : 'http://api.lets-ask.online:1337'
}

export default conf;