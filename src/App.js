import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "이종찬",
    birthday: "960000",
    gender: "남자",
    job: "취준생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "김영진",
    birthday: "950000",
    gender: "남자",
    job: "맘스터치 지점장",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "공태현",
    birthday: "950000",
    gender: "남자",
    job: "프로그래머",
  },
];

class App extends Component {
  render() {
    return (
      <div>
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
        {
          // 위에 처럼 코드를 작성 할 경우 데이터가 늘어남에 따라 용량이 커지기 떄문에 반복함수를 사용하여 아래처럼 표현함.
          // JavaScript에서는 map이라는 함수로 반복시킬 수 있음.
          // map 함수를 사용할때에는 key 값이 있어야 함.
          customers.map((c) => {
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
        }
      </div>
    );
  }
}

export default App;
