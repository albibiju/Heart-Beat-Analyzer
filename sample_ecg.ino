#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include<addons/RTDBHelper.h>// For ESP8266, use FirebaseESP8266.h
// Define your Firebase credentials here
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""

#define WIFI_SSID "realme X50 Pro 5G"  
#define WIFI_PASSWORD "13121312"   

const unsigned long uploadInterval = 1000; // Upload data every 1 second
unsigned long lastUploadTime = 0;
const int bufferSize = 500; // Adjust the buffer size as needed
int ecgBuffer[bufferSize];
int bufferIndex = 0;
unsigned long timeStamp;
int ecgPin = A0;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
 config.api_key= FIREBASE_AUTH;
 config.database_url=FIREBASE_HOST;
 config.token_status_callback = tokenStatusCallback; 
 if(Firebase.signUp(&config, &auth,"","")){
    Serial.println("firbase successfully intialized");
  }else{
    Serial.println("firbase not succeed");
  }
  // Initialize Firebase
  Firebase.begin(&config,&auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Simulate ECG data collection every 10ms for testing purposes
  unsigned long currentTime = millis();
  if (currentTime - lastUploadTime >= 10) {
    // Collect ECG data (replace with your actual data collection code)
    int ecgValue = readECGValue();
    // Store ECG data in the buffer
    ecgBuffer[bufferIndex] = ecgValue;
    bufferIndex++;
    // Check if the buffer is full
    if (bufferIndex >= bufferSize) {
      // Upload buffered data to Firebase
      uploadDataToFirebase();
      // Reset buffer index
      bufferIndex = 0;
    }
    // Update last upload time
    lastUploadTime = currentTime;
  }
}

void uploadDataToFirebase() {
  // Create a JSON object to store the buffered ECG data
  FirebaseJson json;
  FirebaseJson timejson;
  for (int i = 0; i < bufferSize; i++) {
    timeStamp = millis();
    String key = "data_" + String(i);
    json.set(key, ecgBuffer[i]);
    timejson.set(key, timeStamp);
  }
    //Firebase.RTDB.pushJSON(&fbdo,"ecgData/ecgValue", &json);
    Firebase.RTDB.setJSON(&fbdo,"ecgData/timeStamp", &timejson);
  if (Firebase.RTDB.setJSON(&fbdo,"ecgData/ecgValue", &json)) {
    Serial.println("Data upload to Firebase sucess");
  } else {
    Serial.println("Data uploaded to Firebase failed");
    Serial.println(fbdo.errorReason());
  }
}

int readECGValue() {
  int ecgreading = analogRead(ecgPin);
  Serial.println(ecgreading);
  delay(10);
  return ecgreading; // Simulated ECG value within a range
}
