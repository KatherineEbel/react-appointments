const today = new Date();

const at = hours => today.setHours(hours, 0);

export const sampleAppointments = [
  { startsAt: at(9), customer: { firstName: 'Charlie' } },
  { startsAt: at(10), customer: { firstName: 'Frankie' } },
  { startsAt: at(11), customer: { firstName: 'Casey' } },
  { startsAt: at(12), customer: { firstName: 'Ashley' } },
  { startsAt: at(13), customer: { firstName: 'Jordan' } },
  { startsAt: at(14), customer: { firstName: 'Jay' } },
  { startsAt: at(15), customer: { firstName: 'Alex' } },
  { startsAt: at(16), customer: { firstName: 'Jules' } },
  { startsAt: at(17), customer: { firstName: 'Stevie' } }
];


const randomInt = range => Math.floor(Math.random() * range);

Array.prototype.pickRandom = function() {
  return this[randomInt(this.length)];
};

const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];

// const services = [
//   'Cut',
//   'Blow-dry',
//   'Cut & color',
//   'Beard trim',
//   'Cut & beard trim',
//   'Extensions'
// ];

const pickMany = (items, number) =>
  Array(number)
    .fill(1)
    .map(() => items.pickRandom());

const buildTimeSlots = () => {
  const today = new Date();
  const startTime = today.setHours(9, 0, 0, 0);
  const times = [...Array(7).keys()].map(day => {
    const daysToAdd = day * 24 * 60 * 60 * 1000;
    return [...Array(20).keys()].map(halfHour => {
      const halfHoursToAdd = halfHour * 30 * 60 * 1000;
      return {
        startsAt: startTime + daysToAdd + halfHoursToAdd,
        stylists: pickMany(stylists, randomInt(stylists.length))
      };
    });
  });
  return [].concat(...times);
};

export const sampleAvailableTimeSlots = pickMany(
  buildTimeSlots(),
  50
);
