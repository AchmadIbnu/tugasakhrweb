//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, PureComponent, useRef } from 'react';
import { 
  Col, 
  Row, 
  Typography, 
  Card, 
  DatePicker, 
  TimePicker, 
  Tag,
  Button  
} from 'antd';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";
import imgTerkini from '../assets/dataterkinihitam.svg';
import { realtime } from '../firebase'
import {
  FieldTimeOutlined,
  CalendarOutlined
} from '@ant-design/icons';

let Trig1 ;
let Trig2 ;
let Trig3 ;

const Trigger=()=> {
  const timeFormat = 'HH:mm:ss';
  const dateFormat = 'DD/MM/YYYY';
  const dateFormat2 = 'DD';
  const dateFormat3 = 'MM';
  let timeBatas;

  const clockTime=useCallback(()=>{
    timeBatas = moment().format(timeFormat);
    // console.log("Waktu Sekarang:",timeBatas);
    // console.log(Trig1);
    if(timeBatas == "08:00:00"){
      realtime
      .ref(`Trigger/Trig1`)
      .set(false)
      realtime
      .ref(`Trigger/Trig2`)
      .set(false)
      realtime
      .ref(`Trigger/Trig3`)
      .set(false)
    }
  })

  
  useEffect(() => {
    setInterval(()=>{
      clockTime();
    }, 1000)

    realtime.ref('Trigger/Trig1').on('value', snapshot =>{
      Trig1 = snapshot.val();
      // console.log("Trig1",Trig1);     
    }) 
    realtime.ref('Trigger/Trig2').on('value', snapshot =>{
      Trig2 = snapshot.val();
      // console.log("Trig2",Trig2);     
    }) 
    realtime.ref('Trigger/Trig3').on('value', snapshot =>{
      Trig3 = snapshot.val();
      // console.log("Trig3",Trig3);     
    }) 
    
    //Listrik Low
    realtime.ref('Hasilsisa').on('value', snapshot =>{
      let hasilsisa = snapshot.val();
      // console.log("Hasilsisa", hasilsisa)
      if(hasilsisa<= 5 && Trig1==false)
       {  realtime
        .ref('DataAlarm')
        .push({
          jam : moment().format(timeFormat),
          jenis : "Listrik Low",
          kode : 1,
          tanggal : moment().format(dateFormat),
        })
        console.log("Alarm Listrik Low ", moment().format(timeFormat));
        realtime
        .ref(`Trigger/Trig1`)
        .set(true)
      }
    })

   //Overload
   let bataskwh;
   realtime.ref('BataskWh').on('value', snapshot =>{
     bataskwh = snapshot.val();
     //console.log("BataskWh",bataskwh);     
   })           
   realtime.ref('DataTerkini/kwh').on('value', snapshot =>{
    let tempkwh = snapshot.val();
    // console.log("DataTerkini/kwh", tempkwh)
    if(tempkwh>= bataskwh && Trig2==false)
     {  realtime
      .ref('DataAlarm')
      .push({
        jam : moment().format(timeFormat),
        jenis : "Alarm Overload",
        kode : 2,
        tanggal : moment().format(dateFormat),
      })
      console.log("Alarm Overload ", moment().format(timeFormat));
      realtime
      .ref(`Trigger/Trig2`)
      .set(true) 
    }
  })



   //Disconnect
   let dataUpdateTanggal;
   let dataUpdateBulan;
   let tanggalSekarang = moment().format(dateFormat2);
   let bulanSekarang = moment().format(dateFormat3);
   let lastupdate;
   let waktuSekarang;

   realtime.ref('lastupdate').on('value', snapshot =>{
    let lastupdate = snapshot.val();
    let waktuSekarang = moment().subtract(10, 'second').format(timeFormat);
    realtime.ref('lastupdate2').on('value', snapshot =>{
      dataUpdateTanggal = snapshot.val();
            // console.log("lastupdatetanggal", dataUpdateTanggal);
          })
    realtime.ref('lastupdate3').on('value', snapshot =>{
      dataUpdateBulan = snapshot.val();
            // console.log("lastupdatebulan", dataUpdateBulan);
          })
    
    if(lastupdate < waktuSekarang || 
      dataUpdateTanggal != tanggalSekarang ||
      dataUpdateBulan != bulanSekarang &&
      Trig3==false)
    // if(lastupdate<= "20:00:00" && Trig3==false)
  { 
    realtime
    .ref('DataAlarm')
    .push({
      jam : moment().format(timeFormat),
      jenis : "Disconnected",
      kode : 3,
      tanggal : moment().format(dateFormat),
    })
    console.log("Disconnected ", moment().format(timeFormat));
    realtime
    .ref(`Trigger/Trig3`)
    .set(true)
  }
  else if (lastupdate > waktuSekarang && 
    dataUpdateTanggal == tanggalSekarang &&
    dataUpdateBulan == bulanSekarang &&
    Trig3==true)
   // else if (lastupdate >= "20:00:00" && Trig3==true)
 {
  console.log("Reconnected", moment().format(timeFormat));
  realtime
  .ref(`Trigger/Trig3`)
  .set(false)
}
})

 })


  return (
    <>
    ---
    ###
    </>
    );

}

export default Trigger