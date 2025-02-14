
#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#define WIFI_SSID "realme 8i"  
#define WIFI_PASSWORD "1234512345"   

// Insert Firebase project API Key
#define API_KEY ""

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "" 

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
int ecgPin = A0;
int previous_ecg = 0;
int ecgValue = 0;
String Array[500];
void setup(){
  Serial.begin(115200);
  pinMode(ecgPin,INPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Connected Successfully");

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;
  if(Firebase.signUp(&config, &auth,"","")){
    Serial.println("success");
  }else{
    Serial.println("not succeed");
  }
  config.token_status_callback = tokenStatusCallback; 
  Firebase.begin(&config, &auth);
}
void loop() {
  previous_ecg = analogRead(ecgPin) >> 4;  
  for (int i = 0; i < 500; i++) {
    ecgValue = analogRead(ecgPin) >> 4;
    ecgValue = previous_ecg / 2 + (ecgValue - 30) / 2;
    Array[i] = ecgValue;
    Serial.println(ecgValue);
    delay(10);
  }
  Firebase.RTDB.setInt(&fbdo, "ecgData/ecgValue", ecgValue);
}
 /* if (Firebase.RTDB.setJSON(&fbdo, "ecgData/ecgvalue", json)) {
    Serial.println("Data set successfully");
  } else {
    Serial.println("Failed to set data");
    Serial.println(fbdo.errorReason());
  }
  delay(10 * 60 * 1000);
}*/
