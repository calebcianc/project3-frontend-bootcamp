/**
 * Function to convert ISO date to DD/MM/YYYY format
 */
export const convertToDDMMYYYY = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const convertToFormattedDate = (dateString) => {
  const date = new Date(dateString.split("/").reverse().join("-"));
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
