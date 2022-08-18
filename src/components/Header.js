/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  background-color: #696a6a;
  text-transform: uppercase;
`;

const leftStyles = css`
  display: flex;
  flex-direction: column;
  margin-left: 30px;

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }

  h4 {
    margin: 0;
  }
`;

const centerStyles = css`
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 10px;
  }

  h2 {
    text-align: center;
    margin: 0;
  }
`;

const rightStyles = css`
  display: flex;
  gap: 30px;
  align-items: flex-end;
  margin-right: 30px;
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div css={leftStyles}>
        <h3>a-taraxia</h3>
        <h4>with Brianna O'Koffee</h4>
      </div>
      <div css={centerStyles}>
        <h4>A special exhibition with</h4>
        <h2>Brianna O'Koffee</h2>
      </div>
      <div css={rightStyles}>
        <h4>The project</h4>
        <h4>
          <a>Guest List</a>
        </h4>
      </div>
    </header>
  );
}
