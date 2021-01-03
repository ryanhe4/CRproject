import AppLayout from '../components/AppLayout';
import DataEditList from "../components/DataEditList";
import EntryWindow from "../components/EntryWindow";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Router from "next/router";

const UrlPage = () => {
    const dispatch = useDispatch();
    const {mainUrls: data} = useSelector((state) => state.url);

    const {selectId} = useSelector((state) => state.url);

    useEffect(() => {
        if (!(selectId)) {
            Router.push('/');
        }
    }, [selectId]);

    return (
        <AppLayout>
            <EntryWindow type="url"/>
            <DataEditList type="url" data={data}/>
        </AppLayout>
    )
};


export default UrlPage;
