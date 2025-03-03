# Next Js

기본적으로 라우터에서 URL을 할당한 후, 사용자가 해당 URL로 요청하면 할당된 컴포넌트를 불러오는 것과 달리, URL은 SRC 내의 폴더 명으로, 컴포넌트는 해당 폴더 내의 page.tsx에서 렌더링한다.

예를 들어 app 폴더 내에 layout을 두고, app 내에 about-us 폴더를 생성한 후 about-us/page.tsx를 생성하면 {base-url}/about-us 가 생성되며, page.tsx 내의 컴포넌트를 렌더링 하는 방식이다.

반대로 말하자면 page.tsx가 없는 이상 next.js에서 이를 렌더링 하지 않으며, 이를 이용해 components 폴더를 생성하고 공용 컴포넌트를 몰아넣는 방식으로 활용 가능할 것 같다.

우선 route.tsx를 생성하지 않아도 된다는 점은 바닐라 React에 비해서는 매우 편리해보임

page.tsx 내에는 export default function이 필수이며, 함수명은 아무렇게나 지어도 상관없음. export default function adsgkalnld9() {return ()} 이런 식으로 지어도 함수명을 트리거로 작동하는게 아니기에 잘 작동됨됨

# layout.tsx/jsx

기본적인 루트 파일. 기존의 layout과 동일하게 작동함.

# not-found.tsx

존재하지 않는 경우 대신 렌더링되는 페이지. 기존에는 따로 루트에서 오류가 발생하는 경우에 렌더링할 오류 페이지를 지정해야 하는 것과 달리 자동으로 해당 페이지로 렌더링 해준다.

# next.js 에서의 <link> 태그

next.js에서의 <link> 태그는 next/link에서 import 해옴
기본적인 사용법은 React와 동일

# usePathName

next.js의 hook 중에 하나로, 현재 사용자기 위치한 페이지의 url을 알려줌
위 hook를 사용하기 위해선 해당 페이지(또는 컴포넌트)에 "use client"를 추가해야 함

- CRA로 제작된 React 앱은 클라이언트 내에서 렌더링을 하기에, 페이지를 로딩하기 전에 모든 JS 코드를 받아야 함
  - 실제로 HTML 코드가 없으며, JS에서 생성한 HTML 코드만 있기 때문. 따라서 JS 파일이 전부 다운로드 되기까지 약간의 공백이 주어진 후에 페이지가 렌더링됨
    - React 페이지는 새로고침할 때 깜박임 = JS 코드를 다운받는 순간
  - 따라서 JS를 비활성화 하면 아예 실행되지 않음 => 데이터 연결 상태가 안 좋은 핸드폰 등등에서 발생함
- 또한 검색 엔진 최적화를 위해서는 google에 빈 페이지를 보이지 않는 것이 좋지만, CRA로 제작된 React 페이지는 기본적으로 HTML이 빈 페이지기에 부적합함

  - Google은 가끔 JS를 실행시켜 주지만, 대다수의 페이지는 그러지 않음

  => Client Side Renddering - CSR

- Next.js는 SSR - Server Side Rendering이 기본
  - 따라서 JS를 비활성화 해도 잘 작동됨
  - UI를 빌드하는 데에 JS가 필요 없음 => 이미 서버(백엔드)에서 렌더링 완료된 후에 넘어오기 때문
  - 다만 "use client"를 사용했다는 게 클라이언트에서 렌더링했다는 의미는 아님
  - 브라우저는 JS function을 이해하지 못해 해당 코드를 가지고 HTMl로 변환 - 이는 next.js가 server에서 먼저 처리하는 작업

# Hydration

Anchor 묶음이 React 컴포넌트로 변환된 것 -> navigation이 새로고침되지 않고 실행됨

- JS를 비활성화한 뒤에 a 태그를 실행하면 새로고침 되지만, JS를 활성화 하면 React가 개입하게 되면서 새로고침이 발생하지 않게 됨

  - 따라서 페이지가 렌더링되는 과정은 1. 서버에서 미리 렌더링 된 HTML 코드로 UI가 제공됨 2. JS로 React 컴포넌트로 변환됨 3. 이를 빠르게 렌더링된 HTML 코드에 초기화됨
  - 결과적으로 Hard Refresh 없이 navigate 등의 기능이 작동하게 됨 = Fully Interactive
  - 반대로 JS가 비활성화된 경우에는 React로 변환되지 않기 때문에 a태그로 작동 -> hard refresh가 발생함
  - 카운터 예제로 들자면, 클릭했을 때 값이 1만큼 증가하는 카운터에서 JS가 로드되지 않았을 경우 eventListener가 연결되지 않았기에 작동하지 않음

Dehydrated = 건조한

- 위의 JS가 비활성화된 HTML은 아무런 기능 없이 그저 HTML 코드만 존재하기에 껍데기에 불과함 = 마치 수분 없는 과일
- Hydrated는 수분이 있는 이라는 뜻. 따라서 JS에 의해 React로 초기화된 UI는 모든 기능을 갖춤 = 수분이 가득한 과일
- 단, 모든 컴포넌트에 Hydrate 과정이 발생하지 않음. SSR만 발생하기 때문에 껍데기만 제공될 뿐, React가 Initialize되지 않음
- Hydrate의 대상이 되는 컴포넌트는 "use client"라는 지시어가 포함된 컴포넌트 뿐임

따라서 "use client" = 백엔드에서 render되고 프론트엔드에서 hydrate & interactive됨 - 반대로 "use client"가 없으면 사용자가 이 컴포넌트를 다운받지 않음 = 다운받을 필요가 없는 컴포넌트에 대한 메모리 낭비가 없음
