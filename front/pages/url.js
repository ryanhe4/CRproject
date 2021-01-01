import AppLayout from '../components/AppLayout';
import DataEditList from "../components/DataEditList";
import EntryWindow from "../components/EntryWindow";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadUrl} from "../lib/actions/url";

const UrlPage = () => {
    const {mainUrls: data} = useSelector((state) => state.url);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUrl());
    }, []);

    return (
        <AppLayout>
            <EntryWindow type="url"/>
            <DataEditList type="url" data={data}/>
        </AppLayout>
    )
};


export default UrlPage;
