const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
async function getImage(prompt, version) {
  try {
    const image = await openai.images.generate({ model: `dall-e-${version}`, n: 1, prompt: prompt });
    return image.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
router.get("/", (req, res) => {

  res.render("index")

})


router.post("/", async (req, res) => {
  try {
    let prompt = req.body.prompt;
    let version = req.body.version;

    const imageData = await getImage(prompt, version);
    res.render("index", { imageData }); // Pass imageData to the template
    console.log(imageData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;

