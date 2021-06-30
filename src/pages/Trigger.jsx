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

let Trig1
let Trig2
let Trig3

const Trigger=()=> {
  const timeFormat = 'HH:mm:ss';
  const timeFormat2 = 'HH:mm';
  const dateFormat = 'DD/MM/YYYY';
  const dateFormat2 = 'DD';
  const dateFormat3 = 'MM';
  let timeBatas;
  const [time, setTime] = useState(moment())

  const loadTime = useCallback(()=>{
    setTime(moment())
  }, [setTime])

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
    // console.log("t1 ", Trig1)
    // console.log("t2 ", Trig2)
    // console.log("t3 ", Trig3)
  })

  let waktuSekarang
  
  useEffect(() => {
    setInterval(()=>{
      clockTime()
    }, 1000)
    setInterval(()=>{
      loadTime()
    }, 10000)

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
          jam : moment().format(timeFormat2),
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
        jam : moment().format(timeFormat2),
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
   let waktuSekarang = moment().format(timeFormat) 

   // console.log("waktuSekarang ", waktuSekarang)
   realtime.ref('lastupdate').on('value', snapshot =>{
    let lastupdate = snapshot.val();
    // console.log("lastupdate", lastupdate)
    waktuSekarang = moment().format(timeFormat) 
    // console.log("waktuSekarang", waktuSekarang)
    // console.log("tanggalSekarang", tanggalSekarang)
    // console.log("bulanSekarang", bulanSekarang)
    realtime.ref('lastupdate2').on('value', snapshot =>{
      dataUpdateTanggal = snapshot.val()
      // console.log("lastupdatetanggal", dataUpdateTanggal);
    })
    realtime.ref('lastupdate3').on('value', snapshot =>{
      dataUpdateBulan = snapshot.val();
      // console.log("lastupdatebulan", dataUpdateBulan);
    }) 
    // if(Trig3 == false && lastupdate < waktuSekarang || dataUpdateTanggal != tanggalSekarang || dataUpdateBulan != bulanSekarang )
    if(Trig3 == false && lastupdate < waktuSekarang)
    // if(lastupdate<= "20:00:00" && Trig3==false)
  { 
    // if(dataUpdateTanggal != tanggalSekarang || dataUpdateBulan != bulanSekarang)
    // {
      realtime
      .ref('DataAlarm2')
      .push({
        jam : moment().format(timeFormat2),
        jenis : "Disconnected",
        kode : 3,
        tanggal : moment().format(dateFormat),
      })
      console.log("Disconnected ", moment().format(timeFormat));
      realtime
      .ref(`Trigger/Trig3`)
      .set(true)
    // }
  }
  else if (Trig3 == true && lastupdate >= waktuSekarang && dataUpdateTanggal == tanggalSekarang && dataUpdateBulan == bulanSekarang)
   // else if (lastupdate >= "20:00:00" && Trig3==true)
 { 
  // if(dataUpdateTanggal == tanggalSekarang && dataUpdateBulan == bulanSekarang)
  // {
    console.log("Reconnected", moment().format(timeFormat));
    realtime
    .ref(`Trigger/Trig3`)
    .set(false)

    realtime
    .ref('DataAlarm2')
    .push({
      jam : moment().format(timeFormat2),
      jenis : "Reconnected",
      kode : 4,
      tanggal : moment().format(dateFormat),
    })
  // }
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