import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";

// Material-ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";

// CSS
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3, //윗쪽 여백을 3의 가중치 만큼
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

// 아래를 지우는 이유는 서버에서 데이터를 받아와서 출력을 할 것이기 때문에 더이상 필요가 없음

// const customers = [
//   {
//     id: 1,
//     image: "https://placeimg.com/64/64/1",
//     name: "이종찬",
//     birthday: "960000",
//     gender: "남자",
//     job: "취준생",
//   },
//   {
//     id: 2,
//     image: "https://placeimg.com/64/64/2",
//     name: "김영진",
//     birthday: "950000",
//     gender: "남자",
//     job: "맘스터치 지점장",
//   },
//   {
//     id: 3,
//     image: "https://placeimg.com/64/64/3",
//     name: "공태현",
//     birthday: "950000",
//     gender: "남자",
//     job: "프로그래머",
//   },
// ];

/*
  component 라이프 사이클
  1) constructor()
    - constructor를 불러오고
  2) componentWillMount()
    - component가 마운트 되기 전에 componentWillMount함수가 불러와 지고
  3) render()
    - 실제로 component를 화면에 그리고
  4) componentDidMount()
    - 그 이후에 componentDidMount함수가 불러와짐

  그리고
  props or state가 변경되는 경우 shouldComponentUpdate()함수 등이 사용이 되어서
  실질적으로 다시 render함수를 불러와서 뷰를 갱신해주게 됨
*/

class App extends Component {
  // state는 변경될 수 있는 데이터를 처리할 때 사용
  state = {
    customers: "",
  };

  // api서버에 접근을 해서 데이터를 받아오는 등의 작업은 componentDidMount에서 해줄 수 있음
  // 모든 component가 실제로 마운트가 완료가 되었을때 작동
  componentDidMount() {
    // 고객 데이터를 받아오고
    this.callApi()
      // 그것을 받아서 setState의 customers 변수에 넣음
      .then((res) => this.setState({ customers: res }))
      // 오류 문구
      .catch((err) => console.log(err));
  }

  // 비동기적으로 수행할 수 있도록 해주는 함수 부분
  callApi = async () => {
    // 아래 경로로 접속을 해서 그 데이터들을 body에 저장을 함
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  render() {
    // props는 변경될 수 없는 그런 데이터를 명시 할때 사용
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        {/* <Customer
          id={customers[0].id}
          image={customers[0].image}
          name={customers[0].name}
          birthday={customers[0].birthday}
          gender={customers[0].gender}
          job={customers[0].job}
        />
        <Customer
          id={customers[1].id}
          image={customers[1].image}
          name={customers[1].name}
          birthday={customers[1].birthday}
          gender={customers[1].gender}
          job={customers[1].job}
        />
        <Customer
          id={customers[2].id}
          image={customers[2].image}
          name={customers[2].name}
          birthday={customers[2].birthday}
          gender={customers[2].gender}
          job={customers[2].job}
        /> */}

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // 위에 처럼 코드를 작성 할 경우 데이터가 늘어남에 따라 용량이 커지기 떄문에 반복함수를 사용하여 아래처럼 표현함.
              // JavaScript에서는 map이라는 함수로 반복시킬 수 있음.
              // map 함수를 사용할때에는 key 값이 있어야 함.
              // 위에서 state안에 값들을 비동기적으로 가져 왔기 때문에 처음에는 값이 비어져 있기 때문에 오류가 발생함
              // 따라서 조건을 주어서 데이터 값이 존재 할 경우에만 출력 될 수 있도록 해줌
              this.state.customers ? (
                this.state.customers.map((c) => {
                  return (
                    <Customer
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
