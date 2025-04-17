require("dotenv").config();
const express = require("express");
const { Client } = require("@notionhq/client");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

// Middleware
app.use(express.static("public")); // Serve static files from /public
app.use(express.json()); // Parse incoming JSON payloads

// Serve the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Test route
app.get("/test", (req, res) => {
  res.send("✅ Your Node app is running!");
});

// POST: Create a new page in Notion
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
      parent: { database_id: dbID },
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
    res.status(500).json({
      message: "Error creating page",
      error: error.body || error.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

app.post("/debug-db", async (req, res) => {
  const { area } = req.body;
  const dbMap = {
    world: process.env.NOTION_DB_WORLD,
    mods: process.env.NOTION_DB_MODS,
    spawnpoint: process.env.NOTION_DB_SPAWNPOINT,
    server: process.env.NOTION_DB_SERVER,
    ideas: process.env.NOTION_DB_IDEAS,
  };
  const dbID = dbMap[area];

  try {
    const db = await notion.databases.retrieve({ database_id: dbID });
    res.json(db);
  } catch (error) {
    console.error("❌ Debug DB Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: error.body || error.message });
  }
});
