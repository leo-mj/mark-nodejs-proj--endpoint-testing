import supertest from "supertest";
import app from "./server";
import { MYSTERIOUS_ROBED_FIGURE } from "./constants/characters";
import { CAVE_EXTERIOR } from "./constants/locations";

test("GET / responds with a welcome message from our mysterious robed figure", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

test("GET /quest/accept has our mysterious robed figure give a couple of further choices", async () => {
  const response = await supertest(app).get("/quest/accept");

  // check the speaker and location are right
  expect(response.body).toMatchObject({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
    },
  });

  // check the robed figure is saying something
  expect(typeof response.body.speech.text).toBe("string");

  // check that there are at least two further options
  expect(Object.keys(response.body.options).length).toBeGreaterThanOrEqual(2);
});

test("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");

  // located in the apocalypse
  expect(response.body.location).toBe("Apocalypse");

  // aggro speaker
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");

  // some aggro message
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);

  // only includes the option to restart
  expect(response.body.options).toStrictEqual({ restart: "/" });
});

test("GET /quest/start/impossible responds with instant 'death'", async () => {
  const response = await supertest(app).get("/quest/start/impossible");

  // there is _some_ location
  expect(response.body.location).toBe("Limbo");

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toMatch(/death/i);

  // fiery death
  expect(response.body.speech.text).toMatch(/fireball/i);
  expect(response.body.speech.text).toMatch(/dragon/i);
  expect(response.body.speech.text).toMatch(/excruciating/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/hard responds with Vetinari dialogue", async () => {
  const response = await supertest(app).get("/quest/start/hard");

  expect(response.body.location).toBe("Ankh Morpork, Discworld");
  expect(response.body.speech.speaker.name).toMatch(/vetinari/i);

  expect(response.body.speech.text).toMatch(/assist/i);
  expect(response.body.speech.text).toMatch(/delicate/i);
  expect(response.body.speech.text).toMatch(/inconvenience/i);

  expect(response.body.options).toMatchObject({ "Willing?! You just kidnapped me! I would never help you!": "quest/start/hard/resist"})


})

test("GET /quest/start/hard/give-in responds with Vetinari dialogue", async () => {
  const response = await supertest(app).get("/quest/start/hard/give-in");

  expect(response.body.location).toBe("Ankh Morpork, Discworld");
  expect(response.body.speech.speaker.name).toMatch(/vetinari/i);

  expect(response.body.speech.text).toMatch(/letters/i);
  expect(response.body.speech.text).toMatch(/defeat/i);
  expect(response.body.speech.text).toMatch(/sensible/i);

  expect(response.body.options).toMatchObject({ "K-Pop": "quest/start/hard/answer"})


})

test("GET /quest/start/hard/resist responds with executioner scene", async () => {
  const response = await supertest(app).get("/quest/start/hard/resist");

  expect(response.body.location).toBe("A dark dungeon");
  expect(response.body.speech.speaker.name).toMatch(/executioner/i);

  expect(response.body.speech.text).toMatch(/long way/i);
  expect(response.body.speech.text).toMatch(/sorry/i);
  expect(response.body.speech.text).toMatch(/hanged/i);

  expect(response.body.options).toMatchObject({ restart: "/"})


})