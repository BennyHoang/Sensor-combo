#include "dht.h"
DHT dht(DHT11_PIN, DHT11);

DHT11Sensor::DHT11Sensor(){
  number_of_readings = 10;
}

void DHT11Sensor::init(){
  dht.begin();
}

float DHT11Sensor::getCelcius(){
  float celcius = 0.0;
  for(int i = 0; i < number_of_readings; i++){
    celcius += dht.getTempCelcius();
  }
  return celcius/number_of_readings;
}

float DHT11Sensor::getFarenheit(){
  float farenheit = 0;
  for(int i = 0; i < number_of_readings; i++){
    farenheit += dht.getTempFarenheit();
  }
  return farenheit/number_of_readings;
}

float DHT11Sensor::getHumidity(){
  float humidity = 0;
  for(int i = 0; i < number_of_readings; i++){
    humidity += dht.getHumidity();
  }
  return humidity/number_of_readings;
}
