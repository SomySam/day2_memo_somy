// 9. MemoForm 입력 기능 구현

import { useState } from "react";
import type { MemoFormProps } from "@/types";

/**
 * MemoForm 컴포넌트
 *
 * 새 메모를 작성하는 입력 폼입니다.
 */

function MemoForm({ onAddMemo }: MemoFormProps) {
    /**
     * 입력값 상태
     *
     * 사용자가 입력창에 타이핑하는 내용을 실시간으로 저장합니다.
     * 이런 방식을 "제어 컴포넌트(Controlled Component)"라고 해요.
     */
    const [inputValue, setInputValue] = useState("");

    /**
     * 폼 제출 핸들러
     *
     * @param e - 폼 이벤트 객체
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // 1. 폼의 기본 동작(페이지 새로고침) 방지
        e.preventDefault();

        // 2. 빈 입력값 체크 (공백만 있는 경우도 제외)
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) {
            return; // 빈 값이면 아무것도 하지 않음
        }

        // 3. 부모 컴포넌트의 추가 함수 호출
        onAddMemo(trimmedValue);

        // 4. 입력창 비우기
        setInputValue("");
    };

    /**
     * 입력값 변경 핸들러
     *
     * @param e - 입력 이벤트 객체
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <form className="memo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="memo-input"
                placeholder="메모를 입력하세요..."
                value={inputValue}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="add-button"
                disabled={!inputValue.trim()} // ← 빈 값이면 버튼 비활성화
            >
                추가
            </button>
        </form>
    );
}

export default MemoForm;
