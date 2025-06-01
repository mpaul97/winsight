export default function parse_custom_date(dateString) {
  // Date Format: "%Y-%m-%dT%H:%M:%S"
  // Split the string into date and time parts
  const [datePart, timePart] = dateString.split('T');

  // Split the date into day, month, year
  const [year, month, day] = datePart.split('-').map(Number);

  // Split the time into hours, minutes, seconds
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  // Note: Months are 0-indexed in JavaScript Date (0 = January, 11 = December)
  return new Date(year, month - 1, day, hours, minutes, seconds);
}
