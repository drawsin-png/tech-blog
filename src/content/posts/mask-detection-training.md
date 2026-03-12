---
title: "Keras로 마스크 착용 감지(Mask Detection) 모델 학습하기"
date: "2026-02-26"
description: "Tensorflow Keras를 활용하여 실시간 마스크 착용 여부를 분류하는 딥러닝 모델 학습기"
tags: ["Deep Learning", "CNN", "Keras", "TensorFlow", "Computer Vision"]
---

컴퓨터 비전을 공부하며 한 번쯤 거쳐가는 교과서 같은 프로젝트, 바로 **마스크 착용 감지(Mask Detection)** 모델입니다. 오늘은 이 모델의 학습 파이프라인(`mask_train_model.py`)을 셋팅하고 실행하며 모델 파일(`.h5`)을 도출해낸 과정을 정리했습니다. 다른 기업들의 기술 블로그를 보며 '나는 언제 저렇게 해보나' 싶었는데, 차근차근 파이프라인을 구축해 보니 큰 도움이 되었습니다.

## 🛠 환경 설정의 늪 (Troubleshooting)
가상 환경을 올바르게 세팅하는 것부터 시작했습니다. 모델 코드를 돌리기 전 마주친 의존성 에러들은 아래와 같습니다.
- `TensorFlow` 미설치 문제
- `scikit-learn`, `matplotlib`, `pillow` 모듈 없음 (ModuleNotFoundError)

**해결:**
적절한 가상 환경을 활성화(`source venv/bin/activate`)한 후 필요한 패키지들을 `requirements.txt`에 명시하고 한꺼번에 설치했습니다. 딥러닝 프로젝트는 늘 버전 호환성이 골치 아프기 때문에 가상 환경 분리가 필수적입니다.

## 🧠 모델 아키텍처 및 학습
이번 코드는 Keras 기반의 CNN 모델 구조를 사용했습니다. VGG16이나 MobileNetV2와 같은 Pre-trained 모델을 백본으로 사용할 수도 있지만, 이번엔 내부 레이어를 커스텀으로 층을 쌓은 모델을 훈련했습니다.

학습 파이프라인의 핵심 과정:
1. **Data Augmentation**: `ImageDataGenerator`를 사용해 제한된 데이터셋을 뻥튀기(?)했습니다. 회전, 시프트, 줌 등의 증강을 거쳤습니다.
2. **Compile**: Optimizer로는 `Adam`을, Loss로는 `categorical_crossentropy`를 사용했습니다. (바이너리 분류라면 binary_crossentropy를 사용하기도 함)
3. **Train**: 설정된 에폭(Epoch)만큼 `model.fit()`을 실행했습니다.

## 📊 결과 검증 및 저장
학습이 끝난 후 Keras 3.x 호환 포맷으로 `mask_detector.h5` 모델 파일을 성공적으로 Export 했습니다.
또한, 모델의 학습 과정(Loss와 Accuracy의 변화)을 한눈에 볼 수 있도록 `matplotlib`를 이용해 `plot.png` 파일로 그래프를 그려 출력하도록 스크립트를 구현했습니다. 오버피팅(Overfitting) 여부를 이 그래프로 직관적으로 확인할 수 있어서 매우 유용했습니다.

## 💡 느낀 점
과거에는 오픈소스를 그대로 가져다 돌려보는 수준에 그쳤지만, 이제는 경로(Path)를 직접 설정하고 `.sh` 실행 쉘 스크립트(`run_live.sh`, `run_train.sh`)까지 수정할 수 있게 되었습니다. 에러가 나더라도 터미널 로그를 차분히 읽고 디버깅하는 근육이 조금 붙은 것 같아 뿌듯한 프로젝트였습니다.

---

## 📸 실행 결과 (Execution Results)

학습 파이프라인(`mask_train_model.py`) 실행을 통해 도출된 Acc/Loss 그래프입니다.

![Mask Detection Training Plot](/media/mask_plot.png)
*Tensorflow Keras 커스텀 CNN 모델의 Accuracy & Loss 학습 그래프*
