#ifndef MHZ19_SENSOR_H
#define MHZ19_SENSOR_H MHZ19_SENSOR_H

#include "application.h"

#define MHZ19_PIN D1

class MHZ19Sensor{
public:
  MHZ19Sensor();
  void init();
  int getSensorValue();
private:
  int prevVal;
  int th, tl, h, l, ppm;
};

#endif
