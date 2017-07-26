#define pirOutside 10
#define pirInside 8
#define SERVO 2

int deathOrAlive;
bool outInput,inInput;

#include <Wire.h>
#include <UnoWiFiDevEd.h>
#define CONNECTOR     "rest"
#define SERVER_ADDR   "158.108.165.223"
String qwerty= "";
CiaoData data;

#include<Servo.h>
Servo myServo;
void setup() {
  // put your setup code here, to run once:
  pinMode(pirOutside,INPUT);
  pinMode(pirInside,INPUT);
  deathOrAlive=0;
  //Serial.begin(9600);
  Ciao.begin();
  myServo.write(90);

  myServo.attach(SERVO);
}
void setdataToserver(String x,int val)
{
  String qwerty="";
  qwerty = "/data/OACEED/";
  qwerty += x ;
  qwerty+= "/set/";
  qwerty += (String)val;
  data = Ciao.write(CONNECTOR,SERVER_ADDR,qwerty);
  //if(!data.isEmpty())Serial.println("OK");
  //else Serial.println("ERROR");
  
}
String getFromserver(String x)
{
  qwerty = "/data/OACEED/";
  qwerty += x;
  data = Ciao.read(CONNECTOR, SERVER_ADDR,qwerty);
  return data.get(2);
}
void loop() {
  // put your main code here, to run repeatedly:
  outInput = digitalRead(pirOutside);
  inInput = digitalRead(pirInside);
  //if(outInput==HIGH)Serial.println("Out acctive");
  //if(inInput==HIGH)Serial.println("In acctive");
  
  if(outInput&&(!inInput))
  {
    while(1)
    {
      //Serial.println("IN LOOP");
      
      deathOrAlive=1;
      setdataToserver("deathORalive",deathOrAlive);
      outInput = digitalRead(pirOutside);
      inInput = digitalRead(pirInside);
      myServo.write(0);
      if(!(outInput)&&inInput)break;
    }
  }
  deathOrAlive = 0;
  
  setdataToserver("deathORalive",deathOrAlive);
  myServo.write(90);
  
}
