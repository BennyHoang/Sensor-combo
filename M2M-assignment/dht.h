#ifndef DHT11_SENSOR_H
#define DHT11_SENSOR_H DHT11_SENSOR_H
#include "application.h"
#include "Adafruit_DHT.h"

#define DHT11_PIN D2
#define DHTTYPE DHT11

class DHT11Sensor{
public:
  DHT11Sensor();
  void init();
  float getCelcius();
  float getFarenheit();
  float getHumidity();
private:
  float number_of_readings;
};


#endif
