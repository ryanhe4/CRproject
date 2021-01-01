import {Divider, List} from 'antd';
import {useSelector} from "react-redux";
import {useCallback, memo} from "react";

const UrlList = memo(() => {
    const {mainUrls: data} = useSelector((state) => state.url);
    //TODO onclick => email laod 요청(해당하는 이메일로, 근데 페이지가 이메일 페이지에
   //  해당되야하는데 나중에 생각)
    const onClickURL = useCallback(() => () => {
        alert("url is clicked!!");
    }, []);

    return (
        <>
            <Divider orientation="left">등록된 URL</Divider>
            <List
                style={{marginTop: '10px'}}
                bordered
                size="small"
                dataSource={data}
                renderItem={(item) => <List.Item style={{borderColor: '#ccc'}}>
                    <div onClick={onClickURL()}>{item.url}</div>
                </List.Item>}
            />
        </>
    );
})

export default UrlList;
