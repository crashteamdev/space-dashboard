import React from "react";

export const RadioButton: React.FC<{
    name: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    children: React.ReactNode;
}> = ({ name, value, checked, onChange, children }) => {
    return (
        <label className="custom-radio">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <div className={`radio-button ${checked ? "checked" : ""}`} />
            {children}
            <style jsx>{`
                .custom-radio {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
                .radio-button {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #000;
                    border-radius: 50%;
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                }
                .radio-button.checked {
                    background: #000;
                }
                .radio-button.checked::after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #fff;
                }
                input[type="radio"].hidden {
                    display: none;
                }
            `}</style>
        </label>
    );
};
