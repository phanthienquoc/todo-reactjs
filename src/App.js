import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { } from 'antd';


import './App.css';

import FormTodo from './components/FormTodo';
import EditTodo from './components/EditTodo';

import ListingTodo from '../src/components/listingTodo';
import DetailTodo from './components/detailTodo';

import { Layout, Breadcrumb, Row, Col } from 'antd';
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout style={{ background: '#001529' }}>
      <Header className="header">
        <div className="logo" />
        <Breadcrumb style={{ margin: '16px 0', color: '#fff' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Layout >
        <Sider width={'30%'} style={{ background: '#fff' }}>
          <ListingTodo />
        </Sider>
        <Layout width={'70%'} style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >

            <Row>
              <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                <Sider>
                  <DetailTodo />
                </Sider>
              </Col>
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                <FormTodo />
              </Col>
              <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                <EditTodo />
              </Col>
            </Row>


          </Content>
        </Layout>
      </Layout>
      <div className='view'>

      </div>
    </Layout >

  );
}

export default App;