// OptionStyles.tsx
import styled from "styled-components";

export const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const OptionGrid = styled.div<{ itemCount: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  justify-items: center;
`;

export const OptionBox = styled.div<{ active: boolean }>`
  width: 100px;
  height: 100px;
  border: 2px solid ${(props) => (props.active ? '#ff6320' : '#ced4da')};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.active ? '#fff5f0' : 'white')};
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff6320;
    background-color: #fff5f0;
  }
`;

export const PreviewContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const OptionLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;
`;
