import {Divider, List} from "antd";
import {useSelector} from "react-redux";

const InfoList = () => {
    const {mainLogs: data} = useSelector((state) => state.url);

    return (
        <>
            <Divider>최근 알림 목록</Divider>
            <List
                itemLayout="horizontal"
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{borderColor: '#ccc'}}>
                        <List.Item.Meta title={item.title}>
                        </List.Item.Meta>
                        {<div>{item.date.toString()}</div>}
                    </List.Item>
                )}
            >
            </List>
        </>
    )
};

export default InfoList;
