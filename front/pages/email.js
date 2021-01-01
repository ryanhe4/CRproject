import AppLayout from '../components/AppLayout';
import DataEditList from "../components/DataEditList";
import EntryWindow from "../components/EntryWindow";
import {useDispatch, useSelector} from "react-redux";
import {loadEmail} from "../lib/actions/email";
import {useEffect} from "react";
import {loadUrl} from "../lib/actions/url";

const EmailPage = () => {
    const dispatch = useDispatch();
    const {emails} = useSelector((state) => state.email);

    useEffect(()=> {
        dispatch(loadUrl());
        dispatch(loadEmail());
    },[]);

    return (
        <AppLayout>
            <EntryWindow type="email"/>
            <DataEditList type="email" data={emails}/>
        </AppLayout>
    )
};

// export const getServerSideProps = wrapper.getServerSideProps(
//     (context) => {
//     context.dispatch(setEmail());
// })


export default EmailPage;
