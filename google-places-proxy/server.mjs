// google-places-proxy/server.mjs
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Ensure you load environment variables if needed

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/nearby-hospitals', async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate latitude and longitude if necessary
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required." });
  }

  // Hardcoded hospital data for Gandhi Nagar, Airport Road, Bhopal, Madhya Pradesh, India
  const hospitals = [
    {
      name: "AIIMS Bhopal",
      vicinity: "Saket Nagar, Bhopal, Madhya Pradesh 462020, India"
    },
    {
      name: "Bansal Hospital",
      vicinity: "Chuna Bhatti, Bhopal, Madhya Pradesh 462016, India"
    },
    {
      name: "Narmada Health Group",
      vicinity: "E-3/12, Arera Colony, Bhopal, Madhya Pradesh 462016, India"
    },
    {
      name: "People's Hospital",
      vicinity: "Bhanpur, Bhopal, Madhya Pradesh 462037, India"
    },
    {
      name: "Chirayu Medical College & Hospital",
      vicinity: "Bairagarh, Bhopal, Madhya Pradesh 462030, India"
    },
    {
      name: "LBS Hospital",
      vicinity: "Kolar Road, Bhopal, Madhya Pradesh 462042, India"
    },
    { 
      name: "Bhopal Memorial Hospital and Research Centre",
      vicinity: "Raisen Rd, Karond, Bhopal, Madhya Pradesh 462038, India"
    },
    {
      name: "Bhopal Fracture Hospital",
      vicinity: "Jahangirabad, Bhopal, Madhya Pradesh 462008, India"
    },
    {
      name: "Sagar Multispeciality Hospital",
      vicinity: "Hoshangabad Road ,Bhopal, Madhya Pradesh 462042, India"
    },
    {
      name: "Suyash Hospital",
      vicinity: "Kolar Road, Bhopal, Madhya Pradesh 462042, India"
    }

  ];

  console.log("Returning hardcoded hospital data:", hospitals);
  res.json({ results: hospitals });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});