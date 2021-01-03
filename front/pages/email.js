import AppLayout from '../components/AppLayout';
import DataEditList from "../components/DataEditList";
import EntryWindow from "../components/EntryWindow";
import {useDispatch, useSelector} from "react-redux";
import {loadEmail} from "../lib/actions/email";
import {useEffect} from "react";
import Router from 'next/router';

const EmailPage = () => {
    const dispatch = useDispatch();
    const {emails} = useSelector((state) => state.email);
    const {selectId} = useSelector((state) => state.url);

    useEffect(() => {
        if (!(selectId)) {
            Router.push('/');
        }
    }, [selectId]);

    useEffect(() => {
        dispatch(loadEmail(selectId));
    }, [selectId]);

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
