import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Info } from 'phosphor-react';

interface InfoTooltipProps {
    explanation: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ explanation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);

    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                !iconRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <TooltipWrapper>
            <InfoIcon onClick={handleIconClick} ref={iconRef}>
                <Info size={18} weight="bold" color="#ff6320" />
            </InfoIcon>
            {isOpen && (
                <Popup ref={tooltipRef}>
                    <PopupContent>{explanation}</PopupContent>
                </Popup>
            )}
        </TooltipWrapper>
    );
};

// Styled Components for Tooltip
const TooltipWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    position: relative;
`;

const InfoIcon = styled.span`
    margin-left: 5px;
    cursor: pointer;
`;

const Popup = styled.div`
    position: absolute;
    top: 25px;
    left: 0;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 5px;
    max-width: 250px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;
`;

const PopupContent = styled.div`
    font-size: 14px;
    color: #333;
`;