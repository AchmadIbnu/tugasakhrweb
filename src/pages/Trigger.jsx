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

var isOn = false;
var isOn2 = false;
var isOn3 = false;

const Trigger=()=> {
  const timeFormat = 'HH:mm';
  const dateFormat = 'DD/MM/YYYY';
  const [time, setTime] = useState(moment())
  const loadTime = useCallback(()=>{
    setTime(moment())
    console.log("Jam",time.format(timeFormat))
  }, [setTime])


  

  useEffect(() => {
    var tempkwh;
    var batas;
    console.log("Looping")
    realtime.ref('DataTerkini/kwh').on('value', snapshot => {
      console.log("Pembatas", isOn)
      tempkwh = snapshot.val()

      realtime.ref('BataskWh').on('value', snapshot => {
        batas = snapshot.val()

        if (tempkwh >= batas && isOn == false){
         setTimeout(() => {  
          isOn = true;
          realtime
          .ref(`DataAlarm`)
          .push({
            jam : time.format(timeFormat),
            jenis : "Alarm Overload",
            kode : 2,
            tanggal : moment().format(dateFormat),
          })

        }, 2000);
       }
     })
    })


    realtime.ref('Hasilsisa').on('value', snapshot =>{
      var Hasilsisa = snapshot.val()
      if (Hasilsisa <= 5 && isOn2 == false){
        setTimeout(() => {  
          realtime
          .ref('DataAlarm')
          .push({
           jam : time.format(timeFormat),
           jenis : "Listrik Low",
           kode : 1,
           tanggal : moment().format(dateFormat),
         })
          isOn2 = true;
        }, 2000);
      }
    })

    realtime.ref('lastupdate').on('value', snapshot => {
      var lastupdate = snapshot.val()
      console.log ("last", moment(lastupdate).format(timeFormat))
      if (moment(lastupdate).format(timeFormat) == "08:00"){
        isOn = false; 
        isOn2 = false; 
        isOn3 = false; 
      }
      var WaktuSekarang = localStorage.getItem ("WaktuSekarang")
      if (lastupdate < WaktuSekarang && isOn3==false){
        setTimeout(() => {  
          realtime
          .ref(`DataAlarm`)
          .push({
            jam : time.format(timeFormat),
            jenis : "Disconnected",
            kode : 3,
            tanggal : moment().format(dateFormat),
          })
          isOn3 = true;
        }, 2000);
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