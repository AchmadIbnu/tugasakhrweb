//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, PureComponent, useRef	} from 'react';
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

//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style
//  Region Import Constants

function Dataterkini() {
//  react Hooks (useEffect, etc)
const dateFormat = 'DD/MM/YYYY';
const dateFormat2 = 'MM/YYYY';
const timeFormat = 'HH.mm.ss';
const [data, setData]=useState([])
const [kWhPengurang, setPengurang]=useState([])
const [datakwh, setDatakwh]=useState([])
const [dataHistory, setDataHistory]=useState([])
const [dataUpdate, setDataUpdate]=useState([])
const [kwhterkini]=useState([])
const [kwhpengurang]=useState([])
const [time, setTime] = useState(moment())
const [isOn, setValue] = useState(false)
const [HasilSisa, setDatasisa]=useState([])
// const HasilSisa = datakwh - kWhPengurang;

const [dataListrik, setDataListrik] = useState([])
const [monthListrik, setMonthListrik] = useState('')

const [title, setTitle] = useState('');

const handleOnChange = (e) => {
	setTitle(e.target.value);
};

const createTodo = () => {
	console.log(title)
	realtime
	.ref(`SisakWh`)
	.set(parseInt(title))
	setTitle("");

	realtime
	.ref(`Reset`)
	.set(1)

	setTimeout(() => {  
		realtime
		.ref(`Reset`)
		.set(0)
	}, 2000);
};
const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

const onChangeMonthListrik = (date, dateString) => {
	setMonthListrik(`${dateString}`)
}

useEffect(() => {
	realtime.ref('DataTerkini').on('value', snapshot => {
		setData(snapshot.val())
		setValue(true)

	})
	realtime.ref('DataLog').on('value', snapshot => {
		let _filterLog = snapshot.val().filter((i)=>
			i.tanggal.includes(monthListrik))
		setDataListrik(_filterLog)

	})
	
	realtime.ref('SisakWh').on('value', snapshot => {
		var SisakWh =snapshot.val();
		realtime.ref('kWhPengurang').on('value', snapshot => {
			var kWhPengurang = snapshot.val()
			realtime
			.ref(`Hasilsisa`)
			.set(SisakWh - kWhPengurang)
		})
		// console.log(snapshot.val())
	})

	realtime.ref('Hasilsisa').on('value', snapshot => {
		setDatasisa(snapshot.val())

		// console.log(snapshot.val())
	})
	setInterval(()=>{
		loadTime()
	}, 1000)


}, [monthListrik])

//  Function declaration (handle, onchange, etc)

return (
	<>
	<Row>
	<Col xs={{ span: 12 }} lg={{ span: 12 }}>
	<p style={{ fontSize: '2vw', wordWrap:'break-word', fontWeight: 'bold' }}>
	<img src={imgTerkini} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	Pemantauan Energi
	<span style={{fontStyle: 'italic'}}> Realtime</span>
	</p>
	</Col>
	<Col lg={{ span: 6, offset: 4}}>
	</Col>
	</Row>
	<Row gutter={[16, 20]}>
	<Col xs={24} sm={24} md={24} lg={8}>
	<Row style={{ marginBottom: 0 }}>
	<Card bordered={false} style={{ minWidth: '100%', minHeight: '50%'  }}>
{/* <form> */}
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Masukkan kWh terkini:</Typography.Title>
<input type="text" onChange={handleOnChange} value={title} id="title"/>
<button onClick={createTodo} disabled={!title}>Perbaharui</button>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Pulsa Listrik Tersisa : {parseFloat(HasilSisa)} kWh</Typography.Title>
<p style={{ fontSize: 14, wordWrap:'break-word', marginTop : 0, marginBottom : 1}}>
*) Perbaharui saat mengisi token listrik
</p>
{/* </form> */}
</Card>
<Card bordered={true} style={{ minWidth: '100%', minHeight: '50%' }}>
<Typography.Title style={{marginTop : 0, marginBottom : 5}} level={5}>Pemantauan Terkini</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Energi Terpakai : {parseFloat(data.kwh).toFixed(2)} kWh</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Konversi : Rp. {parseFloat(data.rp).toLocaleString("en-US",{maximumFractionDigits:0})} ,- </Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Tegangan        : {parseFloat(data.v).toFixed(2)} VAC</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Arus            : {parseFloat(data.i).toFixed(2)} A</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Daya            : {parseFloat(data.p).toFixed(2)} Watt</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Power Faktor    : {data.pf}</Typography.Title>
<Typography.Title style={{marginTop : 0, marginBottom : 3}} level={5}>Frekuensi       : {parseFloat(data.fq).toFixed(2)} Hz</Typography.Title>
</Card>
</Row>
</Col>
<Col lg={16} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24  }} md={{ order: 2 }}>
<Card  bordered={false} style={{ minWidth: '100%' }}>
<Typography.Title level={5}>GRAFIK PENGGUNAAN LISTRIK HARIAN
<DatePicker style={{float:'right'}} picker='month' onChange={onChangeMonthListrik} format={dateFormat2}/>
</Typography.Title>
<ResponsiveContainer width="100%" height={350}>
<LineChart
data={dataListrik}
margin={{
	top: 20,
	right: 45,
	left: 0,
	bottom: 15
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="tanggal"  dy={1}>
<Label value='Tanggal' offset={2} position='bottom'  dy={20}/>
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
	dataKey="nilai"
	stroke="#8884d8"
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

export default Dataterkini