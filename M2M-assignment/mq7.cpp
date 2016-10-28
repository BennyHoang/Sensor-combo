#include "mq7.h"
MQ7Sensor::MQ7Sensor(){
}

void MQ7Sensor::init(){
  pinMode(MQ7_PIN, INPUT);
}


int MQ7Sensor::getSensorValue(){
  int value = analogRead(MQ7_PIN);
  return value;
}
