import { createContext, useState, useEffect, useCallback } from 'react';

export const BookPageContext = createContext();

export function BookPageProvider({ children }) {
    const [textSettings, setTextSettings] = useState({
        color: 'black',
        size: 'medium',
        bold: false
    });

    // Загрузка настроек из localStorage
    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('textSettings')) || {};
        setTextSettings(prev => ({ ...prev, ...savedSettings }));
    }, []);

    // Сохранение настроек
    useEffect(() => {
        localStorage.setItem('textSettings', JSON.stringify(textSettings));
    }, [textSettings]);

    const setTextColor = useCallback(color => {
        setTextSettings(prev => ({ ...prev, color }));
    }, []);

    const setTextSize = useCallback(size => {
        setTextSettings(prev => ({ ...prev, size }));
    }, []);

    const toggleBold = useCallback(() => {
        setTextSettings(prev => ({ ...prev, bold: !prev.bold }));
    }, []);

    const value = {
        textSettings,
        setTextColor,
        setTextSize,
        toggleBold
    };

    return (
        <BookPageContext.Provider value={value}>
            {children}
        </BookPageContext.Provider>
    );
}