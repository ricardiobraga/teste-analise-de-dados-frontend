import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto'


const BarChart = (props) => {
    return (
    
            <Bar
                data={props.charData}

                options= {{
                    
                    scales: {
                        x: {
                            ticks: {
                                display:false
                               
                            },
                            grid:{
                                display: false,
                                borderWidth: 0
                                
                            }
                        }, 
                       y: {
                           ticks: {
                               display:false
                           },
                           grid:{
                               display: false,
                               borderWidth: 0
                           }
                       } 
                    },
                  plugins: {
                      
                      legend: {
                        display: false,
                       
                                               
                      },
                      tooltip: {
                          
                          callbacks:{
                           
                            label: function(context) {
                               
                                return context.dataset.labels;
                            }
                           
                          },
                          
                          titleAlign: 'center',                                                   
                          displayColors: false,
                          width: 200,
                        
                      },
                      
                      
                  },
                  
                }
            }
         
                       
            />
        
    )
}

export default BarChart