#include "mq7.h"
#include "pir.h"
#include "dht.h"
#include "light_sensor.h"

MQ7Sensor MQ7;
PIRSensor PIR;
DHT11Sensor DHT_11;
LIGHTSensor LIGHT;

unsigned long sendDelay = 10000;
void setup() {
    Serial.begin(9600);
    PIR.init();
    DHT_11.init();
    LIGHT.init();
    delay(10000);
}

void loop() {
  Serial.print("light value= ");
  Serial.println(LIGHT.getSensorValue());
  Serial.println("=================================");
  //  OUTPUT for CO
  Serial.print("CO = ");
  Serial.println(MQ7.getSensorValue());
  Serial.println("=================================");

// OUTPUT for Motion
  if(PIR.calibrated())
  {

    Serial.println("Calibrated");
    PIR.readSensorValue();
    PIR.outputMotion();
    Serial.println("=================================");
  }else{
    Serial.println("Calibrating...");
    Serial.println("=================================");
  }


Serial.print("Humidity: ");
Serial.println(DHT_11.getCelsius());
Serial.println("=================================");

delay(1000);
}
