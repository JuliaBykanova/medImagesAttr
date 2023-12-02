import React from 'react';
import styles from "./AuthBtn.css";

interface AuthBtnProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    label: string;
}

export function AuthBtn({ onClick, label }: AuthBtnProps) {
    return (
        <button onClick={onClick} className={styles.button}>
            {label}
        </button>
    );
}
