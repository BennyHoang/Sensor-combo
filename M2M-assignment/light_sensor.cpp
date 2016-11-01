#include "light_sensor.h"

LIGHTSensor::LIGHTSensor(){

}

void LIGHTSensor::init(){
  pinMode(LIGHT_PIN, INPUT);
}
int LIGHTSensor::getSensorValue(){
  int value = analogRead(LIGHT_PIN);
  return value;
}
