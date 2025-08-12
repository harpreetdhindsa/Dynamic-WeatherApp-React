//background function to set background based on differnt weather conditions

const Background = (condition: string): string => {
  const weatherCondition = condition.toLowerCase().trim();

  if (weatherCondition.includes("clear")) {
    return "linear-gradient(to bottom, #FFF9C4, #FFECB3)";
  }

  if (weatherCondition.includes("few clouds")) {
    return "linear-gradient(to bottom, #D0E8F2, #F0F6FA)"; 
  }

  if (weatherCondition.includes("scattered clouds")) {
    return "linear-gradient(to bottom, #B0CFE8, #D6E3F0)"; 
  }

  if (weatherCondition.includes("broken clouds")) {
    return "linear-gradient(to bottom, #C1CAD6, #E2E8F0)"; 
  }

  if (weatherCondition.includes("shower rain")) {
    return "linear-gradient(to bottom, #B3E5FC, #E1F5FE)"; 
  }

  if (weatherCondition.includes("rain")) {
    return "linear-gradient(to bottom, #90CAF9, #E3F2FD)"; 
  }

  if (weatherCondition.includes("thunderstorm")) {
    return "linear-gradient(to bottom, #D1C4E9, #B39DDB)"; 
  }

  if (weatherCondition.includes("snow")) {
    return "linear-gradient(to bottom, #E3F2FD, #BBDEFB)"; 
  }

  if (weatherCondition.includes("mist")) {
    return "linear-gradient(to bottom, #F5F5F5, #EEEEEE)"; 
  }

//if condition is not matching 
return "linear-gradient(to bottom, #ffffff, #eeeeee)";
};

export default Background;
