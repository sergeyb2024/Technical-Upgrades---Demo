const _ = require('lodash');

/*  Render ejs tmeplate : select constructor | select race event
Unique values are required especially for the
menu dropdown options
*/
const getUniqueMenuOptions = async (obj) => {
  const constructor = await _.uniqBy(obj, 'Constructor');
  const raceName = await _.uniqBy(obj, 'RaceName');
  const eventDisplay = await _.uniqBy(obj, 'RequiredEventDisplay');
  return [constructor, raceName, eventDisplay];
};

/** descriptionOfChangesForEvent(Object, String, String)
*  user enters raceName and constructor either manually
*  or for now using the <select>'ors in ejs template.
*  The following will return all existing description for
*  any given race event (as long as theres > 1)
*/
const descriptionOfChangesForEvent = async (rawData, raceName, constructor) => {
  const raceTeams = new Set();

  /**
     *  Essential part to render user menus and
     *  create data comparaison functions. Takes
     *  a transformed data object for transformData()
    */

  Object.entries(rawData).forEach(([locationKey, locationData]) => {
    Object.entries(locationData).forEach(([detailsKey, detailedData]) => {
      detailedData.events.forEach((event, index) => {
        if (event.RaceName === raceName && event.Constructor === constructor) {
          raceTeams.add(event.Description);
        }
      });
    });
  });
  return Array.from(raceTeams);
};

// takes a string parmaeter for component to get
// results on teams who made a specific update.
const getCarComponentChanges = (data, components) => {
  const teams = [];
  data.forEach((item) => {
    if (item.Components.include(`${components}`)) {
      teams.push(item.Constructor);
    }
  });
  return [...new Set(teams)];
};

// raceEvent (String) or raceNo (Number)
// returns teams with updates at the given raceEvent
const whoMadeChangesByRaceEvent = (data, raceEvent) => data.filter((item) => item.RaceName === RaceName).map((item) => item.Constructor);

// Experimental function with ability to search by change type keyword
// *Can be used to compare reasons behind update
const whoMadeChangesByKeyword = (data, keyword, changeType = 'added') => {
  const constructors = new Set();
  data.forEach((item) => {
    if (item.Component.includes(`${changeType} ${keyword}`)) {
      constructors.add(item.Constructor);
    }
  });
  return Array.from(constructors);
};

module.exports = {
  getUniqueMenuOptions,
  descriptionOfChangesForEvent,
  getCarComponentChanges,
  whoMadeChangesByRaceEvent,
  whoMadeChangesByKeyword,
};
