/*
  src/App.jsx 파일 (v4.0 - 최종본)
  - "프로젝트랑 어울리지 않는다"는 피드백 반영.
  - 모든 실제 이미지 (Pexels, Unsplash) 싹 다 삭제.
  - 대신 'placehold.co'를 이용한 '회색 네모 상자' (플레이스홀더)로 교체.
  - (이제 이미지 로드 실패 100% 없고, 레이아웃만 완벽하게 볼 수 있음)
*/
// 처음 깃데스크탑을 사용해봅니다. 테스트합니다.
import React, { useState } from 'react';

// --- 아이콘 컴포넌트들 (Heroicons.com에서 가져옴) ---
// (아이콘 코드는 v3.1과 동일... 생략)
const LeafIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const PriceCheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
const TranslateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.828.92 2.023 1.767 3.48 2.311A52.36 52.36 0 0 1 12 20.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);
const DiagnoseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const PlannerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M3 14.25h18M3 9.75h18" />
  </svg>
);
const UxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.799-2.121a52.274 52.274 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039(17,17.8)H10.186c-.63 0-1.213.208-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);
const CpuChipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M8.25 21v-1.5M21 15.75h-1.5M15.75 21v-1.5M3 15.75h1.5M21 8.25H3m18 0-3.75 3.75M3 8.25l3.75 3.75m0 0A4.5 4.5 0 0 1 12 15v0a4.5 4.5 0 0 1-4.5-4.5v0Zm4.5 0a4.5 4.5 0 0 0-4.5-4.5v0a4.5 4.5 0 0 0 4.5 4.5v0Z" />
  </svg>
);
const SolutionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.6 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.6-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.6-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.6 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);


// --- 1. 상단 네비게이션바 ---
function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-20 top-0 left-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-800">NovaBox Plant AI</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#features" className="text-gray-700 hover:text-green-600">주요 기능</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-green-600">작동 방식</a>
          <a href="#pricing" className="text-gray-700 hover:text-green-600">가격</a>
          <a href="#tech" className="text-gray-700 hover:text-green-600">핵심 역량</a>
          <a href="#contact" className="text-gray-700 hover:text-green-600">문의하기</a>
        </div>
        <a 
          href="#pricing"
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
        >
          지금 시작하기
        </a>
      </div>
    </nav>
  );
}

