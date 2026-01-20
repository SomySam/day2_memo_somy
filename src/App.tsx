// day3  2.환경변수 설정

import { useState, useEffect } from "react";
import MemoForm from "@/components/MemoForm";
import MemoList from "@/components/MemoList";
import type { Memo } from "@/types";
import "@/styles/App.css";

/**
 * localStorage 키 상수
 * 환경변수로 관리하기
 */
const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

function App() {
    const [memos, setMemos] = useState<Memo[]>(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error(
                    "저장된 데이터를 불러오는데 실패했습니다:",
                    error,
                );
                return [];
            }
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
    }, [memos]);

    const handleAddMemo = (content: string) => {
        const newMemo: Memo = {
            id: Date.now(),
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setMemos([newMemo, ...memos]);
    };

    const handleUpdateMemo = (id: number, content: string) => {
        setMemos(
            memos.map((memo) =>
                memo.id === id
                    ? {
                          ...memo,
                          content: content,
                          updatedAt: new Date().toISOString(),
                      }
                    : memo,
            ),
        );
    };

    const handleDeleteMemo = (id: number) => {
        setMemos(memos.filter((memo) => memo.id !== id));
    };

    return (
        <div className="app">
            <h1 className="app-title">
                📝 {import.meta.env.VITE_APP_TITLE || "메모장"}
            </h1>

            <MemoForm onAddMemo={handleAddMemo} />

            <MemoList
                memos={memos}
                onUpdateMemo={handleUpdateMemo}
                onDeleteMemo={handleDeleteMemo}
            />

            <p className="memo-count">
                총 {memos.length}개의 메모{" "}
                <span
                    style={{
                        fontSize: "0.7rem",
                        marginLeft: "8px",
                        color: "#aaa",
                    }}
                >
                    v{import.meta.env.VITE_APP_VERSION}
                </span>
            </p>
        </div>
    );
}

export default App;
