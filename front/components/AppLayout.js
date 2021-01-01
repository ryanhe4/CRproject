import {Layout, Col, Menu, Row} from 'antd';
import Link from 'next/link';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import UrlList from './UrlList';

const {Header, Content, Footer} = Layout;

const AppLayout = ({children}) => {
    // TODO 현재 어느페이지 상태인지 확인
    return (
        <Layout style={{height: '100vh'}} className="layout">
            <Header>
                <Menu mode="horizontal">
                    <Menu.Item key="app" icon={<AppstoreOutlined/>}>
                        <Link href="/"><a>메인</a></Link>
                    </Menu.Item>
                    <Menu.Item key="url" icon={<SettingOutlined/>}>
                        <Link href="/url"><a>url등록</a></Link>
                    </Menu.Item>
                    <Menu.Item key="mail" icon={<MailOutlined/>}>
                        <Link href="/email"><a>이메일등록</a></Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Row gutter={8}>
                    <Col xs={24} md={6}>
                        <UrlList />
                    </Col>
                    <Col xs={24} md={12}>
                        {children}
                    </Col>
                    <Col xs={24} md={6}>
                        <a
                            href="https://www.xploitdev.com" target="_blank"
                            rel="noreferrer noopener"
                        >Made by heechan</a>
                    </Col>
                </Row>
            </Content>
            <Footer style={{textAlign: 'center', position: 'sticky'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
