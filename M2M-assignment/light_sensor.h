#ifndef LIGHT_SENSOR_H
#define LIGHT_SENSOR_H PIR_SENSOR_H

#include "application.h"
#define LIGHT_PIN A5

class LIGHTSensor{
public:
  LIGHTSensor();
  void init();
  int getSensorValue();
};

#endif
