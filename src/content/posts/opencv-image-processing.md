---
title: "OpenCV 마스크 합성 엔지니어링: BGR과 HSV 색공간을 활용한 흑백-컬러 합성"
date: "2026-02-13"
description: "파이썬(Python)과 OpenCV(cv2) 라이브러리를 사용해 사진의 특정 부분(햇빛)만 컬러로 유지하고 나머지 배경은 흑백으로 변환하는 이미지 전처리 합성 노하우"
tags: ["OpenCV", "Python", "Computer Vision", "HSV", "Image Processing"]
---

컴퓨터 비전을 다루다 보면 단순히 얼굴이나 물체를 찾는 것에서 벗어나, 픽셀 단위로 사진을 내 입맛에 맞게 편집하고 조작하는 **전처리(Preprocessing)** 단계가 필수적으로 요구됩니다.
최근 파이썬 `cv2`를 사용해 이미지 내의 특정한 색상이나 밝은 영역(예: 햇빛) 영역만 원본 컬러로 남겨두고, 나머지는 그레이스케일(흑백)로 죽여버려 시선을 집중시키는 이미지 합성 코드를 작성해 보았습니다.

## 🎨 색공간 변환: BGR에서 HSV로
OpenCV는 이미지를 기본적으로 BGR(Blue, Green, Red) 순서로 읽어들입니다. 하지만 BGR 체계로 특정 색상이나 '밝기'를 콕 집어내기란 너무 어렵습니다. 이 때 필수적인 것이 **HSV(Hue, Saturation, Value) 색공간 변환**입니다.

- **Hue (색상)**: 어떤 색인지를 결정 (`H: 0~179`)
- **Saturation (채도)**: 색이 얼마나 진한지 결정 
- **Value (명도/밝기)**: 영역이 얼마나 밝은지 결정 (`V: 0~255`)

```python
# 이미지 읽고 HSV 포맷으로 컨버팅
img_bgr = cv2.imread('123.jpg')
img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
```

이번 미션처럼 햇빛이 내리쬐는 "밝은 부분"을 찾아내기 위해선, 색상(H)이나 채도(S)보단 **명도(V)** 값이 높은(200~255) 픽셀 영역 구간만을 조건으로 주면 됩니다.

## ✂️ 바이너리 마스크(Mask) 생성
`cv2.inRange()` 함수를 사용해 지정된 햇빛 밝기 조건에 부합하는 구간은 255(흰색), 조건에 맞지 않는 나머지 배경은 0(검정색)인 이진 마스크 이미지를 만들 수 있습니다. 이것이 일종의 도장 모양이 됩니다.

```python
lower_sun = np.array([0, 0, 200])   # 최소 범위
upper_sun = np.array([179, 70, 255]) # 최대 범위
sun_mask = cv2.inRange(img_hsv, lower_sun, upper_sun)
```

## 🪄 핵심: Numpy 배열을 활용한 초고속 논리 연산 합성
OpenCV의 핵심 백엔드는 결국 파이썬 Numpy 배열 기반의 행렬 텐서 계산입니다.
이제 이 흰색 마스크 영역에는 `원본의 컬러 BGR 픽셀`을 넣고, 검정색 영역에는 `그레이스케일로 변환된 흑백 픽셀`을 넣어주면 합성이 완료됩니다.

`np.where(조건배열, 참일때값, 거짓일때값)` 함수는 파이썬에서 이런 픽셀 매핑을 위해 가장 성능이 좋은 방법입니다. 

```python
# 1채널인 마스크를 3채널의 깊이로 확장 (합성 조건을 맞추기 위함)
sun_mask_3d = cv2.cvtColor(sun_mask, cv2.COLOR_GRAY2BGR)

# 전체 흑백 이미지를 만듦
img_gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
img_gray_bgr = cv2.cvtColor(img_gray, cv2.COLOR_GRAY2BGR)

# 마스크가 흰색(255)인 부분은 컬러본(img_bgr)을, 검은색인 부분은 흑백본(img_gray_bgr) 사용!
result = np.where(sun_mask_3d == 255, img_bgr, img_gray_bgr)
```

## 💡 결론 및 응용
이처럼 영상 처리의 기본은 `ROI(관심 영역)`를 마스킹해 타겟을 분리하고, 그 데이터를 변환/합성하는 것입니다. 
마스크를 어떤 색 범위(`cv2.inRange`)로 잡느냐에 따라 쨍한 파란색 번호판만 추출해 내고, 빨간색 토마토만 골라낼 수 있습니다. 이 과정이 쌓여 컴퓨터 비전 AI의 가장 기초적인 자양분이 됩니다.

---

## 📸 실행 결과 (Execution Results)

HSV 색공간을 활용한 햇빛 영역 마스킹 합성 결과입니다.

![OpenCV Original Image](/media/123.jpg)
*OpenCV BGR 원본 테스트 이미지*

![OpenCV Processing Result](/media/123_result.jpg)
*밝은 영역(햇빛)만 컬러로 남기고 배경을 흑백 처리한 결과*
