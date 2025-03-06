# Next Js

기본적으로 라우터에서 URL을 할당한 후, 사용자가 해당 URL로 요청하면 할당된 컴포넌트를 불러오는 것과 달리, URL은 SRC 내의 폴더 명으로, 컴포넌트는 해당 폴더 내의 page.tsx에서 렌더링한다.

예를 들어 app 폴더 내에 layout을 두고, app 내에 about-us 폴더를 생성한 후 about-us/page.tsx를 생성하면 {base-url}/about-us 가 생성되며, page.tsx 내의 컴포넌트를 렌더링 하는 방식이다.

반대로 말하자면 page.tsx가 없는 이상 next.js에서 이를 렌더링 하지 않으며, 이를 이용해 components 폴더를 생성하고 공용 컴포넌트를 몰아넣는 방식으로 활용 가능할 것 같다.

우선 route.tsx를 생성하지 않아도 된다는 점은 바닐라 React에 비해서는 매우 편리해보임

page.tsx 내에는 export default function이 필수이며, 함수명은 아무렇게나 지어도 상관없음. export default function adsgkalnld9() {return ()} 이런 식으로 지어도 함수명을 트리거로 작동하는게 아니기에 잘 작동됨됨

# layout.tsx/jsx

기본적인 루트 파일. 기존의 layout과 동일하게 작동함.

layout.tsx 파일은 하나만 있는 게 아닌 여러 개 생성할 수 있으며, 각 폴더 마다 레이아웃을 지정할 수 있음

- 별도로 지정된 layout의 경우 해당 디렉토리의 하위 디렉토리까지도 적용됨
- (중요!) 레이아웃은 서로 상쇄되지 않으며, 중첩됨

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

# Route group

Route를 그룹화 하여 logical group화 하는 것

- 괄호 폴더를 생성할 경우 URL에 전혀 영향을 미치지 않음
- app 하위에 (home)은 {base-url}/home이 아닌 여전히 {base-url}/ 로 되어있음
- layout과 not-found는 일반적으로 모든 페이지에서 사용되므로 app 하위에 그대로 유지됨
  => 디렉토리 구조를 깔끔하게 정리한 채 컴포넌트를 묶을 수 있음

예시) BaroFarm 프로젝트에서 user, market, board 등의 디렉토리로 묶은 컴포넌트들은 React에서는 route.js에서 정리했기 때문에 해당 파일에서 정리한 반면, next에서는 무조건 디렉토리 이름 = url임. 따라서 디렉토리 이름이 url에 포함되지 않길 바랄 경우 = user/login, user/signin이 아닌 /login, /signin 이렇게 만들고 싶은 경우 그룹화 하여 정리할 수 있음

# Meta Data

React에서의 메타데이터와 역할은 동일

- layout과 비슷하게 여러 개가 존재할 경우 서로 상쇄되지 않으며, 정확히는 여러 개의 메타 데이터가 존재할 경우 병합됨
- 메타 데이터는 서버 컴포넌트에만 있을 수 있으며, 클라이언트 컴포넌트에는 존재할 수 없음 = use client 금지
  - Page와 Layout에만 메타데이터를 export할 수 있음
  - 예를 들어 왼쪽의 about-us, (home) 등의 page와 layout, not-found는 메타데이터를 export할 수 있음
  - 하지만 components 내의 navigation처럼 use client를 사용하여 클라은 메타 데이터를 export할 수 없음
- next의 MetaData를 이용하여 템플릿화 할 수 있음

app/layout.tsx

```
export const metadata: Metadata = {
title: {
template: "%s | Next Movies",
default: "Loading...",
},
description: "The best movies on the best framework",
};
```

(home)/page.tsx

```
export const metadata = {
  title: "Home",
};

```

이런 식으로 app의 layout의 metadata에 타입처럼 Metadata를 부여하고 다른 페이지에서 타이틀을 부여함으로써써 템플릿화 하여 사용 가능함. 메타 데이터가 설정되지 않을 경우 default가 출력됨.

- 다만 Type을 부여하는 과정은 Typescript 한정이며, Javascript로 이용할 경우 Metadata 타입을 부여할 필요 없음

