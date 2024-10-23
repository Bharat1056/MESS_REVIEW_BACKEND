const date = new Date();
const istOffset = 5.5 * 60 * 60 * 1000;
const istDate = new Date(date.getTime() + istOffset);
const currentDate = istDate.toISOString().split("T")[0];

export function calculateHostelReview(
  hygiene,
  foodQuality,
  foodQuantity,
  foodTiming,
  menuAdherence,
  staffHygiene,
  tableCleanliness,
  staffBehavior,
  plateCleanliness,
  waitingTime
) {
  const weights = {
    foodQuality: 20,
    hygiene: 15,
    foodQuantity: 10,
    foodTiming: 10,
    staffBehavior: 10,
    plateCleanliness: 10,
    tableCleanliness: 8,
    menuAdherence: 7,
    staffHygiene: 5,
    waitingTime: 5,
  };

  const totalScore =
    hygiene * (weights.hygiene / 10) +
    foodQuality * (weights.foodQuality / 10) +
    foodQuantity * (weights.foodQuantity / 10) +
    foodTiming * (weights.foodTiming / 10) +
    menuAdherence * (weights.menuAdherence / 10) +
    staffHygiene * (weights.staffHygiene / 10) +
    staffBehavior * (weights.staffBehavior / 10) +
    tableCleanliness * (weights.tableCleanliness / 10) +
    plateCleanliness * (weights.plateCleanliness / 10) +
    waitingTime * (weights.waitingTime / 10);

  return Math.ceil(totalScore);
}

export const hostelNames = [
  "Agastya",
  "Pulastya",
  "Pulaha",
  "Marichi",
  "Kratu",
  "Atri",
  "Vasistha",
  "Angira",
  "Anuradha",
  "Arundhati",
  "Visakha",
  "Rohini",
  "Vasundhara",
];

export default currentDate;
