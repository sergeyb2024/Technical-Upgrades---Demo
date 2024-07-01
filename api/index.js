const express = require('express');

const router = express.Router();
const { generateCsrfToken, verifyCsrfToken } = require('../middleware/validation');
const { validateMenuSelections, handleMenuSelectionErrors } = require('../middleware/validation');
const { getUniqueMenuOptions, descriptionOfChangesForEvent } = require('../core-functions/userRequests');
const { getCountDown } = require('../core-functions/countdown-timer');
const { getResponseFromAPI } = require('../core-functions/fetchData');
const { transformData, getEventDisplayName } = require('../core-functions/backend-api');

/**
 *   user selected options are captured from the post method
 *   when any value is selected in the dropdown. Only the last selected will
 *   be valid, hence the use of array.unshift method, placing variable at the
 *   beginning of arrays.
 */

const constructorOptionSelected = [];
const raceOptionSelected = [];

/**
 *  assembleData() plays a role of a general constructor which will
 *  push the right data into ejs templates. It depends on options that
 *  user selects in dropdown menus
*/

const assembleData = async (constructorOption, raceOption) => {
  const userQueryObj = {
    constructor: constructorOption[0],
    race: raceOption[0],
  };
  const responseFromAPI = await getResponseFromAPI();
  const dataObjTransformed = transformData(responseFromAPI);
  const eventDisplayName = getEventDisplayName(dataObjTransformed, userQueryObj.race);
  const descriptionOfChanges = await descriptionOfChangesForEvent(dataObjTransformed, userQueryObj.race, userQueryObj.constructor);
  return [eventDisplayName, descriptionOfChanges];
};

router.get('/', async (req, res) => {
  try {
    const csrfToken = generateCsrfToken(req);
    const timeLeftUntilNextRace = getCountDown();
    const responseFromAPI = await getResponseFromAPI();
    const [constructor, raceName] = await getUniqueMenuOptions(responseFromAPI);
    const [eventDisplay, descriptionReady] = await assembleData(constructorOptionSelected, raceOptionSelected);

    res.render('pages/index', {
      constructor,
      raceName,
      textOutput: descriptionReady.length === 0 ? '' : descriptionReady.map((item) => `${item}`),
      timeLeftUntilNextRace,
      constructorTitle: constructorOptionSelected[0] === 'Select Constructor' || typeof constructorOptionSelected[0] === 'undefined' ? '' : constructorOptionSelected[0],
      raceTitle: raceOptionSelected[0] === 'Select Race' ? '' : raceOptionSelected[0],
      eventDisplay,
      csrfToken,
    });
  } catch (error) {
    res.status(500).send('Internal Server Error!!');
  }
});

/*
server validates the token and if user made requires selection.
*/
router.post('/', verifyCsrfToken, validateMenuSelections, handleMenuSelectionErrors, (req, res) => {
  constructorOptionSelected.unshift(req.body.constructor);
  raceOptionSelected.unshift(req.body.race);
  res.redirect('/');
});

module.exports = router;
