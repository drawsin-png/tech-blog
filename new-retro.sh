#!/bin/bash
DATE=$(date +%Y-%m-%d)
FILENAME="src/content/retrospectives/$DATE.md"
mkdir -p src/content/retrospectives

if [ -f "$FILENAME" ]; then
    echo "이미 $DATE 회고록이 존재합니다."
    exit 1
fi

cat <<EOF > "$FILENAME"
---
title: "$DATE 일일 회고"
date: "$DATE"
tags: ["회고"]
---

## 🎯 오늘 목표했던 것
- 

## 🚀 새롭게 배운 것
- 

## 🤔 아쉬웠던 점 / 트러블슈팅
- 

## ✨ 내일 할 일
- 
EOF

echo "✅ $FILENAME 생성 완료"
