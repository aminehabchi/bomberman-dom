export function getCurrentTime() {
  const now = new Date();

  // Extract hours and minutes
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 as 12 for AM/PM format

  // Format minutes to always have two digits
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Return formatted time
  return `${hours}:${minutes} ${ampm}`;
}
