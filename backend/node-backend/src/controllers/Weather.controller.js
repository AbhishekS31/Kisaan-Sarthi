const API_KEY = process.env.Weather_Api; // Get from https://www.weatherapi.com/

const sendRealTimeWeatherUpdate = async (location = 'Mumbai') => {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error.message}`);
        }

        const weatherData = await response.json();
        
        // Process the data as needed
        console.log('Real-Time Weather Data:', weatherData);
        return weatherData;

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error; // Re-throw for further handling
    }
};

// Usage


export {
    sendRealTimeWeatherUpdate
}