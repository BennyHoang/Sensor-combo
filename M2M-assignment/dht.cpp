#include "dht.h"
DHT dht(DHT11_PIN, DHT11);

DHT11Sensor::DHT11Sensor(){

}

void DHT11Sensor::init(){
  dht.begin();
}

float DHT11Sensor::getCelcius(){
  float celcius = dht.getTempCelcius();
  return celcius;
}

float DHT11Sensor::getFarenheit(){
  float farenheit = dht.getTempFarenheit();
  return farenheit;
}

float DHT11Sensor::getHumidity(){
  float humidity = dht.getHumidity();
  return humidity;
}
