import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import styles from './Wrapper.module.css'
import Swal from 'sweetalert2'

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000")

export function Wrapper() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  socket.on("updateListUsersA", (url, user) => {
    handleClick(url)
    Toast.fire({
      icon: 'info',
      title: `Usuário com a letra ${user} alterado`
    })
  });

  const [data, setData] = useState([]);

  const handleClick = async (link) => {
    const {data} = await axios.get("http://localhost:3000" + link);
    setData(data)
  }

  return (
    <div>
      <section>
        <Button variant="dark" onClick={() => handleClick('/usersA')}>Letra A</Button>
        <Button variant="dark" onClick={() => handleClick('/usersB')}>Letra B</Button>
        <Button variant="dark" onClick={() => handleClick('/usersC')}>Letra C</Button>
      </section>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Empresa</th>
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