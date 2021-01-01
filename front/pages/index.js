import AppLayout from '../components/AppLayout';
import InfoList from "../components/InfoList";
import {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {loadEmail} from "../lib/actions/email";
import {loadLogs, loadUrl} from "../lib/actions/url";
import {wrapper} from "../store";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(loadEmail());
        dispatch(loadUrl());
        dispatch(loadLogs());
    },[]);

    return (
        <>
            <AppLayout>
                < InfoList />
            </AppLayout>
        </>)
};

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req,res, ...etc})=> {
//     console.log('2. Page.getServerSideProps uses the store to dispatch things');
//     await store.dispatch(setEmail());
// })


export default connect(state=> state)(Home);
