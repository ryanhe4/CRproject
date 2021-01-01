import {Button, Divider, List,} from "antd";
import EditModal from "./EditModal";
import {useState, useCallback} from "react";
import {useDispatch} from "react-redux";
import {removeEmail} from "../lib/actions/email";
import {removeUrl} from "../lib/actions/url";

const DataEditList = ({data, type}) => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const onEditClick = useCallback(() => {
        setVisible(true);
    }, [setVisible]);

    const onRemoveClick = useCallback((item) => () => {
        if (item.email) {
            //TODO remove email action dispatch
            dispatch(removeEmail(item.id));
        } else {
            //TODO remove url action dispatch
            dispatch(removeUrl(item.id));
        }
    }, []);

    return (
        <>
            <Divider orientation="left">수정/삭제</Divider>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{borderColor: '#ccc'}}>
                        <List.Item.Meta
                            title={item.email || item.url}
                        />
                        <div><Button onClick={onEditClick}>수정</Button> <Button onClick={onRemoveClick(item)}>삭제</Button>
                        </div>
                    </List.Item>
                )}
            >
            </List>
            <EditModal
                type={type}
                visible={visible}
                onSetVisible={setVisible}/>
        </>
    )
}

export default DataEditList;