// --- 2. 메인 화면 (Hero) (v4.0 - 플레이스홀더로 교체) ---
function Hero() {
  return (
    <section className="bg-green-50 pt-32 pb-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 leading-tight">
          당신의 식물,
          <br />
          <span className="text-green-600">무슨 말이 하고 싶을까요?</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          AI 식물 번역 서비스, NovaBox가 식물의 목소리를 들려드립니다.
          <br />
          더 이상 식물을 '죽이지' 마세요. 행복하게 '키우세요'.
        </p>
        <a 
          href="#features"
          className="bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
        >
          주요 기능 살펴보기
        </a>
        
        {/* '식물 가득' 이미지 -> '회색 네모 상자' (플레이스홀더)로 교체 */}
        <div className="mt-16 w-full max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden aspect-video">
          <img 
            src="https://png.pngtree.com/background/20230526/original/pngtree-plant-is-in-a-pink-pot-on-a-green-wall-picture-image_2746369.jpg" 
            alt="NovaBox 앱 스케치 예시" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// --- 3. 주요 기능 (Features) ---
function Features() {
  const featuresList = [
    {
      icon: <TranslateIcon />,
      title: "AI '식물어' 번역",
      description: "물이 부족한지, 빛이 과한지. AI가 식물의 상태를 분석해 '식물이 원하는 것'을 번역해줍니다. (이게 핵심 차별점!)",
    },
    {
      icon: <DiagnoseIcon />,
      title: "병충해 즉시 진단",
      description: "시든 잎 사진 한 장이면 끝. AI가 병충해를 즉시 진단하고 맞춤형 솔루션을 제공합니다.",
    },
    {
      icon: <PlannerIcon />,
      title: "스마트 케어 플래너",
      description: "우리 집 환경(채광, 습도)과 식물 종류에 맞춰 물주기, 가지치기 일정을 자동으로 관리해줍니다.",
    },
    {
      icon: <UxIcon />,
      title: "직관적인 UX/UI",
      description: "팀원들의 스케치를 바탕으로, 누구나 쉽고 매력적으로 사용할 수 있는 디자인을 구현했습니다.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          NovaBox만의 <span className="text-green-600">독보적인 기능</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center mb-3">
                <div className="bg-green-500 text-white rounded-full p-2 mr-3">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 4. 작동 방식 (How It Works) ---
function HowItWorks() {
  const steps = [
    {
      icon: <CameraIcon />,
      title: "Step 1. 찰칵! (사진 촬영)",
      description: "아픈 식물의 잎이나, 궁금한 식물을 앱으로 촬영하세요."
    },
    {
      icon: <CpuChipIcon />,
      title: "Step 2. AI 분석 (0.5초)",
      description: "NovaBox의 AI가 1천만 장의 데이터를 바탕으로 즉시 분석합니다."
    },
    {
      icon: <SolutionIcon />,
      title: "Step 3. 번역! (솔루션 확인)",
      description: "식물이 '원하는 것'과 필요한 '해결책'을 명확하게 알려줍니다."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          어떻게 작동하나요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center p-6">
              <div className="flex-shrink-0 bg-green-600 text-white rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- 5. 가격 (Pricing) ---
function Pricing() {
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      features: [
        "식물 1개 등록",
        "기본 물주기 알림",
        "커뮤니티 이용",
      ],
    },
    {
      name: "Home Gardener",
      price: "월 4,900",
      popular: true,
      features: [
        "식물 10개 등록",
        "AI '식물어' 번역",
        "병충해 진단 (월 5회)",
        "스마트 케어 플래너",
      ],
    },
    {
      name: "Pro Farmer",
      price: "월 12,900",
      features: [
        "식물 무제한 등록",
        "AI '식물어' 번역",
        "병충해 진단 (무제한)",
        "전문가 1:1 채팅 상담",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          합리적인 가격 플랜
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`w-full max-w-sm bg-white rounded-lg shadow-lg p-8 ${plan.popular ? 'border-4 border-green-500' : 'border'}`}
            >
              {plan.popular && (
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase -translate-y-12">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
              <div className="text-4xl font-extrabold text-gray-900 mb-6">
                ₩{plan.price}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <PriceCheckIcon />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 rounded-full font-semibold transition duration-300 ${
                  plan.popular 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {plan.name} 시작하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 6. 기술 소개 (Tech) (v4.0 - 플레이스홀더로 교체) ---
function TechBenefits() {
  const benefits = [
    {
      imgUrl: "https://img.etnews.com/photonews/2106/1424075_20210616162129_331_0001.jpg",
      title: "98.7% 정확도의 AI 진단",
      description: "1천만 장 이상의 식물 데이터를 학습한 AI가 잎사귀의 미세한 반점, 색상 변화를 포착하여 병충해를 정확하게 진단합니다."
    },
    {
      imgUrl: "https://png.pngtree.com/thumb_back/fw800/background/20231022/pngtree-ideal-soil-texture-fertile-loam-perfect-for-planting-image_13675851.png",
      title: "실시간 환경 센서 연동 (별매)",
      description: "IoT 센서가 토양의 습도와 일조량을 실시간으로 측정합니다. 데이터가 설정 값을 벗어나면 앱으로 즉시 알림을 보냅니다."
    },
    {
      imgUrl: "https://www.cubenews.net/wp-content/uploads/2025/02/iPhone-17-Pro-Max-Smaller-Notch-Feature.jpg",
      title: "언제 어디서나, 간편한 앱",
      description: "직관적인 UI/UX로 설계되어, 누구나 쉽게 식물 상태를 확인하고 케어 일정을 관리할 수 있습니다. (React + Vite 기반)"
    }
  ];

  return (
    <section id="tech" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          NovaBox의 <span className="text-green-600">핵심 역량</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              {/* 이미지 -> '회색 네모 상자' (플레이스홀더)로 교체 */}
              <img 
                src={benefit.imgUrl} 
                alt={benefit.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 7. 마지막 CTA (v4.0 - 배경 이미지 삭제) ---
function CallToAction() {
  return (
    // 배경 이미지를 빼고 깔끔한 단색 배경으로 변경
    <section id="contact" className="py-20 bg-green-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          NovaBox, 지금 바로 경험해보세요
        </h2>
        <p className="text-lg text-green-100 mb-8 max-w-xl mx-auto">
          설문조사에서 증명된 기능들! 지금 'Home Gardener' 플랜을 시작하고
          첫 달 50% 할인을 받으세요.
        </p>
        <a 
          href="#pricing"
          className="bg-white text-green-800 text-lg font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          가격 플랜 보러가기
        </a>
      </div>
    </section>
  );
}


// --- 8. 하단 푸터 (이메일 주소 추가됨) ---
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold mb-2">NovaBox (공학설계입문 1조)</p>
        <p className="text-sm">
          팀원: 김은수, 정주연, 이미르, 이건우
        </p>
        {/* 이메일 주소 */}
        <p className="text-sm mt-2">
          Contact: <a href="mailto:lgu9582@gmail.com" className="text-green-300 hover:underline">lgu9582@gmail.com</a>
        </p>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} NovaBox. All rights reserved.</p>
      </div>
    </footer>
  );
}


// --- 9. App.jsx (본체) ---
// 모든 컴포넌트를 조립하는 곳
export default function App() {
  return (
    <div className="font-sans antialiased text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <TechBenefits />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

