import { Alert, Checkbox, Input, Col, Row, Card, Button, Switch } from 'antd';
import React from 'react';
import { auth } from '../firebase'
import imgLogin from '../assets/login.png';
import imgHome from '../assets/Monochromatic.png';
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

		};
	}
	login = () => {
		try {
			auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((data) => {
				console.log("Data Login", data);
				localStorage.setItem("hasLogin", true);
				// window.location.reload();
				window.location.href = "http://localhost:3000";
			}).catch((error) => {
				console.log(error);
				window.alert("Email Atau Password Salah");
			})
		} catch (error) {
			console.log(error);
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
						{/* <img src={imgLogin} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
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

					</Col>
					<Col span={12} lg={{ span: 8 }} xs={{ order: 1, span: 24 }} sm={{ order: 1, span: 24 }} md={{ order: 2, span:24 }}>
						<Card bordered={true} style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)', textAlign: 'center' }}>
							<h1 style={{ wordWrap: 'break-word', fontWeight: 'bold' }}>LOGIN</h1>
							<Input prefix={<UserOutlined />} placeholder="xyz@gmail.com" id="email" onChange={this.handleInputChange.bind(this)} />
							<Input prefix={<LockOutlined />} type={(this.state.passwordVisible) ? "text" : "password"} placeholder="Password" id="password" onChange={this.handleInputChange.bind(this)} />
							{/* <>
								<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
								<br />
								<Switch checkedChildren="1" unCheckedChildren="0" />
								<br />
								<Switch
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									defaultChecked
								/>
							</> */}
							<p style={{ marginTop: 5, marginBottom: 0 }}>
								<Button icon={<EyeInvisibleOutlined />} onClick={() => {
									this.setState({
										// icon={<EyeOutlined/>}
										passwordVisible: !this.state.passwordVisible
									})
								}}>Show/Hide</Button>
							</p>
							<p style={{ marginTop: 2, marginBottom: 0 }}><Button icon={<LoginOutlined />} onClick={() => {
								this.login();
							}}>
								Login
							</Button>
							</p>
						</Card>
						<div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
							<img src={imgHome} alt="" style={{ maxWidth: '70%', maxHeight: '70%' }} />
						</div>

					</Col>
				</Row>
			</div >
		);
	}
}