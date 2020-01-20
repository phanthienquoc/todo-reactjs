import React, { useState, Fragment } from "react";
import { Layout, Menu, Breadcrumb, Icon, List, Card, Row, Col } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import "../../scss/gallery.scss";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const GalleryDashboard = () => {
  const [data, setData] = useState();

  const imgLink =
    "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/82840250_1326972474138996_1858691657629696000_o.jpg?_nc_cat=106&_nc_ohc=hz745TEPOM0AX-Pgkaq&_nc_ht=scontent.fsgn5-6.fna&oh=773f011f81fd809f3578e1e5fd1858fd&oe=5ED59E19";
  const itemsDashboard = [
    {
      id: 0,
      title: "stingdau",
      imgLink: imgLink
    },
    {
      id: 1,
      title: "stingdau",
      imgLink: imgLink
    },
    {
      id: 2,
      title: "stingdau",
      imgLink: imgLink
    },
    {
      id: 3,
      title: "stingdau",
      imgLink: imgLink
    }
  ];

  return (
    <Layout>
      <Row gutter={24}>
        <Col span={6}>
          {itemsDashboard.map(item => {
            return (
              <Link to={item.imgLink} key={item.id}>
                <Card>
                  <div class="img-hover-zoom--brightness--brightness">
                    <img src={item.imgLink} alt={item.title} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export default GalleryDashboard;
