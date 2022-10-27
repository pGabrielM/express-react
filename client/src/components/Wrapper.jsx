import { useEffect, useState } from "react";
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import styles from './Wrapper.module.css'

export function Wrapper() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async (link) => {
    setIsLoading(true);
    try {
      const {data} = await axios.get("http://localhost:3000" + link, {
        headers: {
          Accept: 'application/json',
        },
      });
      
      setData(data)
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section>
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
    </>
  );
}