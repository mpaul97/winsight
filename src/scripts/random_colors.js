export default function get_random_color() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}
