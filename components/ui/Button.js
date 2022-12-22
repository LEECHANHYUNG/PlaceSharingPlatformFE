import styled from 'styled-components';

const ButtonWrapper = styled.button`
  font: inherit;
  border: 1px solid #6a9eff;
  background: ${(props) => (props.cancel ? '#ddd' : '#6a9eff')};
  color: #fff;
  padding: 0.25rem 1rem;
  cursor: pointer;
  width: ${(props) => (props.main ? '300px' : '100%')};
  border-radius: 6px;
  text-align: center;

  &:hover,
  &:active {
    background: ${(props) => (props.cancel ? '#ff2400' : '#6a9eff')};
    border-color: rgb(91, 135, 218);
  }

  &:focus {
    outline: none;
  }
  &:disabled {
    border: #111;
    background: #999;
  }
`;

const Button = (props) => {
  return (
    <ButtonWrapper
      type={props.type || 'button'}
      onClick={props.onClick || null}
      id={null || props.id}
      disabled={props.disabled || false}
      main={props.main}
      value={props.value || ''}
      cancel={props.cancel || false}
    >
      {props.children}
    </ButtonWrapper>
  );
};

export default Button;
