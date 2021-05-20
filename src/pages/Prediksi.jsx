//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback } from 'react';
import imgPrediksi from '../assets/prediksihitam.svg';
import { 
	Col, 
	Row, 
	Typography, 
	Card, 
	DatePicker, 
	TimePicker, 
	Button, 
	Tag  } from 'antd';
	import { PoweroffOutlined } from '@ant-design/icons';
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
	import {
		FieldTimeOutlined,
		CalendarOutlined
	} from '@ant-design/icons';
//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style

//  Region Import Constants

function Prediksi() {

//  react Hooks (useEffect, etc)

//  Function declaration (handle, onchange, etc)
const dateFormat = 'DD/MM/YYYY';
const timeFormat = 'HH.mm.ss';
const [time, setTime] = useState(moment())

const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

const handleClick = () => {
	const data = {
		name: "23/05/2021",
		kWh: 99,
		prediksi: 99,

	}
}
useEffect(() => {
	setInterval(()=>{
		loadTime()
	}, 1000)

	// setTimeout(()=>{
	// 	if(prevDataI === data.i){
	// 		setValue(false)
	// 	}
	// 	else if (prevDataI !== data.i){
	// 		setValue(true)
	// 	}
	// }, 2000)



}, [])
const data = [
{
	name: "Senin",
	kWh: 1200,
	prediksi: 2000,
	
},
{
	name: "Selasa",
	kWh: 1800,
	prediksi: 2100,
},
{
	name: "Rabu",
	kWh: 3400,
	prediksi: 2200,
},
{
	name: "Kamis",
	kWh: 3000,
	prediksi: 2300,
},
{
	name: "Jumat",
	kWh: 3000,
	prediksi: 2400,
},
{
	name: "Sabtu",
	kWh: 2000,
	prediksi: 2500,
},
{
	name: "Minggu",
	kWh: 4000,
	prediksi: 2600,
},
];

return (
	<>
	<Row>
	<Col xs={{ span: 12 }} lg={{ span: 12 }}>
	<p style={{ fontSize: '2vw', wordWrap:'break-word', fontWeight: 'bold' }}>
	<img src={imgPrediksi} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	Prediksi
	</p>
	</Col>
	<Col lg={{ span: 6, offset: 4}}>
	<Tag color="#55acee" icon={<CalendarOutlined />} style={{fontSize: 17}}>{moment().format(dateFormat)}</Tag>
	<Tag color="#55acee" icon={<FieldTimeOutlined />} style={{fontSize: 17}}>{time.format(timeFormat)}</Tag>
	</Col>
	</Row>

	<Row gutter={[10, 20]}>
	<Col xs={24} sm={24} md={24} lg={8}>
	<Row style={{ marginBottom: 10 }}>
	<Card bordered={false} style={{ minWidth: '100%' }}>
	<Typography.Title level={5}>Hallo, Saya PESILINTAR, Berdasarkan prediksi menggunakan <span style={{fontStyle: 'italic'}}> ML Regression Linear</span></Typography.Title>
	<Typography.Title level={5}>{`Besar kWh Listrik 30 Hari yang akan datang ialah :` }</Typography.Title>
	<Typography.Title level={5}>{`... ${'kWh'}` }</Typography.Title>
	<Typography.Title level={5}>{`Atau Setara dengan :` }</Typography.Title>
	<Typography.Title level={5}>{`Rp. ..${' ,-'}` }</Typography.Title>
	<Button onClick={handleClick} block>Lakukan Prediksi</Button>
	</Card>
	</Row>
	</Col>
	<Col lg={16} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24  }} md={{ order: 2 }}>
	<Card  bordered={false} style={{ minWidth: '100%' }}>
	<Typography.Title level={5}>GRAFIK PREDIKSI <span style={{fontStyle: 'italic'}}> ML Regression Linear</span></Typography.Title>
	
	<ResponsiveContainer width="99%" height={350}>
	<LineChart
	data={data}
	margin={{
		top: 5,
		right: 45,
		left: 0,
		bottom: 10
	}}
	>
	<CartesianGrid strokeDasharray="3 3" />
	<XAxis dataKey="name"  dy={1}>
	<Label value='Hari' offset={2} position='bottom'  dy={20}/>
	</XAxis>
	<YAxis label={{ 
		value: "Energi Listrik (kWh)", 
		position: "insideLeft", 
		angle: -90,   
		dy: 30}} />
		<Tooltip />
		<Legend />
		<Line
		type="monotone"
		dataKey="kWh"
		stroke="#8884d8"
		activeDot={{ r: 8 }}
		/>
		<Line
		type="monotone"
		dataKey="prediksi"
		stroke="#82ca9d"
		activeDot={{ r: 8 }}
		/>
		</LineChart>
		</ResponsiveContainer>
		</Card>
		</Col>
		</Row>
		</>
		);
}

export default Prediksi

