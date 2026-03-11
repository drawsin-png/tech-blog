---
title: "ROS2와 터틀봇(TurtleBot3)을 이용한 자율주행 시뮬레이터 구축 및 SLAM 적용기"
date: "2026-02-15"
description: "로봇 운영체제 ROS2 Foxy 환경에서 터틀봇을 활용해 지도(Map)를 그리고 자율주행(Navigation2)을 수행해본 프로젝트 회고"
tags: ["ROS2", "TurtleBot", "자율주행", "SLAM", "Navigation2", "Robotics"]
---

최근 로보틱스와 자율주행에 큰 관심을 가지게 되면서, **ROS2(Robot Operating System 2)**와 국민 교육용 로봇인 **터틀봇(TurtleBot3)**을 활용한 자율주행 파이프라인을 직접 구축해 보았습니다.

이 글에서는 제가 어떻게 시뮬레이터 상에서 로봇을 움직여 지도를 그리고, 또 자율주행을 구현했는지 그 과정과 맞닥뜨린 트러블슈팅 경험을 공유합니다.

## 1. 프로젝트 아키텍처 및 환경
이번 프로젝트의 핵심은 **Gazebo 시뮬레이터** 상에서 가상의 로봇을 돌리는 것이었습니다. 실물 로봇이 없어도 물리 엔진이 적용된 가상 공간에서 완벽한 테스트가 가능합니다.
- **OS**: Ubuntu 22.04 LTS
- **Middleware**: ROS2 Humble (최신 LTS)
- **Simulators**: Gazebo Classic (추후 Ignition으로 마이그레이션 예정)
- **Robot Model**: TurtleBot3 (Burger 모델)

## 2. SLAM 기반의 맵핑(Mapping)의 늪
자율주행을 하려면 먼저 로봇이 '내가 어디에 있는지(Localization)' 알고 '주변 지형이 어떻게 생겼는지(Mapping)' 기록해야 합니다. 이를 **SLAM (Simultaneous Localization and Mapping)** 이라 부릅니다.

1. `Cartographer` 패키지를 이용해 Gazebo 월드 내에서 로봇을 키보드로 수동 조작(Teleop)해 돌아다녔습니다.
2. 로봇 위에 달린 라이다(LiDAR) 센서가 360도 스캔 데이터를 `scan` 토픽으로 Publish 합니다.
3. 이를 받아 Cartographer 노드가 2D 점유 격자 지도(Occupancy Grid Map)를 점차 그려나갔습니다.

**🔥 트러블슈팅:** 
초기에는 로봇의 바퀴 오도메트리(Odometry) 센서 데이터에 노이즈가 껴있어 지도가 자꾸 어긋나는 증상 (Drift 현상)이 있었습니다. `cartographer.lua` 설정 파일에서 `use_odometry` 가중치 파라미터를 낮추고, 라이다 기반의 스캔 매칭 가중치를 높이는 방식으로 해결했습니다.

## 3. Navigation2 (Nav2) 설정 및 주행 (Path Planning)
지도가 완성(`map_saver_cli`로 `.pgm` 및 `.yaml` 저장)된 후에는 본격적인 자율주행 시스템, Nav2를 설정했습니다.

Nav2 아키텍처는 참 복잡하지만, 결국 핵심은 다음과 같습니다.
- **Global Planner**: 시작점과 목표점 사이의 전체 최적 경로(주로 A* 알고리즘)를 짭니다.
- **Local Planner**: 실제 굴러가는 로봇이 동적인 실시간 장애물(갑자기 튀어나오는 사람 등)을 피하며 짧은 경로를 수정해 나갑니다. (DWA 알고리즘 활용)
- **Costmap**: 벽 주위는 Cost를 높게 줘서 로봇이 부딪치지 않도록 멀찍이 떨어져 가게 만듭니다.

### 4. 실제 구동 결과 및 인사이트
`rviz2` (ROS 시각화 툴)상에서 `2D Goal Pose` 버튼을 클릭해 원하는 위치를 찍어주면, 로봇이 스스로 경로를 생성하고 장애물을 피해 도착하는 모습을 보니 소름이 돋았습니다. 

특히 좁은 골목을 빠져나갈 때 Local Planner가 Recovery Behavior(제자리 돌기 등)를 작동시키며 빠져나오려는 로직이 매우 인상 깊었습니다.

## 💡 결론
ROS2는 러닝 커브가 꽤 가파르지만, 강력한 비동기 통신 시스템(DDS)을 기반으로 한 패키지 생태계는 타의 추종을 불허합니다. 앞으로는 이 Gazebo 시나리오에 **카메라 비전 기반의 차선 인식(OpenCV)**이나 **Python 강화학습 모델**을 연동시켜 스스로 주행하는 더 똑똑한 시스템으로 업그레이드해볼 계획입니다.
