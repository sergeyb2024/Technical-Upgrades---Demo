/** Unlinke `responseFromAPI`, the transformData produces a different
*  structure like object. It gives an option to parse throug data
*  based on specific key : raceName || Constructor || similar descriptions
*/
const { toFormData } = require('axios');
const {
  getRandomProperty,
  forNewPartName,
  forGeoDifference,
  forPrimaryReason,
  forDescritpions,
} = require('./random-speech');

const transformData = (rawData) => {
  const dataByLocation = {};

  rawData.forEach((item, index) => {
    const locationKey = item.RaceName;
    const nameKey = item.Constructor;
    const detailKey = nameKey;
    const eventDisplayName = item.RequiredEventDisplay;

    if (!dataByLocation[locationKey]) {
      dataByLocation[locationKey] = {};
    }

    if (!dataByLocation[locationKey][detailKey]) {
      /**
       *  The events key contains the entire object structure.
       *  Probably won't need hardcoded keys. An index is appended to
       *  details(team name and entire object). At any given race, a team can
       *  have several updates to their cars.
      */

      // events[] holds the skeletton data from API response
      dataByLocation[locationKey][detailKey] = {
        detailKey,
        index: index + 1,
        constructorsName: item.Constructor,
        eventDisplayName,
        events: [],
      };
    }
    dataByLocation[locationKey][detailKey].events.push({
      ...item,
      Description: ` ${getRandomProperty(forNewPartName)} ${item.UpdatedComponent} ${getRandomProperty(forGeoDifference)} ${item.GeometricDifferences} ${getRandomProperty(forPrimaryReason)} ${item.PrimaryReason} ${getRandomProperty(forDescritpions)} ${item.Description}`,
    });
  });
  return dataByLocation;
};

//TODO = create map set.
const getEventDisplayName = (data, key) => {
  let result = '';
  const getValues = Object.values(data); // return all data per race
  if (key !== undefined) {
    for (const races of getValues) {
      const details = Object.values(races); // get race details
      for (const detail of details) {
        if (key in data) {
          result = detail.eventDisplayName;
        }
      }
    }
  }
  return result;
};

module.exports = { transformData, getEventDisplayName };
