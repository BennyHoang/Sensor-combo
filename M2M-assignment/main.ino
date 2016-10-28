#include "mq7.h"
#include "pir.h"

MQ7Sensor MQ7;
PIRSensor PIR;


unsigned long sendDelay = 10000;
void setup() {
    Serial.begin(9600);
    PIR.init();
    delay(10000);
}

void loop() {
/*  Serial.print("CO = ");
  Serial.println(MQ7.getSensorValue());
  Serial.println("=================================");
  */
  if(PIR.calibrated())
  {
    Serial.print("Calibrated");
    PIR.readSensorValue();
    PIR.outputMotion();
  }else{
    Serial.println("Calibrating...");
  }
//  delay(10000);
}