# Dynamic route

동적 루트. 리액트 라우터에서 /product/:id 이런 식으로 처리했던 루트임.

이를 next.js를 활용해 파일 시스템으로 만드려면 하위 디렉토리로 [id] 이런 식으로 중괄호를 붙여 폴더를 생성하고 그 안에 page.tsx를 생성해야 함

{base-url}/product/12343132 이런식으로 만들어진 페이지에 전달되는 props를 확인하면 params:{id: 1234132}와 searchParams:{} 가 전달됨.

이를 활용하여 데이터를 받아오거나 검색 기능을 제작 가능함

만약 id가 아닌 다른 이름의 변수로 받고싶다면 디렉토리 명을 [number]든 [prod]든 다르게만 지으면 됨

# Data Fetching

next.js는 server side rendering이다. 따라서 use client나 useState, useEffect를 사용하지 않고도 api로부터 data를 fetch하는 것이 가능함
= 프론트엔드에서 데이터를 요청했던 React와 달리, 백엔드에서 요청함

- 또, next.js는 프레임워크이기에 server component를 사용할 경우 fetch된 url을 캐싱해줌
  - 네트워크 탭을 통해 확인할 경우 use client를 이용하거나 react를 이용할 때와는 달리 이용한 api와 관련된 항목이 전혀 없음

# Loading Component

Data Fetching을 할 때 로딩이 오래 걸릴 경우 백엔드에서 렌더링을 진행하는 next.js 특성상 데이터 로딩이 완료될 때까지 어떤 UI도 렌더링 되지 않음

이 문제를 해결하기 위해 로딩 컴포넌트를 추가하고자 하는 page.tsx 파일 아래에 loading.tsx를 추가해 로딩 컴포넌트를 추가할 경우 별도의 지시어나 라이브러리 없이 바로 로딩 페이지가 렌더링됨

# Parallel Request

두 가지 요청을 보낼 때 각각 따로 요청하면 요청 1 + 요청 2 의 시간이 걸려 결과적으로 로딩 시간이 길어짐

따라서 const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]); 이런 식으로 두 요청을 병렬적으로 처리하면 로딩 시간을 아낄 수 있음

다만 이 경우에는 두 요청이 동시에 시작하지만, 동시에 끝나지는 않음. 하지만 두 요청이 전부 끝나기 전까지 UI는 렌더링 되지 않음

따라서 두 요청을 분리해야 함

이를 위해 사용하는 React 태그 = Suspense

<Suspense fallback={<h1>Loading Movie videos</h1>}>
<MovieVideos id={id} />
</Suspense>
<Suspense fallback={<h1>Loading Movie info</h1>}>
<MovieInfo id={id} />
</Suspense>

이런 식으로 다른 컴포넌트로 요청을 뺀 뒤, 이 컴포넌트를 suspense로 감싸는 방법이 있음

- fallback은 로딩 중에 표시할 내용을 입력하면 됨

위의 Loading 컴포넌트는 전체 페이지를 로딩 컴포넌트로 바꾸는 거라면, Suspense는 필요한 부분만 Loading 컴포넌트로 바꿔 사용자에게 최소한의 UI를 제공함

- 최적화용으로 사용 가능할 것 같음

# Error Handling

- 에러가 일어날 경우 표시할 에러 컴포넌트 또한 로딩 컴포넌트처럼 원하는 페이지 컴포넌트 아래에 생성해 대신 렌더링 할 수 있음
  - 다만 로딩과 다르게 에러 컴포넌트는 "use client"를 포함해야 함
- 이렇게 하면 에러가 일어난 부분만 에러 컴포넌트로 대신 렌더링 되며, 이외의 부모 컴포넌트는 문제 없이 렌더링됨

# Dynamic Metadata 동적 메타데이터

- 영화명 | ~~~ 처럼 동적인 데이터로 메타 데이터가 정해지는 경우가 있음
- 그럴 경우 function metadata가 아닌, function generateMetadata를 사용함

- 이 때 generateMetadata는 해당 페이지 컴포넌트처럼 props로 params: {id}를 받아오는 것 또한 가능함
