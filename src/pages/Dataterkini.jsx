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
import imgKoneksion from '../assets/koneksion.svg';
import imgKoneksioff from '../assets/koneksioff.svg';
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

// function usePrevious(value){
// 	const ref = useRef();
// 	useEffect(()=>{
// 		ref.current = value;
// 	});
// 	return ref.current;
// }

function Dataterkini() {
//  react Hooks (useEffect, etc)
// const classes = useStyles();
const dateFormat = 'DD/MM/YYYY';
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
const HasilSisa = datakwh - kWhPengurang;
// let prevDataI = usePrevious(data.i)
const [title, setTitle] = useState('');

const handleOnChange = (e) => {
	setTitle(e.target.value);
};
// const createTodo = (){...}
const createTodo = () => {
	const todoRef = realtime.database().ref('SisakWh');
	const todo = {
		title,
	};
};


const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

const handleClick = () => {
	realtime.ref('SisakWh').on('value').set(kwhterkini)
	console.log(kwhterkini)
}


// const handleClick = () => {
// 	let _filterHistory = dataListrik.filter((i)=>
// 		i.tanggal.includes(monthListrik))
// 	setDataListrik(_filterHistory)
// 	onTotalkwh()
// }
useEffect(() => {
	realtime.ref('DataTerkini').on('value', snapshot => {
		setData(snapshot.val())
		setValue(true)

	})

	realtime.ref('DataLog').on('value', snapshot => {
		setDataHistory(snapshot.val())
		// console.log(snapshot.val())

	})
	realtime.ref('lastupdate').on('value', snapshot => {
		setDataUpdate(snapshot.val())
		// console.log(snapshot.val())

	})
	realtime.ref('SisakWh').on('value', snapshot => {
		setDatakwh(snapshot.val())
		// console.log(snapshot.val())

	})
	realtime.ref('kWhPengurang').on('value', snapshot => {
		setPengurang(snapshot.val())
		// console.log(snapshot.val())

	})
	setInterval(()=>{
		loadTime()
	}, 1000)


}, [])

//  Function declaration (handle, onchange, etc)

return (
	<>
	<Row>
	<Col xs={{ span: 12 }} lg={{ span: 12 }}>
	<p style={{ fontSize: '2vw', wordWrap:'break-word', fontWeight: 'bold' }}>
	<img src={imgTerkini} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	Pemantauan Energi
	<span style={{fontStyle: 'italic'}}> Realtime</span>
	<img src={imgKoneksioff} style={{marginLeft: 20}}/>
	</p>
	</Col>
	<Col lg={{ span: 6, offset: 4}}>
	<Tag color="#55acee" icon={<CalendarOutlined />} style={{fontSize: 17}}>{moment().format(dateFormat)}</Tag>
	<Tag color="#55acee" icon={<FieldTimeOutlined />} style={{fontSize: 17}}>{time.format(timeFormat)}</Tag>
	</Col>
	</Row>
	<Row gutter={[12, 20]}>
	<Col xs={24} sm={24} md={24} lg={10}>
	<Row style={{ marginBottom: 0 }}>
	<Card bordered={false} style={{ minWidth: '100%' }}>
	<form>
	<Typography.Title level={5}>Inputkan kWh terkini:</Typography.Title>
	<input type="text" onChange={handleOnChange} value={title} />
	<button onClick={createTodo}>Update</button>
	<Typography.Title style={{marginTop : 5}} level={5}>Sisa kWh : {parseFloat(HasilSisa)} kWh</Typography.Title>
	</form>
	</Card>
	<Card bordered={true} style={{ minWidth: '100%' }}>
	<Typography.Title level={5}>Energi Terpakai : {parseFloat(data.kwh).toFixed(2)} kWh</Typography.Title>
	<Typography.Title style={{marginTop : 5}} level={5}>Konversi Rupiah :     Rp. {parseFloat(data.rp).toLocaleString("en-US",{maximumFractionDigits:0})} ,- </Typography.Title>
	</Card>
	</Row>
	<Row >
	<Card  bordered={false} style={{ minWidth: '100%' }}>
	<Typography.Title level={5}>Tegangan        : {parseFloat(data.v).toFixed(2)} VAC</Typography.Title>
	<Typography.Title level={5}>Arus            : {parseFloat(data.i).toFixed(2)} A</Typography.Title>
	<Typography.Title level={5}>Daya            : {parseFloat(data.p).toFixed(2)} Watt</Typography.Title>
	<Typography.Title level={5}>Power Faktor    : {data.pf}</Typography.Title>
	<Typography.Title level={5}>Frekuensi       : {parseFloat(data.fq).toFixed(2)} Hz</Typography.Title>
	</Card>
	</Row>
	</Col>
	<Col lg={14} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24  }} md={{ order: 2 }}>
	<Card  bordered={false} style={{ minWidth: '100%' }}>
	<Typography.Title level={5}>GRAFIK PENGGUNAAN LISTRIK HARIAN</Typography.Title>
	<ResponsiveContainer width="99%" height={300}>
	<LineChart
	data={dataHistory}
	margin={{
		top: 5,
		right: 45,
		left: 0,
		bottom: 14
	}}
	>
	<CartesianGrid strokeDasharray="3 3" />
	<XAxis dataKey="tanggal"  dy={1}>
	<Label value='Hari, Tanggal' offset={2} position='bottom'  dy={20}/>
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