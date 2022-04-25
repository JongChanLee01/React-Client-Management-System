// 서버와의 통신 목적인 라이브러리 axios를 설치해 주고 시작함
// 설치 할때에는 client 폴더에 설치하기 위해서 cd client 로 경로를 변경해주고
// npm install --save axios로 axios를 설치해줌

import React from "react";
import { post } from "axios";

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    };
  }

  // 고객 추가
  handleFormSubmit = (e) => {
    // 데이터가 서버로 전달됨에 있어서 오류가 발생하지 않도록 해줌
    e.preventDefault();

    // then을 이용해서 서버로부터 response 넘어 왔을때 그 데이터를 콘솔창으로 출력
    this.addCustomer().then((response) => {
      console.log(response.data);

      // 서버로부터 고객 데이터를 추가한 이후에 고객 목록을 불러오도록 이 자리에 추가
      this.props.stateRefresh();
    });

    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
    // window.location.reload();
  };

  // file 업로드
  handleFileChange = (e) => {
    this.setState({
      // e.target은 이벤트가 발생한 그 input값 자체를 의미
      // e.target.files[0], -> 파일값에서 첫번째 값
      // 파일을 하나씩 올리도록 설정하는 것
      file: e.target.files[0],

      // 사용자가 입력한 값으로 파일 이름을 넣을 수 있도록 함
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState); // 갱신하는 부분
  };

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);

    // 파일이 포함되어있는 데이터를 서버로 전송하고자 할 때에는 웹 표준에 맞는 헤더를 추가해 주어야 함
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    // axios에 포함되어 있는 post라이브러리를 이용하여 해당 url에 formData를 해당 환경 설정에 맞게 헤더를 붙여서
    // 서버에 데이터를 보낼 수 있도록 해줌
    return post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        {/* 
          실제로 값이 들어갈 때에는 name속성에 있는 file값을 기준으로 해서 들어감
          name속성에 file이라는 변수 값을 이용해서 해당 프로필 이미지에 해당하는 파일 값을 받아올 수 있음
        */}
        프로필 이미지:
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
          accept="image/*"
        />
        <br />
        이름 :
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일:
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별:
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업:
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;
