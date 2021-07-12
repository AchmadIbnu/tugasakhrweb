import { Alert, Checkbox, Input, Col, Row, Card, Button, Switch } from 'antd';
import { useHistory } from 'react-router-dom'
import React from 'react';
import { auth } from '../firebase'
import imgLogin from '../assets/login.png';
import img1 from '../assets/pesilintar.png';
import img2 from '../assets/Monochromatic.png';
import {
	LoginOutlined,
	EyeOutlined,
	EyeInvisibleOutlined,
	UserOutlined,
	LockOutlined
} from '@ant-design/icons';

export default class Login extends React.Component {

	constructor() {
		super();
		this.state = {
			// email: '',
			// password:''			
		};
	}


	login = () => {

		try {
			auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((data) => {
				console.log("Data Login", data);
				localStorage.setItem("hasLogin", true);
				window.location.href = "https://pesilintar-ta-217441001.web.app/";
			}).catch((error) => {
				window.alert("Email Atau Password Salah");
			})
		} catch (error) {
			console.log("err", error);
		}

	}
	handleInputChange = (event) => {
		var k = event.target.id;
		this.setState({
			[k]: event.target.value,
		});
	};

	render() {
		return (
			<div>
				<Row justify="space-around" align="middle">
					<Col span={12} xs={24} sm={24} md={24} lg={12}>
						<p style={{ fontSize: '4vw', fontWeight: 'bold', wordWrap: 'break-word' }}>
							Tugas Akhir <br />
						</p>
						<p style={{ fontSize: '2vw', wordWrap: 'break-word' }}>
							Achmad Ibnu Rosid | 217441001<br />
							D4 - Teknologi Rekayasa Otomasi 2021 <br />
							"SISTEM PEMANTAUAN & PREDIKSI PENGGUNAAN LISTRIK RUMAH TANGGA DENGAN
							<span style={{ fontStyle: 'italic' }}> MACHINE LEARNING"</span>
						</p>
						<p style={{ fontSize: '1.5vw', wordWrap: 'break-word', textAlign: 'center' }}>
							-PESILINTAR (Pemantauan & Prediksi Listrik Pintar)- <br />
						</p>
						<div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
							<img src={img1} alt="myimage" align="middle" style={{ maxWidth: '10%', maxHeight: '10%', marginLeft: 170, marginRight: 170 }} />
						</div>
					</Col>
					<Col span={12} lg={{ span: 10 }} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24 }} md={{ order: 2, span: 24 }}>
						<Card bordered={true} style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)', textAlign: 'center' }}>
							<h1 style={{ wordWrap: 'break-word', fontWeight: 'bold' }}>LOGIN</h1>
							<Input prefix={<UserOutlined />} placeholder="xyz@gmail.com" id="email" onChange={this.handleInputChange.bind(this)} />
							<Input prefix={<LockOutlined />}
								suffix={
									(this.state.passwordVisible) ? <Button icon={<EyeInvisibleOutlined />} onClick={() => {
										this.setState({
											passwordVisible: !this.state.passwordVisible
										})
									}}></Button> : <Button icon={<EyeOutlined />} onClick={() => {
										this.setState({

											passwordVisible: !this.state.passwordVisible
										})
									}}></Button>
								}
								type={(this.state.passwordVisible) ? "text" : "password"} placeholder="Password" id="password" onChange={this.handleInputChange.bind(this)} />
							<p style={{ marginTop: 2, marginBottom: 0 }}>
								<Button icon={<LoginOutlined />} onClick={() => {
									this.login();
								}}>
									Login
								</Button>
							</p>
						</Card>
						<div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
							<img src={img2} alt="myimage2" align="middle" style={{ maxWidth: '60%', maxHeight: '60%', marginLeft: 50, marginRight: 50 }} />
						</div>
					</Col>
				</Row>
			</div >
		);
	}
}