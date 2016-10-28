#include "pir.h"

PIRSensor::PIRSensor(){
  _calibrationTime = 10000;
  _val = 0;
  _state = LOW;
}

void PIRSensor::init(){
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  pinMode(D1, OUTPUT);
}

bool PIRSensor::calibrated(){
  return millis() - _calibrationTime > 0;
}

void PIRSensor::readSensorValue(){
  _val = digitalRead(PIR_PIN);
}

void PIRSensor::outputMotion(){
  if(_val == HIGH){
    if(_state == LOW){
      //Particle.publish("designingiot/s15/motion");
      Serial.println("Motion detected");
      _state = HIGH;
      digitalWrite(D1, HIGH);
    }
  }else{
    if(_state == HIGH){
      Serial.println("motion ended");
      _state = LOW;
      digitalWrite(D1, LOW);
    }
  }
}
