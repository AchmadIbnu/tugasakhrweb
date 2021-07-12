//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback } from 'react';
import { Col, Row } from 'antd';
import imgHome from '../assets/Monochromatic.png';

function Home() {
return (
	<>
	<Row>
	<Col span={12}>
	<p style={{ fontSize: '4vw', fontWeight: 'bold', wordWrap:'break-word' }}>
	Tugas Akhir <br />
	</p>
	<p style={{ fontSize: '2vw', wordWrap:'break-word' }}>
	Achmad Ibnu Rosid | 217441001<br />
	D4 - Teknologi Rekayasa Otomasi 2021 <br />
	"SISTEM PEMANTAUAN & PREDIKSI PENGGUNAAN LISTRIK RUMAH TANGGA DENGAN
	<span style={{fontStyle: 'italic'}}> MACHINE LEARNING"</span>
	</p>
	<p style={{ fontSize: '1.5vw', wordWrap:'break-word',textAlign: 'center' }}>
	-PESILINTAR (Pemantauan & Prediksi Listrik Pintar)- <br />
	</p>
	</Col>
	<Col span={12}>
	<img src={imgHome} alt="" style={{maxWidth: '100%', maxHeight: '100%'}}/>
	</Col>
	</Row>
	</>
	);
}

export default Home