import styled from 'styled-components';

const PaginationStyles = styled.div`
  border: 1px solid red;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-content: center;
  align-content: center;
  margin: 2rem auto;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  width: fit-content;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
