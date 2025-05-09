const predictClothing = (current, forecast) => {
    const tempK = current.main.temp;
    const tempC = tempK - 273.15;
    const windSpeed = current.wind.speed;
    let clothingSuggestion = "";
  
    if (tempC < 10) {
      clothingSuggestion = "It's cold. Wear a heavy jacket, sweater, and warm clothing.";
    } else if (tempC >= 10 && tempC < 20) {
      clothingSuggestion = "It's a bit chilly. Wear a light jacket or sweater.";
    } else if (tempC >= 20 && tempC < 30) {
      clothingSuggestion = "The weather is moderate. A t-shirt and jeans should be fine.";
    } else {
      clothingSuggestion = "It's hot. Wear light clothing such as shorts and a t-shirt.";
    }
    
    
    const upcomingForecast = forecast.list[0];
    if (upcomingForecast && upcomingForecast.weather[0].main.toLowerCase().includes("rain")) {
      clothingSuggestion += " Also, expect rain, so carry an umbrella or wear a waterproof jacket.";
    }
    
  
    if (windSpeed > 10) {
      clothingSuggestion += " It is windy, consider a windbreaker.";
    }
    
    return { clothingSuggestion, predictedTempC: tempC.toFixed(2) };
  };
  
  module.exports = { predictClothing };
  