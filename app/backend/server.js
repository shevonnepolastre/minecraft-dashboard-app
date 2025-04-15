require("dotenv").config();
const express = require("express");
const { Client } = require("@notionhq/client");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

// Middleware
app.use(express.static("public")); // serves /public (JS, CSS, etc.)
app.use(express.json()); // parses JSON in POST requests

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST: Create a new page in the Notion database
app.post("/submit-area", async (req, res) => {
  const { area, pageName, header } = req.body;

  const dbMap = {
    world: process.env.NOTION_DB_WORLD,
    mods: process.env.NOTION_DB_MODS,
    spawnpoint: process.env.NOTION_DB_SPAWNPOINT,
    server: process.env.NOTION_DB_SERVER,
    ideas: process.env.NOTION_DB_IDEAS,
  };

  const dbID = dbMap[area];
  if (!dbID) {
    return res.status(400).json({ message: "Invalid area selected." });
  }

  try {
    const newPage = await notion.pages.create({
      parent: {
        database_id: dbID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: pageName || `New ${area} entry`,
              },
            },
          ],
        },
      },
      children: header
        ? [
            {
              object: "block",
              heading_2: {
                rich_text: [
                  {
                    text: {
                      content: header,
                    },
                  },
                ],
              },
            },
          ]
        : [],
    });

    res.json({ message: "Page created successfully", data: newPage });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ message: "Error creating page", error: error.body || error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

