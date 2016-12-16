#include "mhz19.h"

MHZ19Sensor::MHZ19Sensor(){
  prevVal = LOW;

}
void MHZ19Sensor::init(){
  pinMode(MHZ19_PIN, INPUT);
}

int MHZ19Sensor::getSensorValue(){
  long tt = millis();
  int value = digitalRead(MHZ19_PIN);
// DOC: https://github.com/ihormelnyk/mh-z19_co2_meter/blob/master/mh-z19_co2_meter.ino
  if(value == HIGH){
    if(value != prevVal){
      h = tt;
      tl = h - l;
      prevVal = value;
    }
  } else{
    if(value != prevVal){
      l = tt;
      th = l - h;
      prevVal = value;
      ppm = 2000 * (th - 2) / (th + tl - 4);
    }
  }

  return(ppm);
}
