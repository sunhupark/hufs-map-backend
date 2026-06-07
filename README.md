# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
---

## HUFS MAP Backend

HUFS MAP은 한국외국어대학교 글로벌캠퍼스의 주요 건물 정보를 지도 기반으로 제공하고, 사용자들이 위치별 게시글과 후기를 공유할 수 있도록 구현한 웹 서비스이다.

본 repository는 Appwrite 기반 사용자 인증, 사용자 정보 관리, 즐겨찾기, 회원 탈퇴 Function, API 문서를 포함한다.

## Main Features

- Appwrite Authentication
- 학교 이메일 인증
- 아이디 기반 로그인
- users 컬렉션 사용자 정보 저장
- 건물 즐겨찾기
- 회원 탈퇴 Function
- 마이페이지 데이터 조회 구조
- GitHub 기반 협업 기록 관리