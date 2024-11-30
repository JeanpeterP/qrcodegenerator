import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-family: 'Aspekta 550', Arial, sans-serif;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #f9f9f9;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    margin-bottom: 16px;

    &:focus {
        border-color: #ff6320;
        box-shadow: 0 0 10px rgba(255, 99, 32, 0.5);
        outline: none;
    }

    &:disabled {
        background-color: #e9e9e9;
        cursor: not-allowed;
    }
`;

export const ColorPickerLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
`;

export const ColorPicker = styled.input.attrs({ type: 'color' })`
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: none;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: 2px solid #ccc;
        border-radius: 8px;
    }
`; 