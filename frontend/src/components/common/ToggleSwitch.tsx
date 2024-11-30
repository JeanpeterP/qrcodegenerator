import React from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <SwitchLabel>
            <SwitchInput
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <Slider />
        </SwitchLabel>
    );
};

// Styled Components for ToggleSwitch
const SwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
`;

const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: #ff6320;
    }

    &:focus + span {
        box-shadow: 0 0 1px #ff6320;
    }

    &:checked + span:before {
        transform: translateX(22px);
    }
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 28px;

    &:before {
        position: absolute;
        content: '';
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;