#include "mq7.h"
#include "pir.h"
#include "dht.h"
#include "light_sensor.h"

MQ7Sensor MQ7;
PIRSensor PIR;
DHT11Sensor DHT_11;
LIGHTSensor LIGHT;

//unsigned long sendDelay = 2*60*1000;
unsigned long sendDelay = 10000;
void setup() {
    Serial.begin(9600);
    PIR.init();
    DHT_11.init();
    LIGHT.init();
    delay(10000);
}

void loop() {

generatePayload();
delay(sendDelay);
}

void generatePayload(){
  //INITIALIZING SENSOR VALUES
  int lightValue = LIGHT.getSensorValue();
  int COValue = MQ7.getSensorValue();
  float humidity = DHT_11.getHumidity();
  float celcius = DHT_11.getCelcius();
  bool motion;

  Serial.print("light value= ");
  Serial.println(lightValue);
  Serial.println("=================================");
  //  OUTPUT for CO
  Serial.print("CO = ");
  Serial.println(COValue);
  Serial.println("=================================");

// OUTPUT for Motion
  if(PIR.calibrated())
  {
    Serial.println("Calibrated");
    PIR.readSensorValue();
    PIR.outputMotion();
    Serial.println("=================================");
    motion = PIR.getMotionStatus();
    Serial.println(motion);

  }else{
    Serial.println("Calibrating...");
    Serial.println("=================================");
  }

Serial.print("Humidity: ");
Serial.println(humidity);
Serial.println("=================================");
Serial.print("Celcius: ");
Serial.println(celcius);
Serial.println("=================================");

char payload[255];
snprintf(payload, sizeof(payload),"{\"C\": %d,\"t\": %f,\"h\": %f,\"l\": %d,\"m\":%s}",COValue,celcius,humidity,lightValue, motion ? "true": "false");
Particle.publish("PublishSensorData",payload);

}
