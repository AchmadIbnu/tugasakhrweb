//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { css } from "@emotion/react";
import imgPrediksi from '../assets/prediksihitam.svg'
import imgBg from '../assets/background.png';
import {
	Col,
	Row,
	Typography,
	Card,
	DatePicker,
	TimePicker,
	Button,
	Spin,
	Space,
	DonloadOutlined,
	Tag,
	Modal,
	Image
} from 'antd';
import { PoweroffOutlined } from '@ant-design/icons'
import moment from 'moment'
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
	CloseCircleFilled,
	CalendarOutlined,
	createFromIconfontCN
} from '@ant-design/icons';
import { realtime } from '../firebase'
//  Region Import Utility/Helper Function
//  Region Import Components
//  Region Import Assets
//  Region Import Style
//  Region Import Constants
var hasilprediksi = 0, ratarata = 0, ratarata2 = 0, konversirupiah = 0;
var isOn = false;
const data = [0];

function Prediksi() {
	//  Function declaration (handle, onchange, etc)
	const dateFormat = 'DD/MM/YYYY';
	const timeFormat = 'HH.mm.ss';
	const [time, setTime] = useState(moment())
	const [disable, setDisable] = React.useState(false);
	const [datagambar, setDataGambar] = useState([])
	const [dataprediksi, setData] = useState([])
	const [dataMeteran, setDataMeteran] = useState([])
	const [dataRupiah, setRupiah] = useState([])
	const [showAlert, setShowAlert] = useState(true)
	const [isModalVisible, setIsModalVisible] = useState(true)
	let [loading, setLoading] = useState(false);
	let [color, setColor] = useState("#ffffff");

	const IconFont = createFromIconfontCN({
		scriptUrl: [
			'//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
		],
	});

	const loadTime = useCallback(() => {
		setTime(moment())
	}, [setTime])
	const batalPrediksi = () => {
		window.location.href = "http://localhost:3000";
	};
	const handleClick = () => {
		setLoading(true);
		realtime
			.ref(`Prediksi/tombol`)
			.set(2)
		setDisable(true)
		realtime
			.ref('Prediksi/selesai')
			.on('value', snapshot => {
				let selesai = snapshot.val()
				console.log(selesai)
				if (selesai == true) {
					setIsModalVisible(false)
					// setShowAlert(false)
					// setLoading(false)
					realtime
						.ref(`Prediksi/selesai`)
						.set(false)
				}
			})
		realtime
			.ref('Prediksi/TotalkWhPrediksi')
			.on('value', snapshot => {
				hasilprediksi = snapshot.val()
				ratarata = parseFloat(hasilprediksi / 30).toFixed(2);
				ratarata2 = parseFloat(ratarata).toFixed(2);
				konversirupiah = hasilprediksi * 1444.7;
				setRupiah(konversirupiah)
			})
		realtime
			.ref('Prediksi')
			.on('value', snapshot => {
				setData(snapshot.val())
				// setValue(true)
			})
		realtime
			.ref('DatakwhMeteran')
			.on('value', snapshot => {
				setDataMeteran(snapshot.val())
				// setValue(true)
			})
		realtime
			.ref('Prediksi/datagambar')
			.on('value', snapshot => {
				setDataGambar(snapshot.val())
				console.log('datagambar:', datagambar)
			})

	};

	useEffect(() => {
		setInterval(() => {
			loadTime()
		}, 1000)
	}, [])


	return (
		<>
			<Modal title=""
				visible={isModalVisible}
				bodyStyle={{ backgroundColor: '#FFFF', padding : 30}}
				footer={null}
				onOk={() => {
					handleClick();
				}}
				onCancel={() => {
					batalPrediksi()
				}}
				width={1000}
			>
				<Card hoverable cover={<img alt="" src={imgBg} />} style={{ textAlign: 'center' }} >
					{(loading === false) ?
						<><h1 style={{ fontSize: '2vw', wordWrap: 'break-word', fontWeight: 'bold' }}>
							Butuh beberapa saat untuk melakukan prediksi, tekan tombol untuk memulai prediksi
						</h1>
							<Button icon={<IconFont type="icon-python"/>} align="middle" type="primary" shape="round" size="large" onClick={() => {
								handleClick();
							}}>PREDIKSI
							</Button>
						</> : <>
							<Space size="middle"><Spin size="large" />
							</Space>
							<h2 style={{ fontSize: '1.5vw', wordWrap: 'break-word', fontWeight: 'bold' }}>
								Mohon tunggu, sedang diproses
							</h2>
						</>
					}
				</Card>
			</Modal>
		
			<Row>
				<Col xs={{ span: 12 }} lg={{ span: 12 }}>
					<p style={{ fontSize: '2vw', wordWrap: 'break-word', fontWeight: 'bold' }}>
						<img src={imgPrediksi} style={{ maxWidth: '100%', maxHeight: '100%' }} />
						Prediksi
					</p>
				</Col>
				<Col lg={{ span: 12, offset: 4 }}>
				</Col>
			</Row>

			<Row gutter={[30, 10]}>
				<Col xs={24} sm={24} md={24} lg={12}>
					<Row style={{ marginBottom: 8 }}>
						<Card bordered={false} style={{ minWidth: '100%' }}>
							<Typography.Title style={{ marginTop: 0, marginBottom: 2 }} level={5}>Hallo! Saya PESILINTAR, Berdasarkan prediksi menggunakan
								<span style={{ fontStyle: 'italic' }}> Machine Learning Simple Regression Linear. </span> Berikut prediksi penggunaan listrik di rumahmu.
							</Typography.Title>
							<Typography.Title style={{ marginTop: 10, marginBottom: 9 }} level={5}>Slope / Koefisien = {dataprediksi.slope}
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>Intercept / Konstanta ={dataprediksi.intercept}
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>y = {dataprediksi.slope} * x +{dataprediksi.intercept}
							</Typography.Title>
							<Typography.Title style={{ marginTop: 10, marginBottom: 4 }} level={5}>Kesimpulan:
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>1. Besar kWh listrik 30 hari yang akan datang ialah
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>{dataprediksi.TotalkWhPrediksi} kWh / Rp.
								{parseFloat(dataRupiah).toLocaleString("en-US", { maximumFractionDigits: 0 })} ,-
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>2. Rata-rata pemakaian {dataprediksi.BataskWhharian} kWh/hari
							</Typography.Title>
							<Typography.Title style={{ marginTop: 0, marginBottom: 9 }} level={5}>3. Listrikmu sekarang {dataMeteran.Hasilsisa} kWh akan habis dalam {dataprediksi.waktuhabis} hari
							</Typography.Title>
							<p style={{ fontSize: '1' }}>
								*)Tidak termasuk PPJ & Biaya Admin Bank (1 kWh = Rp. 1,444.7)
							</p>
						</Card>
					</Row>
				</Col>
				<Col lg={12} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24 }} md={{ order: 2 }}>
					<Card bordered={false} style={{ minWidth: '100%' }}>
						<img src={datagambar} alt="" style={{ maxWidth: '100%', maxHeight: '100%', marginTop: 0, marginBottom: 0 }} />
						<p align="center" style={{ fontSize: '1', marginBottom: 0 }}>
							Hari ke-1-7 : Senin-Minggu
						</p>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default Prediksi

