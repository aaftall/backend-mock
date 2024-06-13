const axios = require("axios");
let API_URL = "https://dragonball-api.com/api/characters";
const characters = [];
const fs = require("fs");

async function getCharacters() {
  try {
    if (!API_URL) {
      console.log(characters.length);
      fs.writeFileSync("characters.json", JSON.stringify(characters, null, 2));
      return;
    }
    const response = await axios.get(API_URL);
    console.log(response);
    characters.push(...response.data.items);
    API_URL = response.data.links.next;
    await sleep(1000);
    getCharacters();
  } catch (error) {
    console.log(error);
  }
}

getCharacters();

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
