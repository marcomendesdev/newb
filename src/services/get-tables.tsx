"use server";

export default async function getTables() {
  const response = await fetch("https://67631d5e17ec5852cae823fa.mockapi.io/api/tables/restaurant-tables");
  const data = await response.json();
  console.log("Data:", data);

  return data;
}
