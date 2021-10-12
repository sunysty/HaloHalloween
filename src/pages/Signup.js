import React from "react";
import styled from "styled-components";
import { Grid, Label, Input } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "../shared/Spinner";
const Signup = (props) => {
  const dispatch = useDispatch();
  const is_loading = useSelector((state) => state.user.is_loading);
  const [state, setState] = React.useState({
    userEmail: "",
    userNickname: "",
    userPassword: "",
    passwordCheck: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = () => {
    if (state.userPassword !== state.passwordCheck) {
      alert("비밀번호가 다릅니다. 다시 확인해주세요");
      return null;
    }
    dispatch(userActions.signupFB(state));
  };

  return (
    <>
      {is_loading && <Spinner />}
      <Grid
        width="30vw"
        height="75vh"
        margin="12vh auto"
        padding="40px 50px"
        bg="#f1f3f5"
      >
        <h1>회원가입</h1>
        <Grid margin="20px 0 0 0">
          <Label>이메일</Label>
          <Grid is_flex>
            <Input
              name="userEmail"
              value={state.userEmail}
              _onChange={onChange}
              placeholder="이메일 주소를 입력해주세요."
            />
          </Grid>
        </Grid>
        <Grid margin="10px 0 0 0">
          <Label>닉네임</Label>
          <Input
            name="userNickname"
            value={state.userNickname}
            _onChange={onChange}
            placeholder="닉네임을 입력해주세요."
          />
        </Grid>
        <Grid margin="10px 0 0 0">
          <Label>비밀번호</Label>
          <Input
            name="userPassword"
            value={state.userPassword}
            _onChange={onChange}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </Grid>
        <Grid margin="10px 0 0 0">
          <Label>비밀번호 확인</Label>
          <Input
            name="passwordCheck"
            value={state.passwordCheck}
            _onChange={onChange}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
        </Grid>
        <Grid margin="20px 0 0 0">
          <Button onClick={onClick}>회원가입</Button>
        </Grid>
        <Grid margin="20px 0 0 0">
          <Button
            style={{ backgroundColor: "#fff", color: "hsl(209deg 30% 20%)" }}
          >
            메인으로가기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

// const Input = styled.input`
//   display: block;
//   width: 100%;
//   margin-top: 3px;
//   padding: 8px;
// `;

const Button = styled.button`
  width: 100%;
  padding: 13px 0;
  color: #fff;
  background-color: hsl(209deg 30% 20%);
  border: 1px solid hsl(209deg 30% 20%);
`;

export default Signup;
