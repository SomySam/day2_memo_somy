/// <reference types="vite/client" />

/**
 * Vite 환경 변수 타입 정의
 *
 * 이 파일에 정의하면 import.meta.env.VITE_XXX 사용 시
 * 자동완성과 타입 체크를 받을 수 있어요.
 * 바이브 코딩이나 copilot 사용시에는 설정이 없어도 자동완성이 잘 되지요.
 * 하지만 직접 코드를 작성할 때 실수를 줄이기 위해 타입 정의를 추가하는 것이 좋습니다.
 */
interface ImportMetaEnv {
    /** 앱 제목 */
    readonly VITE_APP_TITLE: string;

    /** 앱 버전 */
    readonly VITE_APP_VERSION: string;

    /** localStorage 키 */
    readonly VITE_STORAGE_KEY: string;

    // Day 4에서 추가할 Firebase 환경 변수
    // readonly VITE_FIREBASE_API_KEY: string;
    // readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    // readonly VITE_FIREBASE_PROJECT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
