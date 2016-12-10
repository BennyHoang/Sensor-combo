#ifndef MQ7_CO_SENSOR_H
#define MQ7_CO_SENSOR_H MQ7_CO_SENSOR_H

#include "application.h"

#define MQ7_PIN A0

class MQ7Sensor{
public:
  MQ7Sensor();
  void init();
  int getSensorValue();
};


#endif
