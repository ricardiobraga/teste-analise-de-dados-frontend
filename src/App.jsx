import React, {useState, useEffect} from 'react';

import './App.css';
import Card from './components/Cards';
import BarChart from './components/BarChart';

import styles from './index.module.css'

import useFetch from './components/useFetch.js';
import Table from './components/Table';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

function App() {
  const url = "https://teste-analise-de-dados-backend.herokuapp.com"
  const {data: dataCards, loading, error} = useFetch(`${url}/cards`); 
  const [graficoData, setGraficoData] = useState([])
  const colorBars= ["#00c864", "#64c800", "#c80064", "#0064c8", "#640064"]; 
  
  
  const [graphicInfo, setGraphicInfo] = useState({    
    labels: "",
    datasets: [{
      label: "",
      data: "",
      backgroundColor: colorBars
    }],
    
    
  })

  useEffect(() => {    
   
    fetch(`${url}/grafico`)
    .then(res => {
      if(!res.ok) {throw res}
      return res.json()
    })    
    .then((data) => {
      
      setGraphicInfo({
        novo: data.map( (item) => item.porcentagem),
        labels: data.map( item => {return `${item.ano}  |  ${item.porcentagem}%  |  ${item.saldo}`}),
        
        datasets: [{
          label: 'Faturamento Anual',

          data: data.map((item) => {return parseFloat(item.saldo.replace(/R\$\s/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}),
          backgroundColor: ["#80e4b2", "#b2e480", "#e480b2", "#80b2e4", "#b280b2"]
        }],       
      })
      setGraficoData(data)
    })  
    .catch( (err) => {
      console.log(err);;
  })
  }, [setGraphicInfo, setGraficoData]) 


  if(loading) return <div className={styles.loading}><HourglassEmptyIcon /><span>loading...</span></div>  
  if(error) console.log(error);  
 
  function Cards() {
    if(dataCards){
      
       return dataCards.map( (item, i) => {
          return(
             <Card key={i} title={item.tag} value={item.valor} />
          ) 
      
      })
    }
    
  }  

  return (
    <>
      <header>
        {Cards()}
      </header>
      <main className={styles.main}>

        
          <div className={styles.indice} >
               <div className={styles.indiceDivs}>
                  <div className={styles.indiceTitle}>INDICE</div>
                  { graficoData.map( (item, i) => {
                    return(                      
                      <div key={i} className={styles.indiceContent} >
                        <div className={styles.indiceColors}>
                          <div style={{ backgroundColor: `${colorBars[i]}`, width: "10px", height: "10px", borderRadius: "50%"}}></div>
                        </div>
                        <div className={styles.indiceYear}>{item.ano} </div> 
                      </div>
                    )                     
                    
                  })}
                 
                  
              </div>            
          </div>

          <div className={styles.grafico}>
            <div className={styles.graficoTitle}>FATURAMENTO POR ANO</div>
            <BarChart className={styles.graficoCanvas}  charData={graphicInfo} title="teste" />
          </div>

        


      </main>
          <Table className={styles.table} />
    </>
  );
}

export default App;
