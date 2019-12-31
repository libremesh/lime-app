export default function xDaysFromNow (days) {
  let date = new Date()
  let newDate = date.setDate(date.getDate() + parseInt(days))
  return newDate.toString()
}
