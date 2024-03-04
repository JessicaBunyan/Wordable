export const API_URL = "https://wordable-8b8.pages.dev/";

const res = await fetch(API_URL + "/game/create", {
	method: "POST",
	body: JSON.stringify({ name: "124", color: "red" }),
});

console.log(res.status);
const json = await res.json();

console.log(json);
