const { getUniqueMenuOptions, descriptionOfChangesForEvent } = require('../core-functions/userRequests.js');
const mockData = require('../../json-obj');

test('Should skip any duplicates in obj.Constructor and obj.RaceName', () => {
  const expectedReturn = {
    isNotSkippedForTest: false,
    RaceNo: 1,
    RaceName: 'Event A',
    Constructor: 'Team D',
    ComponentNo: 1,
    UpdatedComponent: 'Front Wing',
    PrimaryReason: 'Performance - Local Load',
    GeometricDifferences: 'Re-optimised wing elements to better attain the pressure gradients and more stable load.',
    Description: 'Load has beeen increased as pressure gradient targets were met, so this wing has more load than last isNotSkippedForTests whilst maintaing the stability.',
  };
  expect(() => {
    getUniqueMenuOptions(mockData).toMatchObject(expectedReturn);
  });
});

it('will return part of a description based on example: ', async () => {
  const summmary = 'Revised to fit the local changes in the front wing profiles';
  const getStringOutputFromArray = descriptionOfChangesForEvent(mockData, 'Bahrain Grand Prix', 'Oracle Red Bull Racing');

  expect(getStringOutputFromArray[1]).toContain(summmary);
});
