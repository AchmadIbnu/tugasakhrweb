//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, Suspense } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { HomeOutlined, MonitorOutlined, ReconciliationOutlined, RobotOutlined } from '@ant-design/icons';
import imgIcon from '../assets/polman.png';
import imgKoneksion from '../assets/koneksion.svg';
import imgKoneksioff from '../assets/koneksioff.svg';
import {
  Layout,
  Menu,
  DatePicker,
  Tag,
  TimePicker,
  Spin
} from 'antd';
import moment from 'moment';
import { realtime } from '../firebase'
import {
  FieldTimeOutlined,
  CalendarOutlined
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
//  Region Import Utility/Helper Function

//  Region Import Components

//  Region Import Assets

//  Region Import Style

//  Region Import Constants

const loading = () => 
<div class="center">
<Spin size="large" />
</div>

function LayoutLogin({ children }) {


  return (
    <Layout>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{ padding: 24, minHeight: 360 }}
          >
            <Suspense fallback={loading()}>{children}</Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PESILINTAR ©2021 Created by <a a target='_blank' rel='noopener noreferrer' href="https://mampir.in/AboutOnnu"> Achmad Ibnu Rosid</a></Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutLogin