// src/services/hospitalApi.js
export const findNearbyHospitals = async (latitude, longitude) => {
  try {
    const response = await fetch(`http://localhost:5000/api/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error(`HTTP error! status: ${response.status}`, errorDetails);
      throw new Error(`HTTP error! status: ${response.status} - ${errorDetails.message || 'Unable to fetch hospitals'}`);
    }

    const hospitals = await response.json();
    console.log("Hospitals data:", hospitals); // Log the hospitals data
    return hospitals.results; // Ensure this returns an array of hospital objects
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw error;
  }
};