/* DHT library
 *
 * MIT license
 * written by Adafruit Industries
 * modified for Spark Core by RussGrue
 * */

#ifndef DHT_H
#define DHT_H

#include "application.h"
#include "math.h"

// how many timing transitions we need to keep track of. 2 * number bits + extra
#define MAXTIMINGS 85

#define DHT11 11
#define DHT22 22
#define DHT21 21
#define AM2301 21

class DHT {
	private:
		uint8_t data[6];
		uint8_t _pin, _type, _count;
		unsigned long _lastreadtime;
		boolean firstreading;
		float readTemperature();
		float convertFtoC(float);
		float convertCtoF(float);
		float convertCtoK(float);
		float computeHeatIndex(float tempFahrenheit, float percentHumidity);
		float computeDewPoint(float tempCelcius, float percentHumidity);
		float readHumidity(void);
		boolean read(void);

	public:
		DHT(uint8_t pin, uint8_t type, uint8_t count=6);
		void begin(void);
		float getHumidity();
		float getTempCelcius();
		float getTempFarenheit();
		float getTempKelvin();
		float getHeatIndex();
                float getDewPoint();

};
#endif
