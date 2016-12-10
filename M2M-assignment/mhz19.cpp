#include "mhz19.h"

MHZ19Sensor::MHZ19Sensor(){
  _prevVal = LOW;
  _th, _tl, _h, _l, _ppm = 0;
}
void MHZ19Sensor::init(){
  pinMode(MHZ19_PIN, INPUT);
}

int MHZ19Sensor::getSensorValue(){
  long tt = millis();
  int value = digitalRead(MHZ19_PIN);
// DOC: https://github.com/ihormelnyk/mh-z19_co2_meter/blob/master/mh-z19_co2_meter.ino
  if(value == HIGH){
    if(value != _prevVal){
      _h = tt;
      _tl = _h - _l;
      _prevVal = value;
    }
  } else{
    if(value != _prevVal){
      _l = tt;
      _th = _l - _h;
      _prevVal = value;
      _ppm = 2000 * (_th - 2) / (_th + _tl - 4);
    }
  }
  return(_ppm);
}
