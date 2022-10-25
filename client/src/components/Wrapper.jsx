import { useEffect, useState } from "react";
import axios from 'axios'

import styles from './Wrapper.module.css'

export function Wrapper() {

  const [usersData, setUsersData] = useState([])

  useEffect((user) => {
    axios
      .get('http://localhost:3000/users')
      .then(res => {
        setUsersData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className={styles.main}>
      <table>
        <tbody>
        {usersData.map((user, i) => (
          <tr key={i}>
            <th>{usersData[i].unidade}</th>
            <th>{usersData[i].colaborador}</th>
            <th>{usersData[i].cargo}</th>
            <th>{usersData[i].matricula}</th>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}