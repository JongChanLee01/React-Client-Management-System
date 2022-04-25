import React from "react";

class CustomerDelete extends React.Component {
  // 고객의 id가 매개변수로 들어왔을때 삭제를 진행 하도록 함
  deleteCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    // 삭제가 된 이후에 고객 목록을 새로 갱신해서 보여줌
    this.props.stateRefresh();
  }

  render() {
    return (
        <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
    );
  }
}

export default CustomerDelete;