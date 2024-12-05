import React from 'react';
import styled from 'styled-components';

export const SkullPreview: React.FC = () => {
  return (
    <SkullContainer>
      <svg
        width="50"
        height="50"
        viewBox="0 0 64 64"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="
          M 32 4
          C 18 4 8 16 8 28
          C 8 36 12 42 18 46
          L 18 54
          C 18 58 22 60 26 60
          L 38 60
          C 42 60 46 58 46 54
          L 46 46
          C 52 42 56 36 56 28
          C 56 16 46 4 32 4
          Z
          M 24 32
          C 21 32 18 29 18 26
          C 18 23 21 20 24 20
          C 27 20 30 23 30 26
          C 30 29 27 32 24 32
          Z
          M 40 32
          C 37 32 34 29 34 26
          C 34 23 37 20 40 20
          C 43 20 46 23 46 26
          C 46 29 43 32 40 32
          Z
          M 24 46
          L 40 46
          C 42 46 44 48 44 50
          C 44 52 42 54 40 54
          L 24 54
          C 22 54 20 52 20 50
          C 20 48 22 46 24 46
          Z
        "/>
      </svg>
    </SkullContainer>
  );
};

const SkullContainer = styled.div`
  width: 50px;
  height: 50px;
`;