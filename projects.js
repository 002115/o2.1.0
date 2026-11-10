/* Project detail content. Text is transcribed from the portfolio PDF; images are cropped sources in assets/src.
   Inline **bold** is supported in any text string.
   Section types: text, notes, figure-text, figure, cards, swot, gallery, mosaic, vertical, list, skills */
window.PROJECTS = [
  /* ---------------------------------------------------------------- 01 Profile */
  {
    kicker: 'Profile',
    title: 'Profile',
    name: '박서연',
    sub: 'PARK SEO YEON',
    tagline: 'Think · Plan · Make',
    accent: '#b9b9b9',
    hero: { layout: 'portrait', image: 'assets/src/profile-photo.jpg', alt: '박서연 증명사진' },
    facts: [
      { k: 'Instagram', v: '@o2.1.0', href: 'https://www.instagram.com/o2.1.0/' },
      { k: 'E-mail', v: '002115@naver.com', href: 'mailto:002115@naver.com' }
    ],
    sections: [
      { type: 'list', label: '학력사항 · Education', rows: [
        { k: '2027.02.', v: '서일대학교 미디어출판학과 졸업' },
        { k: '2024.02.', v: '덕성여자고등학교 졸업' }
      ] },
      { type: 'list', label: '자격증 취득 상황 · License / Credential', rows: [
        { k: '2024.08.16', v: 'GTQ 그래픽 기술 자격 1급' },
        { k: '2014.10.02', v: 'ITQ 파워포인트' },
        { k: '2015.03.19', v: 'ITQ 아래한글' },
        { k: '2016.03.17', v: 'ITQ 엑셀' }
      ] },
      { type: 'list', label: '활동 · Activity', rows: [
        { k: '', v: '서일대학교 봉사 동아리 ‘라움’' },
        { k: '', v: '서일대학교 잡지 동아리 ‘지울림’' },
        { k: '', v: '중랑숲어린이도서관 자원봉사 활동' },
        { k: '', v: '밀리의 서재 웹컨키트 제작 프로젝트' },
        { k: '', v: '파주 출판단지, 프린피아 견학' },
        { k: '', v: '비상교육 견학' },
        { k: '', v: '캡스톤디자인출판제작실습 – 밀리의 서재 웹컨키트 제작 프로젝트' },
        { k: '2026', v: '출판아카데미 <K-출판수출 및 IP비즈니스의 이해> 수료' },
        { k: '2026학년도', v: 'AI 입사지원서 입문 프로그램' },
        { k: '2026학년도', v: '청년미래직진 프로그램' }
      ] },
      { type: 'list', label: '수상내역 · Award Career', rows: [
        { k: '2025.10.31', v: '대학생 출판문화콘텐츠 공모전 우수상' },
        { k: '2026.10.31', v: '대학생 출판문화콘텐츠 공모전 장려상' }
      ] },
      { type: 'skills', label: '보유 역량 · Skill', items: [
        { name: 'Adobe Illustrator', level: 2 },
        { name: 'Adobe Photoshop', level: 2 },
        { name: 'Adobe InDesign', level: 1 }
      ] }
    ]
  },

  /* ---------------------------------------------------------------- 02 Milli */
  {
    kicker: 'Marketing Project',
    title: '밀리의 서재\n웹컨키트 제작',
    tagline: '독서를 삶의 밀리(mm)로 재다',
    lead: '밀리의 서재 – 독서 플랫폼. 전자책을 비롯해 오디오북, 챗북 등 다양한 독서 콘텐츠를 제공하는 국내 대표 구독형 독서 플랫폼. 독서를 일상 속에서 쉽게 경험할 수 있도록 다양한 서비스를 제공하고 있다.',
    accent: '#f4d634',
    accent2: '#9a78b4',
    hero: { layout: 'wide', image: 'assets/detail/p07-L.jpg', alt: '밀리의 서재 웹컨키트 제작 표지' },
    facts: [
      { k: 'Scope', v: '25%' },
      { k: 'Date', v: '2026.03 – 2026.10' },
      { k: 'Course', v: '캡스톤디자인출판제작실습' }
    ],
    sections: [
      { type: 'text', label: 'overview',
        lead: '독서를 삶의 밀리(mm)로 재다, **밀리의 서재 웹컨키트 제작**',
        body: ['캡스톤디자인출판제작실습 강의에서 밀리의 서재와 협업하여 신규 구독자의 첫 브랜드 경험을 위한 웹컨키트를 기획·제작했다. 밀리의 서재를 직접 이용하며 사용자 관점에서 브랜드를 경험하고, 이를 바탕으로 캐릭터 ‘밀리맨’을 제작했다.'] },
      { type: 'notes', label: 'background', notes: [
        { tone: 'yellow', text: '밀리의 서재를 직접 구독하고 이용하면서 **독서가 특정한 시간에만 이루어지는 활동이 아니라 일상 속 다양한 순간에 자연스럽게 스며들 수 있다는 점**에 주목했다.' },
        { tone: 'purple', text: '시각적으로 표현하기 위해 **책에 깊이 빠진 캐릭터 ‘밀리맨’**을 기획했다. 책에 몰입한 모습을 재미있고 친근하게 표현함으로써 확장하고자 했다.' }
      ] },
      { type: 'figure-text', label: 'character design',
        image: 'assets/src/milli-character.jpg', alt: '캐릭터 밀리맨', blend: true, size: 'sm',
        caption: '책에 빠져 면도하는 걸 까먹은 캐릭터, 밀리맨',
        body: ['책에 너무 몰입한 나머지 일상의 작은 일까지 잊어버린 모습을 통해 ‘독서에 깊이 빠지는 경험’을 유쾌하게 표현',
               '캐릭터의 특징을 단순한 시각적 요소로 활용하는 데 그치지 않고, 굿즈 전반에 적용해 신규 구독자가 웹컨키트를 사용하는 과정에서도 캐릭터와 브랜드의 이야기를 경험할 수 있도록 했다.'] },
      { type: 'figure-text', label: 'slogan',
        image: 'assets/src/milli-slogan.jpg', alt: '슬로건 독서를 삶의 밀리로 재다', blend: true, size: 'md',
        caption: '독서를 삶의 밀리로 재다',
        body: ['‘밀리’를 단순히 브랜드명으로 사용하는 것이 아니라, 독서가 삶 속에서 차지하는 의미와 가치를 측정하는 단위로 확장했다.',
               '이를 통해 밀리의 서재를 단순히 책을 읽는 서비스가 아닌, 독서가 일상에 스며드는 방식을 만들어주는 브랜드로 표현하고자 했다.'] },
      { type: 'cards', label: 'target',
        items: ['독서를 취미로 즐기거나 독서 습관을 만들고 싶은 20~30대',
                '모바일 콘텐츠와 구독 서비스를 익숙하게 사용하는 사용자',
                '실용성과 재미를 갖춘 브랜드 굿즈에 관심이 있는 사용자',
                '브랜드의 개성과 스토리를 소비 경험에서 중요하게 생각하는 사용자'],
        conclusion: { text: '밀리의 서재 신규 구독자' } },
      { type: 'cards', label: 'expected outcomes',
        items: ['신규 구독자의 첫 브랜드 경험 강화',
                '온라인 독서 경험의 오프라인 확장',
                '캐릭터를 통한 브랜드 인지도 강화',
                '브랜드 메시지의 콘텐츠화'] },
      { type: 'figure', label: 'welcome kit',
        image: 'assets/src/milli-goods.jpg', alt: 'HELLO! Welcome Kit 굿즈 구성', blend: false,
        caption: 'HELLO! Welcome Kit — 머그, 롱슬리브 티셔츠, 스티커, 노트, 키링 등 캐릭터 굿즈 구성' }
    ]
  },

  /* ---------------------------------------------------------------- 03 Travel */
  {
    kicker: 'Marketing Project',
    title: '나의여행기록\n카드뉴스 제작',
    tagline: '나의 여행 기록 – 여행 기록 어플',
    lead: 'AI를 활용해 여행 계획부터 여행 후 기록까지 한곳에서 관리할 수 있는 여행 기록 어플. 사용자의 취향에 맞는 여행 코스를 추천하고, 방문한 장소와 사진을 모아 여행의 순간을 체계적으로 정리할 수 있도록 돕는다.',
    accent: '#1f8a99',
    accent2: '#cddcff',
    hero: { layout: 'wide', image: 'assets/detail/p13-L.jpg', alt: '나의여행기록 카드뉴스 제작 표지' },
    facts: [
      { k: 'Scope', v: '100%' },
      { k: 'Date', v: '2026.09 – 2026.10' },
      { k: 'Course', v: '캡스톤디자인출판제작실습' }
    ],
    sections: [
      { type: 'text', label: 'overview',
        body: ['캡스톤디자인출판제작실습 강의에서 ‘나의 여행 기록’ 어플의 핵심 기능을 알리기 위한 SNS 카드뉴스 제작. 실제 서비스 이용 경험을 바탕으로 강점과 개선점을 분석하고, 여행 후 사진 정리와 기록에 어려움을 느끼는 잠재 사용자를 대상으로 앱 설치 및 이용 전환을 유도하고자 했다.'] },
      { type: 'notes', label: 'background', notes: [
        { tone: 'blue', text: '여행 후 갤러리에 쌓인 사진을 정리하지 못하는 사용자의 고민에 주목' },
        { tone: 'yellow', text: '사진을 모아 장소와 함께 여행 기록으로 남기는 기능을 핵심 소구점으로 설정하고, 공감형 카피와 단계별 기능 소개를 통해 서비스의 필요성과 활용 방법을 직관적으로 전달' },
        { tone: 'gray', text: 'AI 일정 생성 기능도 함께 소개해 다음 여행까지 이어지는 서비스 활용을 제안' }
      ] },
      { type: 'swot', label: 'service analysis',
        S: ['빠른 AI 일정 생성 및 유연한 수정', '여행 사진 연동', '감성적 콘셉트', '명확한 사용 목적'],
        W: ['낮은 디자인 완성도', '낮은 앱 인지도', '제한된 예산'],
        O: ['AI 여행 플래닝 시장 성장', '20~30대의 SNS 기록 문화'],
        T: ['경쟁 앱의 유사 기능 확대', '경쟁사의 높은 UI·UX 완성도', 'SNS 알고리즘에 따른 도달 변동'],
        note: '제한된 예산을 고려해 **광고비 부담이 적고 저장·공유를 유도**할 수 있는 카드뉴스를 활용한다. 서비스의 다양한 기능을 나열하기보다 **차별화된 여행 사진 정리 및 기록 기능을 우선적으로 강조**한다.' },
      { type: 'cards', label: 'target',
        items: ['여행 준비에 시간을 쏟기 어려운 직장인, 대학생',
                '여행을 다녀온 뒤 기록을 남기고 싶지만 방법이 번거롭다고 느끼는 사람',
                '여행 기록을 SNS, 블로그 등에 공유하는 것을 즐기는 콘텐츠 지향적 사용자',
                '별도의 시간과 노력을 들이지 않고 여행을 간편하게 정리하고 싶은 사람'],
        conclusion: { title: '핵심 니즈', text: '흩어진 여행 사진을 간편하게 정리하고, 별도의 번거로운 작업 없이 나만의 여행 기록으로 남기고 싶은 욕구.' } },
      { type: 'gallery', label: 'outcome · card news', ratio: '4 / 5',
        items: [
          { image: 'assets/src/travel-card-1.jpg', title: '여행 후 정리 안 된 사진만 1000장이라면?' },
          { image: 'assets/src/travel-card-2.jpg', title: '이 사진들, 언제 다 정리하지?' },
          { image: 'assets/src/travel-card-3.jpg', title: '여행의 순간, 그냥 흘려보내지 마세요' },
          { image: 'assets/src/travel-card-4.jpg', title: '흩어진 여행 사진, 간편하게 모아보기' },
          { image: 'assets/src/travel-card-5.jpg', title: '사진 속 여행을 나의 기록으로 만드는 여행기 기능' },
          { image: 'assets/src/travel-card-6.jpg', title: 'AI가 계획하고, 내가 완성하는 여행.' },
          { image: 'assets/src/travel-card-7.jpg', title: '계획부터 기록까지, 나만의 여행을 남기다.' }
        ] },
      { type: 'figure', label: 'in the feed',
        image: 'assets/src/travel-phone.jpg', alt: 'SNS 피드에 올라간 카드뉴스', blend: true, size: 'phone',
        caption: 'SNS 피드 적용 예시' }
    ]
  },

  /* ---------------------------------------------------------------- 04 Dive */
  {
    kicker: 'Bookcover Design',
    title: '머리부터\n천천히',
    tagline: '두려움에서 자유로의 도약',
    accent: '#1e5e8a',
    hero: { layout: 'wide', image: 'assets/detail/p18-L.jpg', alt: '머리부터 천천히 북커버 목업' },
    facts: [
      { k: 'Scope', v: '50%' },
      { k: 'Date', v: '2025.10' },
      { k: 'Tool', v: 'Adobe Illustrator' },
      { k: 'Color', colors: ['#1e5e8a', '#74c1dc', '#b7b6b6'] }
    ],
    sections: [
      { type: 'text', label: 'overview',
        body: ['제 12회 대학생 출판콘텐츠 공모전 출품작으로, 물에 대한 두려움을 극복해가는 17세 다이빙 선수의 성장 이야기를 시각적으로 표현한 작품입니다. 성장 소설의 본질인 ‘두려움에서 자유로의 도약’을 상징하는 행위로 다이빙을 선택해 이를 형상화했습니다.'] },
      { type: 'vertical', label: 'typography', words: ['머리부터', '천천히'],
        body: ['길게 늘어진 ‘천천히’와 끊어진 ‘히’의 형태를 통해 낙하의 속도감과 물에 닿는 순간의 긴장을 시각화하고, 두려움을 마주하며 내려가는 심리의 흐름을 함축적으로 표현했습니다.'] },
      { type: 'figure-text', label: 'illust',
        image: 'assets/src/dive-illust.jpg', alt: '다이빙하는 주인공 일러스트', blend: true, size: 'tall',
        body: ['작품의 주인공을 형상화한 것으로, 머리부터 곧게 떨어지는 자세를 통해 두려움에 정면으로 맞서는 결단의 순간을 표현했습니다.'] }
    ]
  },

  /* ---------------------------------------------------------------- 05 Tree */
  {
    kicker: 'Bookcover Design',
    title: '젊은\n느티나무',
    tagline: '강신재 『젊은 느티나무』 리디자인',
    accent: '#b85d88',
    accent2: '#b7b88c',
    hero: { layout: 'wide', image: 'assets/detail/p19-L.jpg', alt: '젊은 느티나무 북커버 목업' },
    facts: [
      { k: 'Scope', v: '100%' },
      { k: 'Date', v: '2025.12' },
      { k: 'Tool', v: 'Adobe Illustrator' },
      { k: 'Color', colors: ['#b7b88c', '#b85d88'] }
    ],
    sections: [
      { type: 'text', label: 'overview',
        body: ['강신재 작가의 『젊은 느티나무』를 모티브로 북커버를 리디자인한 작업입니다. 작품 속 젊은 날의 섬세하고 몽글한 사랑의 정서를 색감과 그래픽 요소를 통해 시각적으로 풀어냈습니다.'] },
      { type: 'mosaic', label: 'graphic elements',
        images: [
          { image: 'assets/src/tree-main.jpg', alt: '느티나무 그래픽' },
          { image: 'assets/src/tree-tile-1.jpg', alt: '비누 냄새가 타이포 그래픽' },
          { image: 'assets/src/tree-tile-2.jpg', alt: '유기적인 흰색 획 패턴' }
        ],
        body: ['느티나무 이미지에 필름 그레인 효과를 적용해 아날로그적 질감을 강조하고, 색감을 보정해 몽환적인 분위기를 형성했습니다.',
               '글자에는 외부광선 효과를 더해 번지는 듯한 인상을 주었고, 제목 아래에는 펜툴로 자유롭게 그린 유기적인 흰색 획을 배치했습니다.'] }
    ]
  },

  /* ---------------------------------------------------------------- 06 Love */
  {
    kicker: 'Book Design',
    title: '사랑 선언',
    tagline: 'The Films We Called Love',
    accent: '#c44593',
    accent2: '#ffedf3',
    hero: { layout: 'wide', image: 'assets/detail/p21-L.jpg', alt: '사랑 선언 북 디자인 목업' },
    facts: [
      { k: 'Scope', v: '50% (2인 1팀)' },
      { k: 'Date', v: '2026.07 – 2026.10' },
      { k: 'Tool', v: 'Adobe Photoshop' },
      { k: 'Color', colors: ['#c44593', '#ffedf3'] }
    ],
    sections: [
      { type: 'text', label: 'overview',
        body: ['《사랑 선언》은 사랑을 다양한 시선으로 바라본 영화 10편을 선정해 작품 속 장면과 대사, 상징을 분석하고 이를 산문으로 풀어낸 영화 산문집이다. 네 가지 주제로 챕터를 구성하고, 영화별 분위기를 반영한 이미지 디자인과 다양한 종이, 타이포그래피, 제본 방식을 활용해 글과 시각적 요소가 어우러지는 출판물을 제작했다.'] },
      { type: 'figure-text', label: 'graphic elements',
        image: 'assets/src/love-type.jpg', alt: '‘Declared Love’ 하트 타이포그래피', blend: false, size: 'md',
        body: ['사랑을 상징하는 하트 형태 안에 영문 제목 ‘Declared Love’를 배치하고, 중앙에 한글 제목 ‘사랑 선언’을 더해 두 언어가 조화를 이루는 타이포그래피를 제작했다.',
               '제목 자체를 하나의 그래픽 요소로 활용해 책의 주제를 직관적으로 전달하고자 했다.'] },
      { type: 'gallery', label: 'book interior design', ratio: 'auto',
        items: [
          { image: 'assets/src/love-interior-1.jpg', title: '목차와 영화 스틸' },
          { image: 'assets/src/love-interior-2.jpg', title: '스틸 컷 콜라주' },
          { image: 'assets/src/love-interior-3.jpg', title: '챕터 본문' },
          { image: 'assets/src/love-interior-4.jpg', title: '‘사랑해’ 타이포그래피 펼침면' }
        ] }
    ]
  }
];
