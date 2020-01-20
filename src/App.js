import React, { useState, Fragment } from "react";
import "./css/App.css";
import { useSelector } from "react-redux";
import "./css/ckeditorimage.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import PostDashboard from "./components/post/PostDashboard";
import TodoDashboard from "./components/todo/TodoDashboard";
import GalleryDashboard from "./components/gallery/GalleryDashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { init as initDatabase } from "./venders/firebase";

import { Layout, Menu, Breadcrumb, Icon, List, Card, Row, Col } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
  // initDatabase();
  let history = useHistory();

  const itemsDashboard = [
    {
      title: "Todo",
      link: "/todos"
    },
    {
      title: "Blog",
      link: "/blogs/list"
    },
    {
      title: "Gallery",
      link: "/gallery"
    }
  ];

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={500} style={{ background: "#ECECEC", padding: "30px" }}>
          <Row gutter={12}>
            <Col span={6}>
              {itemsDashboard.map(item => {
                return (
                  <Link to={item.link} key={item.title}>
                    <Card>
                      <p>{item.title}</p>
                    </Card>
                  </Link>
                );
              })}
            </Col>
          </Row>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Switch>
              <Route path="/todos">
                <TodoDashboard />
              </Route>
              <Route path="/blogs">
                <PostDashboard />
              </Route>
              <Route path="/gallery">
                <GalleryDashboard />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
