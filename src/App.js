import { useState } from 'react';
import './App.css';
import List from './component/List';

function App() {

  let [value, setvalue] = useState();
  let [id, setid] = useState(0);
  let [tempid, settempid] = useState(0);
  let [arr, setarr] = useState([]);
  let [temparr, settemparr] = useState([]);
  let [bool, setbool] = useState(false);

  const addtask = () => {
    let temp
    if (bool === false) {
      temp = [...arr, { id: id, chekd: false, value: value }];

      setid(id + 1);
      console.log(temp)
    }
    else {
      temp = [...arr]
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === tempid) {
          temp[i].value = value;
          break;
        }
      }
      setbool(false)
    }
    setvalue('')
    setarr(temp);
    settemparr(temp);
  }
  const deletvalue = (id) => {
    let temp = arr.filter((e) => {
      return e.id !== id
    })
    setarr(temp);
    settemparr(temp);
  }
  const change = (id) => {
    let temp = [...arr];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].chekd = !temp[i].chekd
        break;
      }
    }
    setarr(temp);
    settemparr(temp);
  }
  const editvalue = (id) => {
    let temp = arr.filter((e) => {
      return e.id === id
    })
    setvalue(temp[0].value);
    settempid(id);
    setbool(true);
  }
  return (
    <>
      <div className="mai">
        <input type="text" value={value} onChange={(e) => { setvalue(e.target.value) }} />
        <button onClick={addtask}>Add Task</button>
        <br />
        <button onClick={(e) => {
          let temp = arr.filter((ele) => {
            return ele.chekd === true
          })
          settemparr(temp)
        }}> only completed tasks</button>
        <br />
        <button onClick={(e) => {
          let temp = arr.filter((ele) => {
            return ele.chekd === false
          })
          settemparr(temp)
        }}> only uncompleted tasks</button><br />
        <button onClick={(e) => {
          let temp = [...arr];
          settemparr(temp);
        }}>All tasks</button>
      </div>
      <div className="data">
        <table>
          <tbody>
            {
              temparr.map((e, ind) => {
                return (
                  <tr key={ind}>
                    <td>
                      <input type="checkbox" checked={e.chekd} onChange={(e1) => { change(e.id) }} />
                    </td>
                    <td>
                      <span style={{ textDecoration: e.chekd === true ? 'line-through' : 'none' }} className='er' > {e.value}</span>
                    </td>
                    <td>
                      <input type='button' value="Edit" onClick={(e1) => {
                        editvalue(e.id)
                      }} />
                    </td>
                    <td>
                      <input type='button' value="Delete" onClick={(e1) => {
                        deletvalue(e.id)
                      }} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
