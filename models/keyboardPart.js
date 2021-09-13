const mongoose = require("mongoose");
const partSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: false,
  },

  productPrice: {
    type: Number,
    required: false,
  },

  availability: {
    type: String,
    required: false,
  },

  website: {
    type: String,
    required: false,
  },

  type: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
});

export default mongoose.models.scrapedkeyboards || mongoose.model("scrapedkeyboards", partSchema);
