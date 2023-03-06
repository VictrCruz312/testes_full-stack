import styled from "styled-components";

export const HomeStyled = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;

  .containerEstabeleciments {
    table,
    tr,
    th,
    td {
      border-collapse: collapse;
      font-size: 13px;

      text-align: center;
      border: 1px solid black;
      padding: 2px 4px;

      .options {
        display: flex;
        justify-content: center;
        padding: 10px 20px;
        width: 100px;
        height: 50px;
        gap: 10px;

        button {
          border-radius: 4px;
          color: var(--color-whiteFixed);
          background-color: var(--color-gray-2);
          border: 2px solid var(--color-gray-1);
          transition: 100ms;

          :hover {
            background-color: var(--color-gray-6);
            border: 2px solid var(--color-brand-2);
            color: var(--color-gray-1);
          }

          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    table {
      width: 75vw;
    }

    th {
      border: 4px solid blue;
    }
  }
`;
