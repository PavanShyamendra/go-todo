import React, { Component  } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "ankit",

    };
   
  }
  
  componentDidMount() {
    this.getTask();
  }

  onChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  onSubmit = () => {
    //alert("The Submit is working")
    console.log("PRINTING task", this.state,"ok");
    const nae = this.state.name
    const jobObj = {
      name: 'nae',
    }
      axios
        .post(
          endpoint + "/jobs",
          jobObj
        )
        .then((res) => {
          console.log("Working")
          console.log(jobObj)
          this.getTask();
          this.setState({
            name : "WinterSoldier",
          });
          console.log(res,"okay");
        }).catch((err) => {
          console.log(err)
        })
   
  };

  getTask = () => {
    console.log("Get Task Function is started 2")
    axios.get(endpoint + "/jobs").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            let color = "yellow";
            let style = {
              wordWrap: "break-word",
            };

            return (
              <Card key={item.id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={style}>{item.name}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => this.updateTask(item.id)}
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTask(item.id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          }),
        });
      } else {
        console.log("in the else statment")
        this.setState({
          items: [],
        });
      }
    });
  };

  updateTask = (id) => {
    axios
      .put(endpoint + "/jobs/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };


  deleteTask = (id) => {
    axios
      .delete(endpoint + "/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.value}
              fluid
              placeholder="Create Task"
            />
            <Input type="submit" value="Submit" />
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;