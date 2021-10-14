import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Input, Textarea, Button, Image, Text } from '../elements/index';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const Modal2 = (props) => {
  // 상세포스트 카드 모달창
  // redux user module에 저장되어있는 현재 유저 정보 불러오기
  const user_data = useSelector((state) => state.user.user);

  const modaloff = () => {
    props._setModal(false);
  };
  // 게시물의 닉네임과 세션스토리지에 있는 닉네임을 비교해서 "수정,삭제 버튼 보여줌,안보여줌"
  // 현재는 sessionStorage에 userNickname으로 저장되어있는데, 미다님께서 redux의 user module에 저장할 예정, useSelector로 userNickname 가져와야함
  // const userNickname = sessionStorage.getItem('userNickname');
  const userNickname = user_data.userNickname;
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(props.el.postingTitle);
  const [editContent, setEditContent] = useState(props.el.postingComment);
  const [editButton, setEditButton] = useState(false);
  const [isEditedtitle, setIsEditedtitle] = useState(true);
  const [isEditedcontent, setIsEditedcontent] = useState(true);
  const postingDate = moment().format('YYYY-MM-DD');

  // 서버에 넘겨줄 수정된 데이터
  const update_postdata = {
    postID: props.el.postID,
    postingTitle: editTitle,
    postingAuthor: props.el.postingAuthor,
    postingComment: editContent,
    postingUpdate: postingDate,
  };

  // 서버에 넘겨줄 postID
  const postID = {
    postID: props.el.postID,
  };

  // 수정 버튼을 누르면 발생하는 함수
  const onModify = () => {
    setIsEditedtitle(!isEditedtitle);
    setIsEditedcontent(!isEditedcontent);
    setEditButton(!editButton);
  };
  // 제목 input 부분 수정
  const editInput = (e) => {
    setEditTitle(e.target.value);
  };
  // 내용 textarea 부분 수정
  const editTextarea = (e) => {
    setEditContent(e.target.value);
  };

  // 수정된 내용을 middleware로 보내기
  const editDataSubmit = () => {
    // if(alert(수정 하ㄱ)){
    //   console.log(alert);
    // }
    dispatch(postActions.updatePostFB(update_postdata));
  };
  // 삭제하기 위해서 postID 서버로 보내기
  const onDelete = () => {
    dispatch(postActions.deletePostFB(postID));
    // console.log('삭제되니?');
  };

  return (
    <>
      <ModalParent>
        <Grid width='30vw' padding='10px 30px' bg='#f1f3f5'>
          <Grid margin='0 0 10px 0' is_flex justify='flex-end'>
            {userNickname === props.el.postingAuthor ? (
              <Button margin='0 5px 0 0' _onClick={onModify}>
                수정
              </Button>
            ) : null}
            {userNickname === props.el.postingAuthor ? (
              <Button margin='0 5px 0 0' _onClick={onDelete}>
                삭제
              </Button>
            ) : null}
          </Grid>
          <Grid is_flex justify='flex-end'>
            <Image src='https://w.namu.la/s/45f0a9e507fc904b7accb3586ff709220b6242dfda220bd7ae85a39b57b22a760a4fa4cb0c2fbf16f37c9d229d0e93a1aac0d9c3dbd927c039698d9bdd9ab9a659f253ec19e2d0d33ddb115858b3222ea5a8a732082176563cc61e10ea9259b9' />
          </Grid>
          <Grid margin='10px 0 0 0' is_flex justify='space-between'>
            <Text>{props.el.postingAuthor}</Text>
            <Text>{props.el.postingDate}</Text>
          </Grid>
          <Grid margin='10px 0 0 0'>
            <Input
              type='text'
              _onChange={editInput}
              value={editTitle}
              disabled={isEditedtitle}
            />
          </Grid>
          <Grid margin='10px 0 0 0'>
            <Textarea
              _onChange={editTextarea}
              value={editContent}
              disabled={isEditedcontent}
            />
          </Grid>
          <Grid margin='10px 0 0 0' is_flex>
            {userNickname === props.el.postingAuthor && editButton ? (
              <Button margin='0 5px 0 0' type='blue' _onClick={editDataSubmit}>
                수정하기
              </Button>
            ) : null}
          </Grid>
          <Grid margin='10px 0 0 0' is_flex>
            <Input type='text' flex />
            <Button margin='0 0 0 5px' width='70%'>
              수정
            </Button>
          </Grid>
          <Cancelbtn onClick={modaloff}>닫기</Cancelbtn>
        </Grid>
      </ModalParent>
    </>
  );
};

const ModalParent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Cancelbtn = styled.button`
  position: absolute;
  top: -65px;
  right: 5px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  /* transform: translate(-50%, -50%); */
  background-color: transparent;
  color: #fff;
  transition: all ease 0.3s;
  &:hover {
    color: #ff4949;
  }
`;

export default Modal2;
