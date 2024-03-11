#include <led_ctrl.h>
#include <log.h>
#include <lte.h>
#include <mqtt_client.h>
#include <ArduinoJson.h>

// OpenMV Cam serial bus
#define OpenMVSerial Serial2

// MQTT topic name 
#define AWS_PUB_TOPIC "vehicle-detections"

// Unique device ID
#define DEVICE_ID "vehicle_counter_001"

void setup() {
  
  // LED control setup
  LedCtrl.begin();
  LedCtrl.startupCycle();

  // Log setup
  Log.begin(9600);
  Log.info(F("Starting IoT vehicle counting device"));

  // OpenMV Cam hardware serial setup
  OpenMVSerial.swap(1);
  OpenMVSerial.begin(9600);
}

void loop() {

  // Establish LTE connection to operator
  if (!Lte.isConnected()) {
    if (Lte.begin()) {
      Log.infof(F("Connected to operator: %s\r\n"), Lte.getOperator().c_str());
    } else {
      Log.error(F("Failed to connect to operator\r\n"));
      return;
    }
  }

  // Establish AWS MQTT connection
  if (Lte.isConnected()) {
    if (!MqttClient.isConnected()) {
      if (MqttClient.beginAWS()) {
        Log.infof(F("Connected to AWS\r\n"));
      } else {
        Log.error(F("Failed to connect to AWS\r\n"));
        return;
      }
    }
  }
  
  // Check for data sent from OpenMV Cam 
  if (OpenMVSerial.available() > 0) {

    // Read vehicle detection data
    LedCtrl.on(Led::USER);
    int num_vehicles = OpenMVSerial.read();
    Log.infof(F("Vehicles detected: %d\r\n"), num_vehicles);
    LedCtrl.off(Led::USER);

    // Format data into JSON string
    StaticJsonDocument<200> doc;
    doc["device_id"] = DEVICE_ID;
    doc["num_vehicles"] = num_vehicles;
    char message[512];
    serializeJson(doc, message);

    // Publish data to MQTT topic
    Log.infof(F("Publishing data: %s\r\n"), message);
    if (!MqttClient.publish(AWS_PUB_TOPIC, message)) {
      Log.warn(F("Failed to publish data\r\n"));
    }
  }
}
