import 'antd/dist/antd.css';
import Head from 'next/head';
import {wrapper} from "../store";

const CRfront = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>새글 알림 관리 서비스</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(CRfront);
