//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, usePrevious } from 'react';
import { 
	Col, 
	Row, 
	Typography, 
	Card, 
	Table, 
	DatePicker, 
	TimePicker, 
	Button, 
	Tag } from 'antd';
	import moment from 'moment';
	import imgHistori from '../assets/historihitam.svg';
	import { realtime } from '../firebase'
	import {
		FieldTimeOutlined,
		CalendarOutlined
	} from '@ant-design/icons';
//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style

//  Region Import Constants
const columns = [
{
	title:  'Kode',
	dataIndex: 'kode',
	width: 65,
	sorter: {
		compare: (a, b) => a.kode - b.kode,
		multiple: 3,
	},
},
{
	title: 'Tanggal',
	dataIndex: 'tanggal',
	width: 110,
},
{
	title: 'Jam',
	dataIndex: 'jam',
	width: 70,
	sorter: {
		compare: (a, b) => a.jam - b.jam,
		multiple: 2,
	},
},
{
	title: 'Jenis Alarm',
	dataIndex: 'jenis',
	width: 150,
},
];

const columns2 = [
{
	title: 'Tanggal',
	dataIndex: 'tanggal',
	width: 150,
},
{
	title: 'kWh',
	dataIndex: 'nilai',
	width: 70,
	sorter: {
		compare: (a, b) => a.nilai - b.nilai,
		multiple: 2,
	},
},
{
	title: 'Rupiah',
	dataIndex: 'rupiah',
	width: 150,
	render: (text, record, index) => parseFloat(record.nilai * 1444.7).toLocaleString()
},
];

function Histori() {

//  react Hooks (useEffect, etc)
const [dataListrik, setDataListrik] = useState([])
const [dataAlarm, setDataAlarm] = useState([])
const [monthListrik, setMonthListrik] = useState('')
const [monthAlarm, setMonthAlarm] = useState('')
const [totalKwh, setTotalKwh] = useState(0)
const [time, setTime] = useState(moment())

// let prevTotalKwh = usePrevious(totalKwh)
const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

const onChangeMonthListrik = (date, dateString) => {
	setMonthListrik(`${dateString}`)
}
const onChangeMonthAlarm = (date, dateString) => {
	setMonthAlarm(`${dateString}`)
	let _filterAlarm = dataAlarm.filter((j)=>
		j.tanggal.includes(monthAlarm))
	setDataAlarm(_filterAlarm)
	// onAlarm()
}

// const onAlarm = useCallback(()=>{
	
// }, [setDataAlarm])

const handleClick = () => {
	let _filterHistory = dataListrik.filter((i)=>
		i.tanggal.includes(monthListrik))
	setDataListrik(_filterHistory)
	onTotalkwh()
}

const onTotalkwh = useCallback(()=>{
	let sumTotalKwh = 0

	for (let key in dataListrik){
		sumTotalKwh += dataListrik[key].nilai
	}
	setTotalKwh(sumTotalKwh)

}, [dataListrik, totalKwh])

useEffect(()=> {
	realtime.ref('DataLog').on('value', snapshot => {
		let _filterHistory = snapshot.val().filter((i)=>
			i.tanggal.includes(monthListrik))
		setDataListrik(_filterHistory)
		onTotalkwh()

		

	})
	realtime.ref('DataAlarm').on('value', snapshot => {
		let _filterAlarm = snapshot.val().filter((j)=>
			j.tanggal.includes(monthAlarm))
		setDataAlarm(_filterAlarm)
	})
	setInterval(()=>{
		loadTime()
	}, 500)


}, [monthListrik, monthAlarm])

console.log(monthListrik)
console.log(totalKwh)

		//  Function declaration (handle, onchange, etc)
		const dateFormat = 'MM/YYYY';
		const dateFormat2 = 'DD/MM/YYYY';
		const timeFormat = 'HH.mm.ss';
		return (
			<>
			
			<Row>
			<Col xs={{ span: 12 }} lg={{ span: 12 }}>
			<p style={{ fontSize: '2vw',fontStyle: 'italic', wordWrap:'break-word', fontWeight: 'bold' }}>
			<img src={imgHistori} style={{maxWidth: '100%', maxHeight: '100%'}}/>
			History Energy & Alarm
			</p>
			</Col>
			<Col lg={{ span: 6, offset: 4}}>
			<Tag color="#55acee" icon={<CalendarOutlined />} style={{fontSize: 17}}>{moment().format(dateFormat2)}</Tag>
			<Tag color="#55acee" icon={<FieldTimeOutlined />} style={{fontSize: 17}}>{time.format(timeFormat)}</Tag>
			</Col>
			</Row>

			<Row gutter={[20, 20]}>
			<Col xs={24} sm={24} md={5} lg={12}>
			<Row style={{ marginBottom: 10 }}>
			<Card bordered={true} style={{ minWidth: '100%' }}>
			<p style={{fontWeight: 'bold',fontSize: 20,}}>
			Riwayat 
			<span style={{fontStyle: 'italic'}}> Alarm</span>
			</p>
			<DatePicker picker='month' onChange={onChangeMonthAlarm} format={dateFormat}/>
			<p style={{float:'right'}}	>Total Data: {dataAlarm.length}</p>
			<Table columns={columns} dataSource={dataAlarm} scroll={{ x: 10, y: 200 }} />
			</Card>
			</Row>
			</Col>
			<Col lg={12} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24  }} md={{ order: 5 }}>
			<Card  bordered={false} style={{ minWidth: '100%' }}>
			<p style={{fontWeight: 'bold',fontSize: 20,}}>
			Riwayat Penggunaan Listrik
			</p>
			<DatePicker picker='month' onChange={onChangeMonthListrik} format={dateFormat}/>
			<Button onClick={handleClick}>Hitung</Button>
			<p style={{float:'right'}}	>Total Data: {dataListrik.length}</p>
			<Table columns={columns2} dataSource={dataListrik} scroll={{ x: 10, y: 200 }} />
			<Typography.Title level={5}>Total kWh : {parseFloat(totalKwh).toFixed(2)} kWh Setara dengan 
			{` Rp. ${parseFloat(totalKwh * 1444.7).toLocaleString()} ,-`}</Typography.Title>
			<p>*)Tidak termasuk PPJ & Biaya Admin Bank (1kWh = Rp.1.444,7)	 
		</p>

		</Card>
		</Col>
		</Row>
		</>
		);
}

export default Histori