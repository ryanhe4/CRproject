import {Divider, List} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useCallback, memo} from "react";
import {urlSlice} from "../lib/slices/url";

const UrlList = memo(() => {
    const {mainUrls: data, selectId} = useSelector((state) => state.url);
    const dispatch = useDispatch();
    //TODO onclick => email laod 요청(해당하는 이메일로, 근데 페이지가 이메일 페이지에
    //  해당되야하는데 나중에 생각)
    const onClickURL = useCallback((id) => () => {
        if(id === selectId) {
            alert(`${id} is already clicked!!`);
            return;
        }
        dispatch(urlSlice.actions.changeSelect(id));
        // alert(`${id} is clicked!!`);
    }, [selectId]);

    return (
        <>
            <Divider orientation="left">등록된 URL</Divider>
            <List
                style={{marginTop: '10px'}}
                bordered
                size="small"
                dataSource={data}
                renderItem={(item) => (item.id === selectId ?
                    <List.Item style={{border:'2px solid red'}}>
                        <div onClick={onClickURL(item.id)}>{item.url}</div>
                    </List.Item>
                    : <List.Item style={{borderColor: '#ccc'}}>
                        <div onClick={onClickURL(item.id)}>{item.url}</div>
                    </List.Item>)
                }
            />
        </>
    );
})

export default UrlList;
