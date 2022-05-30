import React, {useState, useEffect} from 'react';
import styles from './Table.module.css'

export default function Table(props){
    const [tabelaInfo, setTabelaInfo] = useState([])

    const colorBars= ["#00c864", "#64c800", "#c80064", "#0064c8", "#640064"]; 

    const url = "https://teste-analise-de-dados-backend.herokuapp.com"

    useEffect(() => {    
   
        fetch(`${url}/tabela`)
        .then(res => {
          if(!res.ok) {throw res}
          return res.json()
        })    
        .then((data) => {
         setTabelaInfo(data);   
        })
        .catch( (err) => {
            console.log(err);;
        })
      }, [setTabelaInfo])


    return(
        <table className={styles.table}>
            <thead>
                <tr>      
                    <th>ANO</th>
                    <th>COMPRAS</th>
                    <th>VENDAS</th>
                    <th>ICMS PAGO</th>
                    <th>ST PAGO</th>
                    <th>{""}</th>
                </tr>
            </thead>
            <tbody>
                    {
                        tabelaInfo.map( (item, i) => {
                            return(
                                <tr key={i}>
                                    <td><div className={styles.tableYear}>
                                            <div style={{backgroundColor: `${colorBars[i]}`, width: "10px", height: "10px", borderRadius: "50%"}}></div>
                                            <div>{item.ano}</div>
                                            </div>
                                        </td>
                                    <td>{item.compras}</td>
                                    <td>{item.vendas}</td>
                                    <td>{item.ICMS}</td>
                                    <td>{item.ST}</td>
                                </tr>
                            
                            )
                        })
                    } 
            </tbody>
               

   
</table>
    )
}