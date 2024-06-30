const getCountDown = () => {
  const today = new Date();
  const upcomingDates = [
    { location: 'Shanghai', time: 1713726000000 },
    { location: 'Miami', time: 1714939200000 },
    { location: 'Imola', time: 1716123600000 },
    { location: 'Monaco', time: 1716728400000 },
    { location: 'Circuit Gilles-Villeneuve', time: 1717963200000 },
    { location: 'Barcelona', time: 1719147600000 },
    { location: 'Austria', time: 1719752400000 },
    { location: 'Great Britain', time: 1720360800000 },
    { location: 'Spa-Francochamps', time: 1721566800000 },
    { location: 'Belgium', time: 1722171600000 },
    { location: 'Zandvoort', time: 1724590800000 },
    { location: 'Monza', time: 1725195600000 },
    { location: 'Baku', time: 1726398000000 },
    { location: 'Marina Bay', time: 1727006400000 },
    { location: 'United States', time: 1729450800000 },
    { location: 'Autodromo Henrands Rodrigues', time: 1730059200000 },
    { location: 'Interlagos', time: 1730653200000 },
    { location: 'Las Vegas', time: 1732428000000 },
    { location: 'Losail', time: 1733072400000 },
    { location: 'Yas Marina', time: 1733662800000 },
  ];

  // captures the upcoming event and puts it out to nav-bar
  const nextEvent = upcomingDates.find((e) => new Date(e.time) > today) || {};

  const remaining = nextEvent.time - today;
  const daysDecimal = (remaining / 86400000);
  const evenDays = Math.floor(daysDecimal);
  const leftoverDays = daysDecimal - evenDays;
  const hoursDecimal = leftoverDays * 24;
  const evenHours = Math.floor(hoursDecimal);
  const leftoverHours = hoursDecimal - evenHours;
  const minutesDecimal = leftoverHours * 60;
  const evenMinutes = Math.floor(minutesDecimal);
  return `${nextEvent.location} in ${evenDays} days, ${evenHours} hours, ${evenMinutes} minutes
    `;
};

module.exports = { getCountDown };
