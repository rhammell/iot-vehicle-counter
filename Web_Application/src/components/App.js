import React, { useState, useEffect } from 'react';
import Map from './Map'
import Menu from './Menu'

function App() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Fuction to request deivce data from API
  const fetchDevices = async () => {

    try {
      // Update loading state
      setIsLoading(true);

      // Get devices API URL
      const apiUrl = process.env.REACT_APP_DEVICES_API_URL;
      if (apiUrl == '') {
        throw new Error(`Devices API must be defined`);
      }

      // Make API request
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    
      // Parse device data
      const jsonData = await response.json();
      setDevices(jsonData);

    } catch (error) {
      // Set error state to true
      setIsError(true);
      console.error("Error fetching data:", error.message);
    } finally {
      // Update lodaing state
      setIsLoading(false);
    }
  };

  // Fetch devices once when component loads
  useEffect(() => { 
    fetchDevices();
  }, []);

  return (
    <>
      <Menu 
        devices={devices}
        isLoading={isLoading}
        isError={isError}
        selectedDevice={selectedDevice}
        handleSelect={setSelectedDevice} 
      />
      <Map
        devices={devices}
        selectedDevice={selectedDevice}
        handleSelect={setSelectedDevice} 
      />
    </>
  );
}

export default App;
