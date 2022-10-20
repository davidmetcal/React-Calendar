const API_KEY = "sxBV8WX0KXGGfbGD3899Alg8w7hfvhJg";

export const getListOfTowns = async (city) => {
  return await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}`
  )
    .then((response) => response.json())
    .then((data) => data);
};

export const getWeather = async (key) => {
  return await fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data);
};
