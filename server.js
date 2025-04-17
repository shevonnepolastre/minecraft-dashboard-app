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

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Test route to confirm the server is running
app.get("/test", (req, res) => {
  res.send("✅ Your Node app is running!");
});

// Debug route to confirm Notion DB access
app.get("/debug-notion-db/:area", async (req, res) => {
  const area = req.params.area;

  const dbMap = {
    world: process.env.NOTION_DB_WORLD,
    mods: process.env.NOTION_DB_MODS,
    spawnpoint: process.env.NOTION_DB_SPAWNPOINT,
    server: process.env.NOTION_DB_SERVER,
    ideas: process.env.NOTION_DB_IDEAS,
  };

  const dbID = dbMap[area];

  if (!dbID) {
    return res.status(400).json({ message: `No DB ID found for area: ${area}` });
  }

  try {
    const dbInfo = await notion.databases.retrieve({ database_id: dbID });
    res.json({
      message: `Successfully retrieved DB info for ${area}`,
      dbID,
      properties: dbInfo.properties,
    });
  } catch (error) {
    console.error("❌ Error retrieving DB info:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: error.body || error.message });
  }
});

// POST: Create a new page in the selected Notion database
app.post("/submit-area", async (req, res) => {
  const { minecraftdb, pageName, header } = req.body;
  const area = minecraftdb;

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
    console.error("❌ Error creating page:", JSON.stringify(error, null, 2));
    res.status(500).json({
      message: "Error creating page",
      error: error.body || error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
