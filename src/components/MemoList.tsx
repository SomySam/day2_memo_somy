import type { MemoListProps } from "@/types";
import MemoItem from "./MemoItem";
// import MemoItem from "@/components/MemoItem";

/**
 * MemoList 컴포넌트
 *
 * 메모 목록 전체를 표시합니다.
 * 메모가 없으면 안내 메시지를 보여주고,
 * 메모가 있으면 MemoItem 컴포넌트를 반복해서 렌더링합니다.
 */
function MemoList({ memos, onUpdateMemo, onDeleteMemo }: MemoListProps) {
    if (memos.length === 0) {
        return (
            <div className="empty-message">
                작성된 메모가 없습니다. 첫 번째 메모를 작성해보세요!
            </div>
        );
    }

    return (
        <div className="memo-list">
            {memos.map((memo) => (
                <MemoItem
                    key={memo.id}
                    memo={memo}
                    onUpdateMemo={onUpdateMemo}
                    onDeleteMemo={onDeleteMemo}
                />
            ))}
        </div>
    );
}

export default MemoList;
