//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback } from 'react';
import imgPrediksi from '../assets/prediksihitam.svg';
import { Col, Row, Typography, Card, DatePicker, TimePicker, Button  } from 'antd';
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
const handleClick = () => {
	const data = {
		name: "23/05/2021",
		kWh: 99,
		prediksi: 99,

	}
}
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
	<p style={{ fontSize: '2vw', fontWeight: 'bold', wordWrap:'break-word' }}>
	<img src={imgPrediksi} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	Prediksi
	<DatePicker defaultValue={moment()} format={dateFormat}disabled style={{marginLeft: 430}}/>
	<TimePicker defaultValue={moment()} format={timeFormat}disabled />
	</p>
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
	<LineChart
	width={500}
	height={300}
	data={data}
	margin={{
		top: 5,
		right: 30,
		left: 5,
		bottom: 5
	}}
	>
	<CartesianGrid strokeDasharray="3 3" />
	<XAxis dataKey="name"  dy={1}>
	<Label value='Hari' offset={2} position='bottom'  dy={5}/>
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
		</Card>
		</Col>
		</Row>
		</>
		);
}

export default Prediksi

