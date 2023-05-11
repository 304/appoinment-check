const TELEGRAM_CHAT_BOT_TOKEN = 'telegramChatBotToken';
const NATIONALITY_ID = 'nationalityId';
const NUMBER_OF_PERSONS = 'numberOfPersons';
const DO_YOU_LIVE_WITH_YOUR_FAMILY = 'doYouLiveWithYourFamily';
const SPOUSE_NATIONALITY_ID = 'spouseNationalityId';
// in seconds
const DEFAULT_WAITING_TIME = 'defaultWaitingTime';

exports.configs = {
    TELEGRAM_CHAT_BOT_TOKEN,
    NATIONALITY_ID,
    NUMBER_OF_PERSONS,
    DO_YOU_LIVE_WITH_YOUR_FAMILY,
    SPOUSE_NATIONALITY_ID,
    DEFAULT_WAITING_TIME,
}

const configValues = {
    [TELEGRAM_CHAT_BOT_TOKEN]: null,
    [NATIONALITY_ID]: null,
    [NUMBER_OF_PERSONS]: null,
    [DO_YOU_LIVE_WITH_YOUR_FAMILY]: null,
    [SPOUSE_NATIONALITY_ID]: null,
    [DEFAULT_WAITING_TIME]: 2
}

exports.getConfig = (key) => configValues[key]

exports.setConfig = (key, value) => configValues[key] = value

exports.countries = {
    "Canada": "348",
}
