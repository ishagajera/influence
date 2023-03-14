import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'
import { PieChart, Pie, Cell} from 'recharts';
import axios from 'axios';


function App() {

  const [username, setUsername] = useState("")
  const [itemsStatus, setItemsStatus] = useState("")

  const [chartData, setChartData] = useState([]);

   const searchUser = () => {
    chartData.length = 0;


    Axios.post("http://localhost:3001/searchUser", {
      username: username
    }).then((response) => {
      console.log(response.data);
      if(response.data.message) {
        setItemsStatus(response.data.message)
      }
      else{
        setItemsStatus(response.data[0])
      }

      let cat1 = response.data[0].predicted_class_1;
      let prob1 = parseFloat(response.data[0].predicted_score_1);
      let cat2 = response.data[0].predicted_class_2;
      let prob2 = parseFloat(response.data[0].predicted_score_2);
      let cat3 = response.data[0].predicted_class_3;
      let prob3 = parseFloat(response.data[0].predicted_score_3);

      const p1 = [...chartData, {category:cat1, pred_score:prob1, color:"red"}, {category: cat2, pred_score: prob2, color:"green"}, {category:cat3, pred_score:prob3, color:"blue"}];
      setChartData(p1);
  }
)}


  return (
    <div className="App">
      <h1>InFluence</h1>

      <div className="form">
        <input type = "text" id="inpt" name="userName" placeholder="userName" onChange={(e) => {
          setUsername(e.target.value);
        }}></input>
        <button onClick={searchUser}>Submit</button>
      </div>
      <h1>Top 3 categories:</h1>
      <h1>{itemsStatus.predicted_class_1} {itemsStatus.predicted_score_1}%</h1> 
      <h1>{itemsStatus.predicted_class_2} {itemsStatus.predicted_score_2}%</h1>
      <h1>{itemsStatus.predicted_class_3} {itemsStatus.predicted_score_3}%</h1>


      <PieChart width={700} height={700}>
          <Pie data={chartData} dataKey="pred_score" nameKey="category" cx="50%"
         cy="50%" outerRadius={250} fill="green" label="category">
         {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartData[index].color} />
            ))}
            
            </Pie>
      </PieChart>
    </div>
  );
}


export default App;