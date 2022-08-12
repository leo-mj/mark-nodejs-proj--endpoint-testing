import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
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

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text:
        "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: "Daycare centre",
    speech: {
      speaker: "Parent",
      text: "I'll pick you up at three! Be nice and have fun!"
    },
    options: {
      nap: "/",
      cry: "/quest/decline",
      restart: "/"
    }
    
  })
})

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: "Limbo",
    speech: {
      speaker: {
        name: "DEATH",
        description: "A tall hooded figure with a skull as its head, holding a scythe",
      },
      text: "You have died from a fireball. You should not have provoked the dragon. That must have been excruciating. I am sorry.",
    },
    options: {
      restart: "/",
    },
  });
})

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: "Ankh Morpork, Discworld",
    speech: {
      speaker: {
        name: "Vetinari",
        description: "A tall, thin man dressed in dusty black. Strangely reminiscent of a predatory flamingo, if one existed.",
      },
      text: "Ah, I am glad we could get ahold of you. My apologies for the rough journey. Oh, and for the handcuffs, of course. Since you are willing to assist us in a very delicate matter, I am glad to ensure you will not encounter any further, slightly more lethal inconveniences.",
    },
    options: {
      "Willing?! You just kidnapped me! I would never help you!": "/quest/start/hard/resist",
      "I'm glad to be of service.": "/quest/start/hard/give-in",
      restart: "/",
    },
  });
})

app.get("/quest/start/hard/give-in", (req, res) => {
  res.json({
    location: "Ankh Morpork, Discworld",
    speech: {
      speaker: {
        name: "Vetinari",
        description: "A tall, thin man dressed in dusty black. Strangely reminiscent of a predatory flamingo, if one existed.",
      },
      text: "How kind, and sensible, of you. Now, our predicament involves extremely high stakes. It appears my arch nemesis at the Ankh Morpork Times is uncomfortably close to defeating me. So tell me: BTS's genre, 4 letters.",
    },
    options: {
      laugh: "/quest/start/hard/resist",
      "K-Pop": "/quest/start/hard/answer",
      restart: "/",
    },
  });
})


app.get("/quest/start/hard/resist", (req, res) => {
  res.json({
    location: "A dark dungeon",
    speech: {
      speaker: {
        name: "Daniel 'One Drop' Trooper, official executioner of Ankh Morpork",
        description: "A very jolly man with a good pension plan",
      },
      text: "Hi there! Sorry it took me so long, just had to make some preparations, you know how it is. So, would you like to be hanged the long way or the short way today?",
    },
    options: {
      restart: "/",
    },
  });
})


export default app;
