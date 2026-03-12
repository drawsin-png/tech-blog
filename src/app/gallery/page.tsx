import { Aperture } from "lucide-react";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const galleryItems = [
    {
        id: 4,
        title: "졸음운전 AI 감지 인식 결과 (1)",
        description: "락칩 NPU를 활용한 안면 랜드마크 분석 기반 고속 추론 결과물입니다. 눈과 입의 개폐 상태를 실시간으로 판독하여 졸음을 감지합니다.",
        date: "2026-03-11",
        image: "/media/drowsiness-rknn-result-1.png",
        relatedPostUrl: "/posts/on-device-ai-drowsiness-detection-orange-pi-rknn"
    },
    {
        id: 5,
        title: "졸음운전 AI 감지 인식 결과 (2)",
        description: "연속된 프레임 간의 움직임을 추적하여 하품이나 눈 감음 시간을 누적 계산하는 실시간 모니터링 파이프라인 테스트 화면입니다.",
        date: "2026-03-11",
        image: "/media/drowsiness-rknn-result-2.png",
        relatedPostUrl: "/posts/on-device-ai-drowsiness-detection-orange-pi-rknn"
    },
    {
        id: 1,
        title: "마스크 착용 감지 훈련 결과",
        description: "Tensorflow Keras 커스텀 CNN 모델의 Accuracy & Loss 학습 그래프",
        date: "2026-02-26",
        image: "/media/mask_plot.png",
        relatedPostUrl: "/posts/mask-detection-training"
    },
    {
        id: 2,
        title: "HSV를 활용한 햇빛 마스킹 합성 결과",
        description: "햇빛 영역만 컬러로 남기고 주변을 그레이스케일로 변환한 전처리 결과물",
        date: "2026-02-13",
        image: "/media/123_result.jpg",
        relatedPostUrl: "/posts/opencv-image-processing"
    },
    {
        id: 3,
        title: "OpenCV BGR 원본 사진",
        description: "마스킹 합성에 사용된 원본 컬러 테스트 이미지",
        date: "2026-02-13",
        image: "/media/123.jpg",
        relatedPostUrl: "/posts/opencv-image-processing"
    }
];

export default function GalleryPage() {
    return (
        <div className="container mx-auto max-w-5xl px-6 py-20 pb-32">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
                    <Aperture className="text-blue-500 w-8 h-8" />
                    갤러리 (최신 업데이트 반영)
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    각 프로젝트와 포스트에서 파생된 이미지, 그래프, 시각적 결과물 모음입니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {galleryItems.map((item) => (
                    <div key={item.id} className="group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                        <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <time className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{item.date}</time>
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                                {item.title}
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                                {item.description}
                            </p>
                            <a href={item.relatedPostUrl} className="inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                연관 포스트 읽기 &rarr;
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
