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
