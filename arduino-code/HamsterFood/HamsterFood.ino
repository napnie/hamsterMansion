#define trigPin 3
#define echoPin 4
int duration, distance, remain;

#define led2Pin 6
#define led1Pin 5
#define BUZZ 10
String alarmStatus = "";
int Light;

#include<dht.h>
#define dhtPin 8 
dht DHT;
int dhttemp;
int temperature;


#include <Wire.h>
#include <UnoWiFiDevEd.h>
#define CONNECTOR     "rest"
#define SERVER_ADDR   "158.108.165.223"
CiaoData data;

void setup() {
  //Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  pinMode(led1Pin,OUTPUT);
  pinMode(led2Pin,OUTPUT);
  pinMode(BUZZ,OUTPUT);

  Light=200;
  Ciao.begin();

  //Serial.begin(9600);
  
}
void setdataToserver(String x,int val)
{
  String qwerty="";
  qwerty = "/data/OACEED/";
  qwerty += x ;
  qwerty+= "/set/";
  qwerty += (String)val;
  data = Ciao.write(CONNECTOR,SERVER_ADDR,qwerty);
  
}

String getFromserver(String x)
{
  String qwerty="";
  qwerty = "/data/OACEED/";
  qwerty += x;
  data = Ciao.read(CONNECTOR, SERVER_ADDR,qwerty);
  return data.get(2);
}

void lightandsound(String Status)
{
  //Serial.println(Status);
  if(Status=="on")
  {
    //LED&BUZZER on
    if(Light==200)
    {
      Light=0;
    }
    else Light=200;
    //Serial.println(Light);
    analogWrite(led1Pin,Light);
    analogWrite(led2Pin,200-Light);
    analogWrite(BUZZ,5);
  }
  else
  {
    //LED&BUZZER off
    analogWrite(led1Pin,0);
    analogWrite(led2Pin,0);
    analogWrite(BUZZ,0);
  }
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration / 29 /2; //microseconds to cm.
  
  //Serial.println(distance);
  
  //Serial.print("remain: ");
  //Serial.println(remain);
  setdataToserver("Food",distance);

  //temp
  dhttemp = DHT.read11(dhtPin);
  int temperature = DHT.temperature;
   
  int humidity = DHT .humidity;//63
  //Serial.println("Temp = "+((String)temperature));
  //Serial.println("humidity = "+((String)DHT.humidity)+"\n");
  setdataToserver("Temperature",temperature);
  setdataToserver("Moisture",humidity);
  //find data about humidity!

  alarmStatus = getFromserver("Lure");
  if(alarmStatus=="1")lightandsound("on");
  else lightandsound("off");
  
}
