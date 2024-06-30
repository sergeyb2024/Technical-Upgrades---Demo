const data = require('../../mock-data');

async function getResponseFromAPI() {
  let responseFromAPI = [];
  try {
    responseFromAPI = data.map((key) => ({
      Year: key.Year,
      RaceNo: key.RaceNo,
      RaceName: key.RaceName,
      Constructor: key.Constructor,
      RequiredEventDisplay: key.RequiredEventDisplay,
      ComponentNo: key.ComponentNo,
      UpdatedComponent: key.UpdatedComponent,
      PrimaryReason: key.PrimaryReason,
      GeometricDifferences: key.GeometricDifferences,
      Description: key.Description,
    }));
  } catch (err) {
    res.status(500).send('Internal Server Error!');
  }
  return responseFromAPI;
}

module.exports = { getResponseFromAPI };
