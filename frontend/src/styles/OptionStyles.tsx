// OptionStyles.tsx
import styled from "styled-components";

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change to column for pagination arrows */
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
`;

export const OptionGrid = styled.div<{ itemCount: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 600px;
  justify-content: center;
`;

export const OptionBox = styled.div<{ active: boolean }>`
  position: relative;
  border: 2px solid ${(props) => (props.active ? "#ff6320" : "#ced4da")};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #ff6320;
  }
`;

export const PreviewContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const OptionLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
`;
