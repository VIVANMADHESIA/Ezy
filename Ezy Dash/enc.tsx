import React, { useState } from 'react'
import { Layout, Menu, Button, Row, Col, Card, Modal, Select, message } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  FileOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const { Header, Sider, Content } = Layout
const { Option } = Select

// Dummy data for the charts
const salesData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales 2023',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}

const leadsData = {
  labels: ['New', 'Contacted', 'Qualified', 'Lost'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const revenueData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 3000, 5000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

// Dummy data for leads
const leadsTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Qualified' },
]

const widgetOptions = [
  { value: 'sales', label: 'Sales Chart' },
  { value: 'leads', label: 'Leads Overview' },
  { value: 'revenue', label: 'Revenue' },
]

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState('1')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [widgets, setWidgets] = useState(['sales', 'leads'])

  const showLeadDetails = (lead) => {
    setSelectedLead(lead)
    setIsModalVisible(true)
  }

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key)
  }

  const handleWidgetChange = (value) => {
    setWidgets(value)
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text('EzyMetrics Report', 20, 10)
    doc.autoTable({
      head: [['Name', 'Email', 'Status']],
      body: leadsTableData.map(lead => [lead.name, lead.email, lead.status]),
    })
    doc.save('ezymetrics_report.pdf')
    message.success('PDF report generated successfully!')
  }

  const renderWidget = (widget) => {
    switch (widget) {
      case 'sales':
        return (
          <Card title="Sales Overview">
            <Line data={salesData} />
          </Card>
        )
      case 'leads':
        return (
          <Card title="Leads Overview">
            <Pie data={leadsData} />
          </Card>
        )
      case 'revenue':
        return (
          <Card title="Revenue">
            <Bar data={revenueData} />
          </Card>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return (
          <div>
            <h2>Dashboard</h2>
            <Select
              mode="multiple"
              style={{ width: '100%', marginBottom: 16 }}
              placeholder="Select widgets"
              value={widgets}
              onChange={handleWidgetChange}
            >
              {widgetOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Row gutter={[16, 16]}>
              {widgets.map(widget => (
                <Col key={widget} span={12}>
                  {renderWidget(widget)}
                </Col>
              ))}
            </Row>
          </div>
        )
      case '2':
        return (
          <div>
            <h2>Leads</h2>
            {leadsTableData.map((lead) => (
              <Card key={lead.id} style={{ marginBottom: 16 }}>
                <p>{lead.name}</p>
                <p>{lead.email}</p>
                <p>{lead.status}</p>
                <Button onClick={() => showLeadDetails(lead)}>View Details</Button>
              </Card>
            ))}
          </div>
        )
      case '3':
        return (
          <div>
            <h2>Analytics</h2>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Sales Trend">
                  <Line data={salesData} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Lead Distribution">
                  <Pie data={leadsData} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Quarterly Revenue">
                  <Bar data={revenueData} />
                </Card>
              </Col>
            </Row>
          </div>
        )
      case '4':
        return (
          <div>
            <h2>Reports</h2>
            <Button icon={<DownloadOutlined />} onClick={generatePDF} style={{ marginRight: 16 }}>
              Generate PDF Report
            </Button>
            <CSVLink data={leadsTableData} filename="ezymetrics_report.csv">
              <Button icon={<DownloadOutlined />}>Download CSV Report</Button>
            </CSVLink>
          </div>
        )
      default:
        return <h2>Dashboard</h2>
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div  className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Leads
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Analytics
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            Reports
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
      <Modal
        title="Lead Details"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedLead && (
          <div>
            <p>Name: {selectedLead.name}</p>
            <p>Email: {selectedLead.email}</p>
            <p>Status: {selectedLead.status}</p>
          </div>
        )}
      </Modal>
    </Layout>
  )
}