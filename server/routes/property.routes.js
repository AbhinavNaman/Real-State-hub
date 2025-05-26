const express = require("express");
const multer = require("multer");
const router = express.Router();
const Property = require("../models/Property");

// Image upload config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();

    const propertiesWithImage = properties.map((p) => {
      const base64Image = `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`;

      return {
        _id: p._id,
        title: p.title,
        location: p.location,
        type: p.type,
        price: p.price,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        description: p.description,
        image: base64Image,
      };
    });

    res.json(propertiesWithImage);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// POST new property
router.post("/", async (req, res) => {
  try {
    const {
      title,
      location,
      type,
      price,
      area,
      bedrooms,
      bathrooms,
      description,
      image, // base64 string
    } = req.body;

    const matches = image.match(/^data:(.+);base64,(.+)$/);
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    const newProperty = new Property({
      title,
      location,
      type,
      price,
      area,
      bedrooms,
      bathrooms,
      description,
      image: {
        data: buffer,
        contentType: contentType,
      },
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created" });
  } catch (err) {
    console.error("Failed to save property", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// routes/properties.js
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    const base64Image = `data:${property.image.contentType};base64,${property.image.data.toString("base64")}`;

    res.json({
      _id: property._id,
      title: property.title,
      location: property.location,
      type: property.type,
      price: property.price,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      description: property.description,
      image: base64Image,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
