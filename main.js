const {By, until, WebDriver} = require('selenium-webdriver');
const {configs, countries, setConfig, getConfig} = require('./config');
const {buildDriver} = require('./chromeDriver');
const {selectors} = require('./selectors');
const {sleep, setChatId, sendMessage, selectChoice, collectInput, yesOrNoQuestion} = require("./helpers");
const { exec } = require('child_process');

/**
 *
 * @type {WebDriver}
 */
let driver = null
let sessionStart = null;

async function retryActionOnAnElement(selector, numberOfRetries = 10, retrialTimeInSeconds = getConfig(configs.DEFAULT_WAITING_TIME), action = 'click') {
    let remainingTrials = numberOfRetries;
    while (remainingTrials > 0) {
        await sleep(retrialTimeInSeconds * 1000);
        try {
            return await driver.findElement(By.xpath(selector))[action]();
        } catch (e) {
            console.log(`Element ${selector} didn't appear`, remainingTrials);
            if(remainingTrials === 1){
                throw e;
            }
        } finally {
            remainingTrials--;
        }
    }
}

function beep() {
    exec('afplay beep.wav')
}

async function retryFindingAppointment() {
    // the session is 30 minutes
    let sessionInterval = 3600000;
    while (((new Date() - sessionStart)/sessionInterval) < 0.5) {
        console.log('time elapsed: ', ((new Date() - sessionStart)/sessionInterval) * 60);
        try {
            await retryActionOnAnElement(selectors.otherEmploymentReason, 10, 3);
            await retryActionOnAnElement(selectors.employmentReason, 10, 3);
            await retryActionOnAnElement(selectors.blueCard);
            await retryActionOnAnElement(selectors.findAppointmentButton, 10, 5);
            await sleep(2000);
            if (await checkAvailableAppointment()) {
                console.log('Found an Appointment 🎉🎉🎉');
                beep();
                await sleep(2000);
                await sendMessage(await driver.getCurrentUrl());
                return;
            }
        } catch (e) {
            console.log(e);
            console.log(`Element ${selectors.currentActiveStep} didn't appear`);
        }
    }
    throw new Error('Session has been ended');
}

async function checkAvailableAppointment() {
    const activeStep = await retryActionOnAnElement(selectors.currentActiveStep, 10, 2, 'getText');
    console.log('active step is: ', activeStep);

    return activeStep == '3'
}

async function prepareUserData() {
    await collectUserData()
    await sendMessage('starting');
}

async function start() {
    try {
        driver = await buildDriver();
        await driver.get(selectors.appointmentWebsiteUrl);
        await driver.findElement(By.xpath(selectors.bookAnAppointmentButtonPath)).click();

        sessionStart = new Date();
        await retryActionOnAnElement(selectors.agreeButtonPath);
        await retryActionOnAnElement(selectors.agreeNextButtonXpath);
        await retryActionOnAnElement(selectors.nationality(getConfig(configs.NATIONALITY_ID)), 20);
        await retryActionOnAnElement(selectors.numberPersons(getConfig(configs.NUMBER_OF_PERSONS)), 10, 4);
        await retryActionOnAnElement(selectors.doYouLiveWithYourFamilySelector(getConfig(configs.DO_YOU_LIVE_WITH_YOUR_FAMILY)));
        if (getConfig(configs.DO_YOU_LIVE_WITH_YOUR_FAMILY)) {
            await retryActionOnAnElement(selectors.familyMemberNationality(getConfig(configs.SPOUSE_NATIONALITY_ID)));
        }
        await retryActionOnAnElement(selectors.residencePermitOption, 10, 3);
        await retryActionOnAnElement(selectors.employmentReason, 10, 3);
        await retryActionOnAnElement(selectors.blueCard);
        await retryFindingAppointment();

    } catch (e) {
        console.log(e);
        await sleep(2000);
        await driver.quit();
        await start();
    }
}

async function collectUserData() {

    setConfig(configs.NATIONALITY_ID, "348")
    setConfig(configs.NUMBER_OF_PERSONS, '1')
    const doYouLiveWithYourFamily = false;
    setConfig(configs.DO_YOU_LIVE_WITH_YOUR_FAMILY, doYouLiveWithYourFamily)
    if (doYouLiveWithYourFamily) {
        const spouseNationality = await selectChoice('What is your Spouse nationality?', Object.keys(countries));
        setConfig(configs.SPOUSE_NATIONALITY_ID, countries[spouseNationality])
    }
    // const telegramToken = await collectInput('What is your telegram token?');
    // setConfig(configs.TELEGRAM_CHAT_BOT_TOKEN, telegramToken)
}

async function main() {
    await prepareUserData();
    await start();
}

main()
