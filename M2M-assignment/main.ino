#include "mq7.h"
#include "mhz19.h"
#include "pir.h"
#include "dht.h"
#include "light_sensor.h"

MQ7Sensor MQ7;
MHZ19Sensor MHZ19;
PIRSensor PIR;
DHT11Sensor DHT_11;
LIGHTSensor LIGHT;
//Delay for production:
//unsigned long sendDelay = 2*60*1000;
char location[64] = "default_value";
//Delay for debugging:
unsigned long sendDelay = 10000;
void setup() {
    Particle.function("setLoc", setLoc);
    Serial.begin(9600);
    MQ7.init();
    MHZ19.init();
    PIR.init();
    DHT_11.init();
    LIGHT.init();
    Serial.print("Preheating");
    delay(10000);

}

void loop() {

generatePayload();
delay(sendDelay);
}

int setLoc(String command){
  command.toCharArray(location,64);
  return 0;
}


void generatePayload(){
  //INITIALIZING SENSOR VALUES
  int lightValue = LIGHT.getSensorValue();
  int CO2 = MHZ19.getSensorValue();
  float humidity = DHT_11.getHumidity();
  float celcius = DHT_11.getCelcius();
  bool motion;

  Serial.print("light value= ");
  Serial.println(lightValue);
  Serial.println("=================================");
  // OUTPUT for CO2
  Serial.print("CO2 = ");
  Serial.println(CO2);
  Serial.println("=================================");

// OUTPUT for Motion
  if(PIR.calibrated())
  {
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
snprintf(payload, sizeof(payload),"{\"C2\": %d, \"t\": %f,\"h\": %f,\"l\": %d,\"m\":%s, \"loc\":\"%s\"}",CO2,celcius,humidity,lightValue, motion ? "true": "false", location);

//String message = String("{\"C2\" : \"" + (String)CO2 + "\", \"t\" : \"" + (String)celcius + "\", \"h\" : \"" + (String)humidity + "\", \"m\" : \"" + (String)motion + "\", \"l\" : \"" + (String)lightValue + "\", \"loc\" : \"" + (String)location + "\"}");
//Publishes to eventhub
//Particle.publish("PublishSensorData",payload);
//Publishes to iotHub
Particle.publish("sensor-hub",payload,PRIVATE);

}
