import { useState } from "react";
import axios from "../api";
import { toBase64 } from "../utils/toBase64.js";

function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    image: "", // base64 string
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    setFormData({ ...formData, image: base64 });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    alert("Property submitted");
    setFormData({
      title: "",
      location: "",
      type: "Flat",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded">
          <option>Flat</option>
          <option>Villa</option>
          <option>Plot</option>
        </select>
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input name="area" type="number" value={formData.area} onChange={handleChange} placeholder="Area (sq ft)" className="border p-2 rounded" />
        <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="border p-2 rounded" />
        <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        {/* <input type="file" onChange={handleFile} className="border p-2 rounded" /> */}
        <input className="border p-2 rounded cursor-pointer" type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
