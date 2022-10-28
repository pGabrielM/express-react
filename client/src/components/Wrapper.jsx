import { useState } from "react";
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import styles from './Wrapper.module.css'

import io from "socket.io-client";
import { useEffect } from "react";
const socket = io.connect("http://localhost:3000")

export function Wrapper() {
  const sendMessage = () => {
    socket.emit("send_message", {message: "Hello"})
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message)
    });
  })
  
  const [data, setData] = useState([]);

  const handleClick = async (link) => {
    const {data} = await axios.get("http://localhost:3000" + link);
    setData(data)
  }

  return (
    <div>
      <section>
        <Button variant="dark" onClick={sendMessage}>Test Websocket</Button>
        <Button variant="dark" onClick={() => handleClick('/usersA')}>Letra A</Button>
        <Button variant="dark" onClick={() => handleClick('/usersB')}>Letra B</Button>
        <Button variant="dark" onClick={() => handleClick('/usersC')}>Letra C</Button>
      </section>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody hover="true">
            {data.map((user, i) => (
              <tr key={i}>
                <td>{data[i].first_name}</td>
                <td>{data[i].last_name}</td>
                <td>{data[i].email}</td>
                <td>{data[i].company}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Container>
    </div>
  );
}