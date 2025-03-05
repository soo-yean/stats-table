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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>(data);

  const handleInputChange = (
    key: string,
    field: "startIdx" | "endIdx",
    value: number
  ) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              [field]: value,
              total: field === "endIdx" ? value - item.startIdx + 1 : 0,
            }
          : item
      )
    );
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "문의 카테고리",
      dataIndex: "category",
    },
    {
      title: "시작 Index",
      dataIndex: "startIdx",
      align: "right",
      render: (_value, record) => (
        <Input
          variant="borderless"
          placeholder="0"
          onChange={(e) =>
            handleInputChange(record.key, "startIdx", Number(e.target.value))
          }
        />
      ),
    },
    {
      title: "끝 Index",
      dataIndex: "endIdx",
      align: "right",
      render: (_value, record) => (
        <Input
          variant="borderless"
          placeholder="0"
          onChange={(e) =>
            handleInputChange(record.key, "endIdx", Number(e.target.value))
          }
        />
      ),
    },
    {
      title: "문의 건 수",
      dataIndex: "total",
      align: "right",
    },
  ];

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
              dataSource={tableData}
              bordered
              title={() => "LG U+ Jira/Confluence 기술지원 운영 통계"}
              footer={() => (
                <Flex justify="space-between">
                  <p>total</p>
                  <p>{tableData.reduce((sum, item) => sum + item.total, 0)}</p>
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
