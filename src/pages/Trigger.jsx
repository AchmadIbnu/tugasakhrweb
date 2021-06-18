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


function Trigger() {
  const timeFormat = 'HH:mm';
  const dateFormat = 'DD/MM/YYYY';
  const [time, setTime] = useState(moment())
  const [isOn, setTrigger] = useState(false)
  const [isOn2, setTrigger2] = useState(false)
  const [isOn3, setTrigger3] = useState(false)
  useEffect(() => {

   realtime.ref('DataTerkini/kwh').on('value', snapshot => {
     var tempkwh = snapshot.val()
     realtime.ref('BataskWh').on('value', snapshot => {
       var batas = snapshot.val()
       if (tempkwh >= batas && isOn == false){
        realtime
        .ref(`DataAlarm`)
        .push({
          jam : time.format(timeFormat),
          jenis : "Alarm Overload",
          kode : 2,
          tanggal : moment().format(dateFormat),
        })
        setTrigger (true)
      }
    })
   })

   realtime.ref('Hasilsisa').on('value', snapshot =>{
    var Hasilsisa = snapshot.val()
    if (Hasilsisa <= 5 && isOn2 == false){
      realtime
      .ref('DataAlarm')
      .push({
       jam : time.format(timeFormat),
       jenis : "Listrik Low",
       kode : 1,
       tanggal : moment().format(dateFormat),
     })
      setTrigger2 (true)
    }
  })

   realtime.ref('lastupdate').on('value', snapshot => {
    var lastupdate = snapshot.val()
    var WaktuSekarang = localStorage.getItem ("WaktuSekarang")
    if (lastupdate < WaktuSekarang && isOn3==false){
      realtime
      .ref(`DataAlarm`)
      .push({
        jam : time.format(timeFormat),
        jenis : "Disconnected",
        kode : 3,
        tanggal : moment().format(dateFormat),
      })
      setTrigger3 (true)
    }
  })

 })

  return (
    <>
    <h1>
    TRIGGER ON
    </h1>
    </>
    );

}

export default Trigger