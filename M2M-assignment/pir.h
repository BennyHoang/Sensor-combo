#ifndef PIR_SENSOR_H
#define PIR_SENSOR_H PIR_SENSOR_H

#include "application.h"

#define PIR_PIN D0
#define LED_PIN D7

class PIRSensor{
public:
  PIRSensor();
  void init();
  bool calibrated();
  void readSensorValue();
  void outputMotion();
private:
  int _calibrationTime;
  int _val;
  int _state;
};

#endif
