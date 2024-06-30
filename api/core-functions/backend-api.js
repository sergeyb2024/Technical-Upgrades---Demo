/** Unlinke `responseFromAPI`, the transformData produces a different
*  structure like object. It gives an option to parse throug data
*  based on specific key : raceName || Constructor || similar descriptions
*/
const {
  getRandomProperty, forNewPartName, forGeoDifference, forPrimaryReason, forDescritpions,
} = require('./random-speech');

const transformData = (rawData) => {
  const dataByLocation = {};

  rawData.forEach((item, index) => {
    const locationKey = item.RaceName.toUpperCase().replace(/\s/g, '_');
    const nameKey = `${item.Constructor.toUpperCase().replace(/\s/g, '_')}`;
    const detailKey = `${nameKey}'${index + 1}`;

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
        events: [],

      };
    }
    dataByLocation[locationKey][detailKey].events.push({
      ...item,
      Description: ` ${getRandomProperty(forNewPartName)} ${item.UpdatedComponent}. ${getRandomProperty(forGeoDifference)} ${item.GeometricDifferences} ${getRandomProperty(forPrimaryReason)} ${item.PrimaryReason} ${getRandomProperty(forDescritpions)} ${item.Description}`,
    });
  });
  return dataByLocation;
};

module.exports = { transformData };
