import React from 'react';
import styled from 'styled-components';

interface FileCustomizationProps {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    buttonText: string;
    setButtonText: (text: string) => void;
    buttonColor: string;
    setButtonColor: (color: string) => void;
}

export const FileCustomization: React.FC<FileCustomizationProps> = ({
    title,
    setTitle,
    description,
    setDescription,
    buttonText,
    setButtonText,
    buttonColor,
    setButtonColor,
}) => {
    return (
        <CustomizationContainer>
            <FormGroup>
                <Label>Title</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                />
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    rows={3}
                />
            </FormGroup>

            <ButtonCustomization>
                <FormGroup>
                    <Label>Button Text</Label>
                    <Input
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="Enter button text"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Button Color</Label>
                    <ColorPickerContainer>
                        <ColorPicker
                            type="color"
                            value={buttonColor}
                            onChange={(e) => setButtonColor(e.target.value)}
                        />
                        <ColorValue>{buttonColor.toUpperCase()}</ColorValue>
                    </ColorPickerContainer>
                </FormGroup>
            </ButtonCustomization>
        </CustomizationContainer>
    );
};

const CustomizationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: #ffffff;
    border-radius: 8px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.9rem;
    color: #333;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
`;

const ColorPickerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ColorPicker = styled.input`
    width: 50px;
    height: 50px;
    border: none;
    padding: 0;
    background: none;
`;

const ColorValue = styled.span`
    font-size: 0.9rem;
    color: #333;
`;

const ButtonCustomization = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;