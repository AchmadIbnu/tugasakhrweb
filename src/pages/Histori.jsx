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
	title: <span style={{fontStyle: 'bold'}}> 'No'</span>,
	dataIndex: 'no',
	width: 65,
	sorter: {
		compare: (a, b) => a.no - b.no,
		multiple: 3,
	},
},
{
	title: 'Tanggal',
	dataIndex: 'tanggal',
	width: 110,
	sorter: {
		compare: (a, b) => a.tanggal - b.tanggal,
		multiple: 3,
	},
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
	dataIndex: 'jenisalarm',
	width: 150,
},
];

const dataalarm = [
{
	no: '1',
	tanggal : '09/05/2021',
	jam : '09.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '2',
	tanggal : '11/05/2021',
	jam : '23.00',
	jenisalarm :'Listrik Low'
},
{
	no: '3',
	tanggal : '10/05/2021',
	jam : '11.00',
	jenisalarm :'Prediksi'
},
{
	no: '4',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '5',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '6',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '7',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '8',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '9',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '10',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '11',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
{
	no: '12',
	tanggal : '12/05/2021',
	jam : '08.00',
	jenisalarm :'Alarm Overload'
},
];

const columns2 = [
{
	title: 'Tanggal',
	dataIndex: 'tanggal',
	width: 150,
	sorter: {
		compare: (a, b) => a.tanggal - b.tanggal,
		multiple: 3,
	},
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
const [monthListrik, setMonthListrik] = useState('')
const [totalKwh, setTotalKwh] = useState(0)
const [time, setTime] = useState(moment())

// let prevTotalKwh = usePrevious(totalKwh)
const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

const onChangeMonthListrik = (date, dateString) => {
	setMonthListrik(`${dateString}`)
}

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

		setInterval(()=>{
			loadTime()
		}, 1000)

	})




}, [monthListrik])

console.log(monthListrik)
console.log(totalKwh)

		//  Function declaration (handle, onchange, etc)
		const dateFormat = 'MM/YYYY';
		const timeFormat = 'HH.mm.ss';
		return (
			<>
			
			<Row>
			<Col xs={{ span: 12 }} lg={{ span: 12 }}>
			<p style={{ fontSize: '2vw',fontStyle: 'italic', wordWrap:'break-word', fontWeight: 'bold' }}>
			<img src={imgHistori} style={{maxWidth: '100%', maxHeight: '100%'}}/>
			History & Alarm
			</p>
			</Col>
			<Col lg={{ span: 6, offset: 4}}>
			<Tag color="#55acee" icon={<CalendarOutlined />} style={{fontSize: 17}}>{moment().format(dateFormat)}</Tag>
			<Tag color="#55acee" icon={<FieldTimeOutlined />} style={{fontSize: 17}}>{time.format(timeFormat)}</Tag>
			</Col>
			</Row>

			<Row gutter={[20, 20]}>
			<Col xs={24} sm={24} md={5} lg={12}>
			<Row style={{ marginBottom: 10 }}>
			<Card bordered={true} style={{ minWidth: '100%' }}>
			<p style={{fontWeight: 'bold',fontStyle: 'italic',fontSize: 20,}}>
			Alarm
			</p>
			<DatePicker picker='month'/>
			<Table columns={columns} dataSource={dataalarm} scroll={{ x: 10, y: 200 }} />
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
			<p>{totalKwh}</p>
			<p>{`Rp. ${parseFloat(totalKwh * 1444.7).toLocaleString()} ,-`}</p>

			</Card>
			</Col>
			</Row>
			</>
			);
	}

	export default Histori