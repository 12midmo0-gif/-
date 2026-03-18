import { PortfolioData } from "./types";

export const INITIAL_DATA: PortfolioData = {
  name: "최준혁",
  contact: "010-0000-0000 / 12midmo0@gmail.com",
  aboutMe: {
    title: "조직 운영 경험을 기반으로 구성원과 조직의 성장을 지원하는 HR 인재",
    points: [
      "인력 운영 및 데이터 관리 경험",
      "다수 이해관계자 협업 및 조정 경험",
      "기준 설계를 통한 공정성 개선 경험"
    ],
    summary: "“사람 + 운영 + 기준”을 이해하는 인사 인재"
  },
  competencies: [
    {
      id: "comp1",
      title: "인력운영 및 수요 분석",
      items: [
        "승무원 스케줄 편성 및 운영",
        "운항 인력 소요 분석",
        "자격요건 기반 인력 관리"
      ],
      hrConnection: "인력 계획 / 배치 / 운영"
    },
    {
      id: "comp2",
      title: "교육 및 프로그램 운영 지원 역량",
      items: [
        "평가 및 워크숍 준비",
        "비교과 프로그램 홍보 및 기획 참여",
        "만족도 개선 활동 수행"
      ],
      hrConnection: "교육 운영 / 프로그램 기획"
    },
    {
      id: "comp3",
      title: "조직 내 협업 및 커뮤니케이션",
      items: [
        "유관부서 협업 (사업관리, 인력운영)",
        "평가 및 회의 운영 지원",
        "의견 수렴 및 개선안 도출"
      ],
      hrConnection: "조직문화 / 커뮤니케이션"
    }
  ],
  experiences: [
    {
      id: "exp1",
      title: "인력 소요 분석 기반 운영 지원 경험",
      organization: "티웨이항공 (항공사)",
      period: "2024.01 ~ 재직중",
      roles: [
        "승무원 스케줄 편성 및 운영",
        "운항 인력 소요 분석",
        "자격요건 기반 인력 배치 관리"
      ],
      achievements: [
        "운영 일정 차질 최소화",
        "인력 운영 효율성 향상",
        "기준 기반 운영 체계 유지"
      ],
      hrConnection: "인력 수요 예측 및 운영 관리 역량 확보"
    },
    {
      id: "exp2",
      title: "데이터 기반 사업 운영 및 관리 경험",
      organization: "한국산업기술진흥원",
      period: "2023.06~2023.12",
      roles: [
        "153개 사업 성과지표 관리",
        "사업비 검토 및 지출결의",
        "평가 및 회의 운영 지원"
      ],
      achievements: [
        "데이터 기반 관리 체계 유지",
        "다수 이해관계자 협업 경험",
        "업무 정확성 및 안정성 확보"
      ],
      hrConnection: "HR 데이터 관리 및 운영 프로세스 이해"
    },
    {
      id: "exp3",
      title: "데이터 기반 사업 운영 및 관리 경험",
      organization: "국토교통과학기술진흥원",
      period: "2022.11~2023.04",
      roles: [
        "사업 성과지표 관리",
        "사업비 검토 및 지출결의",
        "평가 및 회의 운영 지원"
      ],
      achievements: [
        "데이터 기반 관리 체계 유지",
        "업무 정확성 및 안정성 확보"
      ],
      hrConnection: "HR 데이터 관리 및 운영 프로세스 이해"
    },
    {
      id: "exp4",
      title: "비대면 수업 만족도 개선 활동\n(원격관리위원회)",
      organization: "대학교 원격관리위원회",
      period: "2021.03 ~ 2021.12",
      roles: [
        "비대면 수업 만족도 개선 활동",
        "의견 수렴 및 개선 방향 제시"
      ],
      achievements: [
        "수업 운영 개선 기여",
        "참여도 및 만족도 제고"
      ],
      hrConnection: "구성원 경험 개선 / 조직문화"
    },
    {
      id: "exp5",
      title: "평가 공정성 확보를 위한 기준 설계 (학습지기 서포터즈)",
      organization: "학습지기 서포터즈",
      period: "2020.09 ~ 2021.02",
      roles: [
        "체크리스트 기반 평가 기준 설계",
        "팀원 협의 및 기준 보완"
      ],
      achievements: [
        "평가 일관성 및 공정성 확보",
        "주관성 배제 및 신뢰도 향상"
      ],
      hrConnection: "평가제도 / 교육 프로그램 운영"
    }
  ],
  jobFit: {
    title: "CJ올리브네트웍스 HR 직무와의 연결",
    points: [
      "인력운영 → 인력 계획 및 운영 관리",
      "교육/프로그램 → 교육 기획 및 운영",
      "조직문화 → 구성원 경험 개선"
    ],
    itContext: "특히 IT 기반 조직에서 필요한 유연한 인력 운영 + 협업 중심 HR 수행 가능"
  },
  growthPlan: {
    shortTerm: "조직 및 HR 프로세스 이해, 인력 운영 및 데이터 관리 역량 강화",
    midTerm: "채용 및 교육 프로그램 기획 참여\n조직 맞춤형 인력 운영지원",
    longTerm: "조직과 구성원의 성장을 함께 설계하는 HR 전문가"
  },
  closing: "구성원의 성장이 곧 조직의 경쟁력 이라는 믿음으로, \n조직과 함께 성장하는 HR 담당자가 되겠습니다."
};
