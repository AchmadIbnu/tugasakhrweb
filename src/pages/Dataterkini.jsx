//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, PureComponent, useRef	} from 'react';
import { 
	Col, 
	Row, 
	Typography, 
	Card, 
	DatePicker, 
	TimePicker, 
	Tag  
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
const [dataHistory, setDataHistory]=useState([])
const [time, setTime] = useState(moment())
const [isOn, setValue] = useState(false)
// let prevDataI = usePrevious(data.i)

const loadTime = useCallback(()=>{
	setTime(moment())
}, [setTime])

useEffect(() => {
	realtime.ref('DataTerkini').on('value', snapshot => {
		setData(snapshot.val())
		setValue(true)
      // getKoneksi()
  })

	realtime.ref('DataLog').on('value', snapshot => {
		setDataHistory(snapshot.val())
		console.log(snapshot.val())
      // getKoneksi()
  })
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

//  Function declaration (handle, onchange, etc)
const datagrafik = [
{
	name: "23/05/2021",
	kWh: 1200,
	prediksi: 2200,
	
},
{
	name: "24/05/2021",
	kWh: 1800,
	prediksi: 1000,
},
{
	name: "25/05/2021",
	kWh: 3400,
	prediksi: 2900,
},
{
	name: "26/05/2021",
	kWh: 3000,
	prediksi: 2100,
},
{
	name: "27/05/2021",
	kWh: 3000,
	prediksi: 2400,
},
];


return (
	<>
	<Row>
	<Col xs={{ span: 12 }} lg={{ span: 12 }}>
	<p style={{ fontSize: '2vw', wordWrap:'break-word', fontWeight: 'bold' }}>
	<img src={imgTerkini} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	Pemantauan Energi
	<span style={{fontStyle: 'italic'}}> Realtime   </span>
	<img src={imgKoneksion} style={{maxWidth: '40%', maxHeight: '40%'}}/>
	</p>
	</Col>
	<Col lg={{ span: 6, offset: 4}}>
	<Tag color="#55acee" icon={<CalendarOutlined />} style={{fontSize: 17}}>{moment().format(dateFormat)}</Tag>
	<Tag color="#55acee" icon={<FieldTimeOutlined />} style={{fontSize: 17}}>{time.format(timeFormat)}</Tag>
	</Col>
	</Row>
	
	<Row gutter={[12, 20]}>
	<Col xs={22} sm={22} md={22} lg={10}>
	<Row style={{ marginBottom: 10 }}>
	<Card bordered={false} style={{ minWidth: '100%' }}>
	<form>
	<label>
	<Typography.Title level={5}>Inputkan nilai kWh terkini:</Typography.Title>
	<input type="text" name="name" />
	</label>
	<input type="submit" value="Send" />
	</form>
	<Typography.Title level={5}>{`Sisa kWh : ${'kWh'}` }</Typography.Title>
	<Typography.Title level={5}>Energi Terpakai : {parseFloat(data.kwh).toFixed(2)} kWh</Typography.Title>
	<Typography.Title level={5}>Konversi Rupiah : Rp. {parseFloat(data.rp).toLocaleString()} ,- </Typography.Title>
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