//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, Suspense }  from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { HomeOutlined, MonitorOutlined, ReconciliationOutlined, RobotOutlined } from '@ant-design/icons';
import imgIcon from '../assets/polman.png';

const { Header, Content, Footer, Sider } = Layout;
//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style

//  Region Import Constants
const loading = () => <div>Loading...</div>;

const items = [
{ key: '1', label: 'Home', path: '/', icon: <HomeOutlined/> },
{ key: '2', label: 'Data Terkini', path: '/dataterkini', icon: <MonitorOutlined/> },
{ key: '3', label: 'Histori', path: '/histori', icon: <ReconciliationOutlined/> },
{ key: '4', label: 'Prediksi', path: '/prediksi', icon: <RobotOutlined/> },
]
function LayoutComp({children}) {
//  Function declaration (handle, onchange, etc)
const location = useLocation()
const history = useHistory()
const [selectedKey, setSelectedKey] = useState(items.find(o => o.path === location.pathname).key)
const onClickMenu = (item) => {
  const clicked = items.find(_item => _item.key === item.key)
  history.push(clicked.path)
}
//  react Hooks (useEffect, etc)
useEffect(() => {
  console.log();
  setSelectedKey(items.find(o => o.path === location.pathname).key)
}, [location])



return (
  <Layout>
  <Sider
  className="site-layout-background"
  breakpoint="lg"
  collapsedWidth="0"
  onBreakpoint={broken => {
    console.log(broken);
  }}
  onCollapse={(collapsed, type) => {
    console.log(collapsed, type);
  }}
  >
  <h1 style={{ fontSize: '2.5vw', fontWeight: 'bold', wordWrap:'break-word', textAlign: 'center' }}>
  PESILINTAR <br />
  </h1>
  <img src={imgIcon} alt="" style={{maxWidth: '60%', maxHeight: '60%', marginLeft: 40, marginTop: 0}}/>
  <h2 style={{ fontSize: '2vw', fontWeight: 'bold', wordWrap:'break-word', textAlign: 'center' }}>
  POLMAN BANDUNG <br />
  </h2>
  <Menu theme='light' selectedKeys={[selectedKey]} mode='inline' onClick={onClickMenu}>
  {items.map((item) => (
   <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
   ))}
   </Menu>
   </Sider>
   <Layout>
   <Content style={{ margin: "24px 16px 0" }}>
   <div
   style={{ padding: 24, minHeight: 360 }}
   >
   <Suspense fallback={loading()}>{children}</Suspense>
   </div>
   </Content>
   <Footer style={{ textAlign: 'center' }}>PESILINTAR ©2021 Created by <a a target='_blank' rel='noopener noreferrer' href="https:mampir.in/AboutOnnu"> Achmad Ibnu Rosid</a></Footer>
   </Layout>
   </Layout>
   );
}

export default LayoutComp