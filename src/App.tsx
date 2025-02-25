import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps, TableProps } from "antd";
import { Flex, Layout, Menu, Table, Input, theme } from "antd";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("LG U+", "1", <PieChartOutlined />)];

interface DataType {
  key: string;
  category: string;
  startIdx: number;
  endIdx: number;
  total: number;
}

const columns: TableProps<DataType>["columns"] = [
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   // render: (text) => <a>{text}</a>,
  //   render: () => <Input placeholder="Borderless" variant="borderless" />,
  // },
  // {
  //   title: "Cash Assets",
  //   className: "column-money",
  //   dataIndex: "money",
  //   align: "right",
  // },
  {
    title: "문의 카테고리",
    dataIndex: "category",
  },
  {
    title: "시작 IDX",
    dataIndex: "startIdx",
  },
  {
    title: "끝 IDX",
    dataIndex: "endIdx",
  },
  {
    title: "문의 건 수",
    dataIndex: "total",
  },
];

const data: DataType[] = [
  {
    key: "1",
    category: "Jira 프로젝트 설정 및 권한 부여 문의",
    startIdx: 0,
    endIdx: 0,
    total: 0,
  },
  {
    key: "2",
    category: "Confluence 카테고리/공간 설정 및 권한 부여 문의",
    startIdx: 0,
    endIdx: 0,
    total: 0,
  },
  {
    key: "3",
    category: "사용자 및 그룹 등록 문의",
    startIdx: 0,
    endIdx: 0,
    total: 0,
  },
  {
    key: "4",
    category: "가이드 및 자료 요청 문의",
    startIdx: 0,
    endIdx: 0,
    total: 0,
  },
  { key: "5", category: "기타 사용 문의", startIdx: 0, endIdx: 0, total: 0 },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "12px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table<DataType>
              columns={columns}
              dataSource={data}
              bordered
              title={() => "LG U+ Jira/Confluence 기술지원 운영 통계"}
              footer={() => (
                <Flex justify="space-between">
                  <p>total</p>
                  <p>xxx</p>
                </Flex>
              )}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
