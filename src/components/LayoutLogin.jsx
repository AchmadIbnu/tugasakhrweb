//  Region Import External Lib (e.g React, Reactstrap, etc)
import React, { useEffect, useState, useCallback, Suspense } from 'react'
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
const { Header, Content, Footer, Sider } = Layout;
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