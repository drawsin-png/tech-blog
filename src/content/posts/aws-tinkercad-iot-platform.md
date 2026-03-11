---
title: "AWS EC2 기반 백엔드 배포 및 Tinkercad를 활용한 IoT 센서 연동기"
date: "2026-01-20"
description: "C언어 기반의 펌웨어(Arduino)와 클라우드 서버(AWS EC2) 인프라를 연결하여 실시간 데이터를 주고받는 소형 IoT 플랫폼 구축기"
tags: ["AWS", "IoT", "C언어", "Tinkercad", "Python", "Flask"]
---

하드웨어와 소프트웨어가 만나는 지점은 언제나 흥미롭습니다. 이번 프로젝트에서는 실제 아두이노 보드 대신, **Autodesk Tinkercad(팅커캐드)** 시뮬레이터를 활용해 가상의 회로를 구성하고, **C언어로 작성한 펌웨어 로직**을 클라우드 서버(AWS)와 연동하는 작업을 진행해 보았습니다.

## 1. 왜 Tinkercad 인가요?
IoT 프로젝트는 부품을 사서 조립하다가 시간이 다 가는 경우가 많습니다. 팅커캐드는 브라우저 상에서 아두이노, 브레드보드, 각종 센서들을 연결하고 바로 C언어 기반의 펌웨어 스케치를 구동해 볼 수 있는 훌륭한 환경을 제공합니다. (회로가 타버릴 걱정도 없습니다!)

## 2. 시스템 아키텍처
전체 시스템 아키텍처는 3-Tier 구조로 구성되었습니다.

- **Device (Tinkercad)**: 온도 센서(TMP36) 및 조도 센서 부착, C언어로 ADC(Analog-Digital Conversion) 수행 및 시리얼 통신을 통해 로컬 PC로 데이터 전달
- **Local Gateway (Python)**: 로컬 PC에서 PySerial 모듈로 시리얼 데이터를 읽어들인 뒤, 파이썬 스크립트를 통해 AWS Endpoint로 REST API(POST) 전송
- **Cloud Server (AWS EC2)**: Ubuntu 인스턴스, Nginx 리버스 프록시 적용, Python Flask 기반의 경량 백엔드 API 구동

## 3. C언어 기반의 펌웨어 작성 및 최적화
아두이노의 C/C++ 기반 코드 작성 시 메모리 누수와 루프 딜레이 관리가 핵심이었습니다.
온도 값을 읽어와 섭씨(Celsius)로 변환하는 공식은 데이터시트를 보고 작성했습니다.

```c
int sensorPin = A0; 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int reading = analogRead(sensorPin);
  // 전압을 온도로 변환하는 공식을 적용 (5V 기준)
  float voltage = reading * 5.0;
  voltage /= 1024.0;
  float temperatureC = (voltage - 0.5) * 100 ; 
  
  Serial.print("TEMP:");
  Serial.println(temperatureC);
  
  delay(2000); // 2초 주기 퍼블리시
}
```

## 4. 백엔드 배포: AWS EC2 인스턴스 격파기
로컬 서버에서 잘 돌아가던 Python 코드를 클라우드에 띄우는 건 늘 인프라 지식이 수반됩니다. 

1. **VPC 및 Security Group 설정**: 외부에서 API 접근이 가능하도록 EC2의 인바운드 규칙에 포트 80(HTTP)과 5000(Flask) 포트를 열어두었습니다.
2. **Gunicorn을 통한 배포**: 테스트용으로 사용하던 `flask run`은 싱글스레드라 실서비스에 부적합합니다. WSGI 서버인 Gunicorn을 프로세스로 띄워 멀티 워커를 할당했습니다.
3. **무중단 운영(Daemon)**: `systemd` 서비스 파일로 백엔드를 등록해 EC2가 리부팅되거나 런타임 에러로 앱이 죽어도 자동 재시작이 되도록 인프라를 견고히 짰습니다.

## ✨ 얻은 교훈과 앞으로의 계획
순수 소프트웨어만 다루다 하드웨어 시그널(C언어)이 파이썬(Python) 백엔드를 거쳐 통신하는 풀스택 스트림을 구축해 보니 데이터 파이프라인의 A to Z를 체감할 수 있었습니다. 
다음에는 단순히 HTTP POST가 아니라 **AWS IoT Core(MQTT 커넥션)**를 결합해 양방향 토픽 Pub/Sub 모델로 고도화시켜 보려 합니다.
