// src/components/MemoItem.tsx

import { useState } from "react"; // ← useState import 추가
import type { MemoItemProps } from "@/types";

function MemoItem({ memo, onUpdateMemo, onDeleteMemo }: MemoItemProps) {
    /**
     * 수정 모드 상태
     *
     * true: 편집 모드 (textarea 표시)
     * false: 보기 모드 (내용 표시)
     */
    const [isEditing, setIsEditing] = useState(false);

    /**
     * 수정 중인 내용 상태
     *
     * 초기값은 현재 메모의 content
     */
    const [editContent, setEditContent] = useState(memo.content);

    /**
     * 수정 버튼 클릭 핸들러
     *
     * 편집 모드로 전환합니다.
     */
    const handleEdit = () => {
        setIsEditing(true);
        setEditContent(memo.content); // 현재 내용으로 초기화
    };

    /**
     * 저장 버튼 클릭 핸들러
     *
     * 수정된 내용을 저장하고 보기 모드로 전환합니다.
     */
    const handleSave = () => {
        const trimmedContent = editContent.trim();

        // 빈 내용이면 저장하지 않음
        if (!trimmedContent) {
            alert("메모 내용을 입력해주세요.");
            return;
        }

        // 부모 컴포넌트의 수정 함수 호출
        onUpdateMemo(memo.id, trimmedContent);

        // 보기 모드로 전환
        setIsEditing(false);
    };

    /**
     * 취소 버튼 클릭 핸들러
     *
     * 수정을 취소하고 보기 모드로 전환합니다.
     */
    const handleCancel = () => {
        setIsEditing(false);
        setEditContent(memo.content); // 원래 내용으로 복원
    };

    /**
     * 삭제 버튼 클릭 핸들러
     */
    const handleDelete = () => {
        if (window.confirm("정말 이 메모를 삭제하시겠습니까?")) {
            onDeleteMemo(memo.id);
        }
    };

    /**
     * textarea 내용 변경 핸들러
     */
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(e.target.value);
    };

    /**
     * 키보드 이벤트 핸들러
     *
     * Ctrl+Enter 또는 Cmd+Enter로 저장
     * Escape로 취소
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    // ============================================
    // 렌더링
    // ============================================

    // 수정 모드일 때
    if (isEditing) {
        return (
            <div className="memo-item">
                <textarea
                    className="edit-input"
                    value={editContent}
                    onChange={handleContentChange}
                    onKeyDown={handleKeyDown}
                    autoFocus // 자동으로 포커스
                />
                <p className="memo-date">Ctrl+Enter로 저장, Esc로 취소</p>
                <div className="memo-actions">
                    <button className="save-button" onClick={handleSave}>
                        저장
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </div>
        );
    }

    // 보기 모드일 때
    return (
        <div className="memo-item">
            <p className="memo-content">{memo.content}</p>
            <p className="memo-date">
                {new Date(memo.createdAt).toLocaleString("ko-KR")}
                {memo.updatedAt !== memo.createdAt && <span> (수정됨)</span>}
            </p>
            <div className="memo-actions">
                <button className="edit-button" onClick={handleEdit}>
                    수정
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default MemoItem;
