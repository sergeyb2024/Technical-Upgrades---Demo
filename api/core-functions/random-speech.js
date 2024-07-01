/*
The idea is to make descriptions less robotic and bring more diversity and vocabulary
*/

const forNewPartName = ['New part: ', 'New part name:', 'The updated component is: ', 'The new component is: ', 'New feature: ', 'Here are details for the following update: ', 'New part installed:'];
const forGeoDifference = ['Main purpose compared to latest revision: ', 'Major differences compared to previous versions: ', 'Key aspects that were taken into consideration: ', 'Noticable differences: ', 'The objective to choose this specific version over previous component: '];
const forPrimaryReason = ['One of the many reasons for this specific update: ', 'The idea is to achieve a ', 'The expected improvement in the area of ', 'Engineers mainly focusing on the specifics linked to ', 'Principal reasons to bring in this particular update ', 'This specific update aims to improve '];
const forDescritpions = ['Finally, a brief description: ', 'More details: ', 'Team further explains: ', 'Additional comments provided: ', 'More clues on how this update will work: ', 'A few more thoughts diving deeper into the nature of this update: '];
/*
will include the absolute minimum and maximum values
when calculating radomly
*/

const getRandomProperty = (arr) => {
  const max = arr.length;
  const min = arr.length - max;
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  const index = [Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)];
  return arr[index];
};

module.exports = {
  getRandomProperty,
  forNewPartName,
  forGeoDifference,
  forPrimaryReason,
  forDescritpions,
}
