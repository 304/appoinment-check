exports.selectors = {
    appointmentWebsiteUrl:  'https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en',
    bookAnAppointmentButtonPath:  '//*[@id="mainForm"]/div/div/div/div/div/div/div/div/div/div[1]/div[1]/div[2]/a',
    agreeButtonPath:  '//*[@id="xi-cb-1"]',
    agreeNextButtonXpath:  '//*[@id="applicationForm:managedForm:proceed"]',
    nationality: (nationalityId) => `//*[@id="xi-sel-400"]/option[@value=${nationalityId}]`,
    numberPersons: (numberOfPersons) => `//*[@id="xi-sel-422"]/option[@value=${numberOfPersons}]`,
    doYouLiveWithYourFamilySelector: (answer) => answer ? '//*[@id="xi-sel-427_1"]' : '//*[@id="xi-sel-427_2"]',
    familyMemberNationality: (nationalityId) => `//*[@id="xi-sel-428"]/option[contains(@value,${nationalityId})]`,
    residencePermitOption: '//*[@id="xi-div-30"]/div[1]/label',
    employmentReason: '//*[@id="inner-348-0-1"]/div[1]/div[3]/label',
    blueCard: '//*[@id="inner-348-0-1"]/div[1]/div[4]/div/div[1]/label',
    otherEmploymentReason: '//*[@id="inner-348-0-1"]/div[1]/div[1]/label',
    findAppointmentButton: '//*[@id="applicationForm:managedForm:proceed"]',
    currentActiveStep: '//*[@class="antcl_active"]'
}
