import { Aperture } from "lucide-react";
import Image from "next/image";

const galleryItems = [
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
                    결과물 (Gallery)
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
