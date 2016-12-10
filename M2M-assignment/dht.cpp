#include "dht.h"
DHT dht(DHT11_PIN, DHT11);

DHT11Sensor::DHT11Sensor(){

}

void DHT11Sensor::init(){
  dht.begin();
}

float DHT11Sensor::getCelcius(){
  float celcius = dht.getTempCelcius();
  if(isnan(celcius)){
    celcius = 0.0;
  }
  return celcius;
}

float DHT11Sensor::getFarenheit(){
  float farenheit = dht.getTempFarenheit();
  return farenheit;
}

float DHT11Sensor::getHumidity(){
  float humidity = dht.getHumidity();
  if(isnan(humidity)){
    humidity = 0.0;
  }
  return humidity;
}
