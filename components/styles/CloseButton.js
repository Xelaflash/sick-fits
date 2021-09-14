import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  top: -2px;
  padding: 4px 12px;
  &:hover {
    background: var(--grey);
  }
`;

export default CloseButton;
