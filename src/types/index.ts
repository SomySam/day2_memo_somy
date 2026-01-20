// src/types/index.ts

/**
 * ============================================
 * 메모장 앱 타입 정의
 * ============================================
 *
 * 이 파일은 앱 전체에서 사용할 데이터의 "모양"을 정의합니다.
 * 모든 컴포넌트에서 이 타입을 import해서 사용하게 됩니다.
 */

/**
 * Memo 인터페이스
 *
 * 하나의 메모가 가져야 할 속성들을 정의합니다.
 * 메모를 저장하고, 표시하고, 수정할 때 이 구조를 따릅니다.
 */
export interface Memo {
    /**
     * 메모의 고유 식별자
     * - 각 메모를 구분하는 유일한 값
     * - 수정/삭제할 때 어떤 메모인지 찾는 데 사용
     * - Date.now()로 생성하면 중복 없는 숫자를 얻을 수 있음
     */
    id: number;

    /**
     * 메모 내용
     * - 사용자가 작성한 실제 텍스트
     * - 빈 문자열은 허용하지 않도록 UI에서 검증
     */
    content: string;

    /**
     * 메모 작성 일시
     * - 메모가 처음 생성된 시간
     * - ISO 8601 형식의 문자열로 저장 (예: "2025-01-29T09:30:00.000Z")
     * - new Date().toISOString()으로 생성
     */
    createdAt: string;

    /**
     * 메모 수정 일시
     * - 메모가 마지막으로 수정된 시간
     * - 처음 생성 시에는 createdAt과 동일한 값
     * - 수정할 때마다 업데이트
     */
    updatedAt: string;
}

/**
 * MemoInput 타입
 *
 * 새 메모를 생성할 때 사용자가 입력하는 데이터입니다.
 * id, createdAt, updatedAt은 시스템이 자동 생성하므로 제외합니다.
 *
 * Pick<Memo, 'content'>와 같은 의미이지만,
 * 명확한 의도 전달을 위해 별도로 정의합니다.
 */
export interface MemoInput {
    /**
     * 사용자가 입력한 메모 내용
     */
    content: string;
}

/**
 * MemoFormProps 타입
 *
 * MemoForm 컴포넌트가 받을 props를 정의합니다.
 * 부모 컴포넌트(App)에서 자식 컴포넌트(MemoForm)로
 * 전달되는 데이터와 함수의 타입입니다.
 */
export interface MemoFormProps {
    /**
     * 새 메모를 추가하는 함수
     * - 부모(App)에서 정의하고 자식(MemoForm)에서 호출
     * - content를 받아서 새 Memo 객체를 생성
     * @param content - 사용자가 입력한 메모 내용
     */
    onAddMemo: (content: string) => void;
}

/**
 * MemoItemProps 타입
 *
 * MemoItem 컴포넌트가 받을 props를 정의합니다.
 * 개별 메모 하나를 표시하고 수정/삭제하는 데 필요한 것들입니다.
 */
export interface MemoItemProps {
    /**
     * 표시할 메모 데이터
     */
    memo: Memo;

    /**
     * 메모를 수정하는 함수
     * @param id - 수정할 메모의 id
     * @param content - 새로운 내용
     */
    onUpdateMemo: (id: number, content: string) => void;

    /**
     * 메모를 삭제하는 함수
     * @param id - 삭제할 메모의 id
     */
    onDeleteMemo: (id: number) => void;
}

/**
 * MemoListProps 타입
 *
 * MemoList 컴포넌트가 받을 props를 정의합니다.
 * 메모 목록 전체를 표시하는 데 필요한 것들입니다.
 */
export interface MemoListProps {
    /**
     * 표시할 메모 배열
     */
    memos: Memo[];

    /**
     * 메모를 수정하는 함수 (MemoItem에 전달됨)
     */
    onUpdateMemo: (id: number, content: string) => void;

    /**
     * 메모를 삭제하는 함수 (MemoItem에 전달됨)
     */
    onDeleteMemo: (id: number) => void;
}
