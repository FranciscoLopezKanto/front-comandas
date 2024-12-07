import styled from 'styled-components';

export const MesaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const MesaNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const SwitchContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: #ccc;
    border-radius: 10px;
    position: relative;
    transition: background 0.3s;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: transform 0.3s;
    }
  }

  input:checked + span {
    background: #4caf50;

    &::before {
      transform: translateX(20px);
    }
  }
`;