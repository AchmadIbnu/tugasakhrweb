//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, Suspense } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { HomeOutlined, MonitorOutlined, ReconciliationOutlined, RobotOutlined } from '@ant-design/icons';
import imgIcon from '../assets/polman.png';
import imgKoneksion from '../assets/koneksion.svg';
import imgKoneksioff from '../assets/koneksioff.svg';
import imgBg from '../assets/logout.png';
import {
  Layout,
  Menu,
  DatePicker,
  Tag,
  TimePicker,
  Spin,
  Button,
  Card,
  Modal,
  Image
} from 'antd';
import moment from 'moment';
import { realtime } from '../firebase'
import {
  FieldTimeOutlined,
  CalendarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const loading = () =>
  <div class="center">
    <Spin size="large" />
  </div>

const items = [
  { key: '1', label: 'Home', path: '/', icon: <HomeOutlined /> },
  { key: '2', label: 'Data Terkini', path: '/dataterkini', icon: <MonitorOutlined /> },
  { key: '3', label: 'Histori', path: '/histori', icon: <ReconciliationOutlined /> },
  { key: '4', label: 'Prediksi', path: '/prediksi', icon: <RobotOutlined /> },
]

function LayoutComp({ children }) {
  const timeFormat = 'HH:mm:ss';
  const dateFormat = 'DD/MM/YYYY';
  const dateFormat2 = 'DD';
  const dateFormat3 = 'MM';
  const [time, setTime] = useState(moment())
  const [dataUpdateJam, setDataUpdate] = useState([])
  const [dataUpdateTanggal, setDataUpdate2] = useState([])
  const [dataUpdateBulan, setDataUpdate3] = useState([])
  const location = useLocation()
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState(items.find(o => o.path === location.pathname).key)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onClickMenu = (item) => {
    const clicked = items.find(_item => _item.key === item.key)
    history.push(clicked.path)
    console.log("loc", location)
    console.log("loc.path", location.pathname)
    console.log("click", clicked.path)
  }

  const loadTime = useCallback(() => {
    setTime(moment())
  }, [setTime])

  const modalUp = () => {
    setIsModalVisible(true)
  }

  const logout = () => {
    localStorage.setItem("hasLogin", false);
    window.location.reload();
  };

  //  react Hooks (useEffect, etc)
  useEffect(() => {
    setSelectedKey(items.find(o => o.path === location.pathname).key)
    realtime.ref('lastupdate').on('value', snapshot => {
      setDataUpdate(snapshot.val())
    })
    realtime.ref('lastupdate2').on('value', snapshot => {
      setDataUpdate2(snapshot.val())
    })
    realtime.ref('lastupdate3').on('value', snapshot => {
      setDataUpdate3(snapshot.val())
    })
    setInterval(() => {
      loadTime()
    }, 1000)
  }, [location, dataUpdateJam])
  let waktuSekarang = moment().format(timeFormat)

  return (
    <>
      <Modal title=""
        visible={isModalVisible}
        bodyStyle={{ backgroundColor: '#FFFF' }}
        // footer={null}
        onOk={() => {
          logout();
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={550}
      >
        <Card hoverable cover={<img alt="" src={imgBg} />} style={{ textAlign: 'center' }} >
          <h1 style={{ fontSize: '2vw', wordWrap: 'break-word', fontWeight: 'bold' }}>
            Apakah anda yakin untuk keluar?
          </h1>
        </Card>
      </Modal>
      <Layout>
        <Sider
          className="site-layout-background"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <h1 style={{ fontSize: '2.5vw', fontWeight: 'bold', wordWrap: 'break-word', textAlign: 'center' }}>
            PESILINTAR <br />
          </h1>
          <img src={imgIcon} alt="" style={{ maxWidth: '60%', maxHeight: '60%', marginLeft: 40, marginTop: 0 }} />
          <h2 style={{ fontSize: '2vw', fontWeight: 'bold', wordWrap: 'break-word', textAlign: 'center' }}>
            POLMAN BANDUNG <br />
          </h2>
          <Menu theme='light' selectedKeys={[selectedKey]} mode='inline' onClick={onClickMenu}>
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
            ))}
          </Menu>
          <Card style={{ marginTop: 0, padding: 0, textAlign: 'center' }} >
            {dataUpdateJam > waktuSekarang && dataUpdateTanggal == moment().format(dateFormat2) && dataUpdateBulan == moment().format(dateFormat3) ?
              <img src={imgKoneksion} style={{ maxWidth: '60%', maxHeight: '60%', marginTop: 0 }} alt='gambar koneksi on' /> :
              <img src={imgKoneksioff} style={{ maxWidth: '60%', maxHeight: '60%', marginTop: 0 }} alt='gambar koneksi off' />}
            <Tag color="#55acee" icon={<CalendarOutlined />} style={{ fontColor: 'ffff', fontSize: 17, marginTop: 5 }}>{moment().format(dateFormat)}</Tag>
            <Tag color="#55acee" icon={<FieldTimeOutlined />} style={{ fontSize: 17, marginTop: 5 }}>{time.format(timeFormat)}</Tag>
            <Button style={{ fontSize: 14, marginTop: 7 }} icon={<LogoutOutlined />} align="middle" type="primary" shape="round" size="middle" danger onClick={() => {
              modalUp();
            }}>Logout
            </Button>
          </Card>

        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Suspense fallback={loading()}>{children}</Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>PESILINTAR ©2021 Created by <a a target='_blank' rel='noopener noreferrer' href="https://mampir.in/AboutOnnu"> Achmad Ibnu Rosid</a></Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutComp