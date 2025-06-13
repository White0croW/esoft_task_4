import React, { useContext } from 'react';
import { BookPageContext } from '../contexts/BookPageContext';

function ReadingSettings() {
    const { textSettings, setTextColor, setTextSize, toggleBold } = useContext(BookPageContext);

    const textStyle = {
        color: textSettings.color,
        fontSize: textSettings.size === 'small' ? '14px' :
            textSettings.size === 'medium' ? '16px' : '18px',
        fontWeight: textSettings.bold ? 'bold' : 'normal'
    };

    return (
        <div className="reading-settings">
            <h3>Настройки чтения</h3>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <div>
                    <label>Цвет текста: </label>
                    <select
                        value={textSettings.color}
                        onChange={(e) => setTextColor(e.target.value)}
                    >
                        <option value="black">Черный</option>
                        <option value="sepia">Сепия</option>
                        <option value="#1a3d7c">Темно-синий</option>
                    </select>
                </div>

                <div>
                    <label>Размер текста: </label>
                    <select
                        value={textSettings.size}
                        onChange={(e) => setTextSize(e.target.value)}
                    >
                        <option value="small">Маленький</option>
                        <option value="medium">Средний</option>
                        <option value="large">Крупный</option>
                    </select>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={textSettings.bold}
                            onChange={toggleBold}
                            style={{ marginRight: '5px' }}
                        />
                        Жирный шрифт
                    </label>
                </div>
            </div>

            <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '20px', marginTop: '10px' }}>
                <p style={textStyle}>
                    Это предварительный просмотр ваших настроек. Вы видите, как будет выглядеть текст книги
                    с выбранными параметрами. Попробуйте разные комбинации, чтобы найти наиболее комфортные
                    для чтения настройки.
                </p>
            </div>
        </div>
    );
}

export default ReadingSettings;