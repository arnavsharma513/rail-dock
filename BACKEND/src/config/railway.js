const RailRadarBaseUrl = 'https://api.railradar.in/v1';

const RailRadarApiKey = process.env.API_key;
if(!RailRadarApiKey) {
    throw new Error('API key is not defined in the environment variables.');
}

module.exports = {
    RailRadarBaseUrl,
    RailRadarApiKey
};