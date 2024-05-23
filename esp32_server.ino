#include <WiFi.h>
#include <TB6612_ESP32.h>

// Replace with your network credentials
//const char* ssid = "TP-Link_9CA0";
//const char* password = "34283455";
const char* ssid = "Lab 305";
const char* password = "Tudnikell";
// 00000000

// Set web server port number to 80
WiFiServer server(80);

// Function prototypes
void handleUp();
void handleDown();
void handleLeft();
void handleRight();

//Motor part
#define AIN1 13 // ESP32 Pin D13 to TB6612FNG Pin AIN1
#define BIN1 12 // ESP32 Pin D12 to TB6612FNG Pin BIN1
#define AIN2 14 // ESP32 Pin D14 to TB6612FNG Pin AIN2
#define BIN2 27 // ESP32 Pin D27 to TB6612FNG Pin BIN2
#define PWMA 26 // ESP32 Pin D26 to TB6612FNG Pin PWMA
#define PWMB 25 // ESP32 Pin D25 to TB6612FNG Pin PWMB
#define STBY 33 // ESP32 Pin D33 to TB6612FNG Pin STBY
const int offsetA = 1;
const int offsetB = 1;
Motor motor1 = Motor(AIN1, AIN2, PWMA, offsetA, STBY,5000 ,8,1 );
Motor motor2 = Motor(BIN1, BIN2, PWMB, offsetB, STBY,5000 ,8,2 );

void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("New Client.");
    String currentLine = "";

    // Read the HTTP request
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        currentLine += c;
        Serial.println(c);
        // Check if the HTTP request has ended
        if (c == '\n') {
          if (currentLine.startsWith("GET /up")) {
            handleUp(client);
          } else if (currentLine.startsWith("GET /down")) {
            handleDown(client);
          } else if (currentLine.startsWith("GET /left")) {
            handleLeft(client);
          } else if (currentLine.startsWith("GET /right")) {
            handleRight(client);
          } else if (currentLine.startsWith("GET /longerup")) {
            handleUpLonger(client);
          } else if (currentLine.startsWith("GET /longerdown")) {
            handleDownLonger(client);
          }
          break;
        }
      }
    }
    
    // Close the connection
    client.stop();
    
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}

// Handler functions
void handleUp(WiFiClient client) {
  forward(motor1, motor2, -200);        // Forward Motor 1 and Motor 2 for 1 seconds at full speed
  delay(300);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Up action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Up action handled");
}

// Handler functions
void handleUpLonger(WiFiClient client) {
  forward(motor1, motor2, -200);        // Forward Motor 1 and Motor 2 
  delay(1000);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Up action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Up action handled");
}

void handleDown(WiFiClient client) {
  forward(motor1, motor2, 200);        // Backward Motor 1 and Motor 2 
  delay(300);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Down action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Down action handled");
}

void handleDownLonger(WiFiClient client) {
  forward(motor1, motor2, 200);        // Backward Motor 1 and Motor 2 
  delay(1000);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Down action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Down action handled");
}

void handleLeft(WiFiClient client) {
  right(motor1, motor2, 255);        // Forward Motor 1 and Motor 2 for 1 seconds at full speed
  delay(500);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Left action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Left action handled");
}

void handleRight(WiFiClient client) {
  left(motor1, motor2, 255);        // Forward Motor 1 and Motor 2 for 1 seconds at full speed
  delay(500);
  brake(motor1, motor2);     // Stop Motor 1 and Motor 2 
  Serial.println("Right action handled");
  client.println("HTTP/1.1 200 OK");
  client.println("Content-type:text/plain");
  client.println("Connection: close");
  client.println();
  client.println("Right action handled");
}
