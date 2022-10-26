import { useEffect, useState } from "react";
import axios from 'axios'

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
        <button onClick={() => handleClick('/usersA')}>Letra A</button>
        <button onClick={() => handleClick('/usersB')}>Letra B</button>
        <button onClick={() => handleClick('/usersC')}>Letra C</button>
      </section>
      <div className={styles.main}>
        <table>
          <tbody>
          {data.map((user, i) => (
            <tr key={i}>
              <th>{data[i].unidade}</th>
              <th>{data[i].colaborador}</th>
              <th>{data[i].cargo}</th>
              <th>{data[i].matricula}</th>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
    );
}