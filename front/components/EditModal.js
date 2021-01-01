import {Input, Modal} from "antd";
import {useInput} from "../lib/hooks/useInput";
import {useCallback} from "react";

const EditModal = ({type,visible, onSetVisible}) => {
    const before = type === 'email' ? "" : "k-apt.go.kr/bid/bidList.do?";
    const placeholder = type === 'email' ? "이메일" : "url";

    const [edit, onChangeEdit, setEdit] = useInput('');
    const handleOk = useCallback(() => {
        onSetVisible(false);
    }, [onSetVisible]);

    return(
        <>
            <Modal
                title="수정"
                visible={visible}
                okText="수정"
                cancelText="취소"
                onOk={handleOk}
                onCancel={handleOk}
            >
                {type === 'email'
                    ? <Input
                        value={edit}
                        onChange={onChangeEdit}
                        addonBefore={before}

                        placeholder={placeholder}/>
                    : <Input
                        type="email"
                        value={edit}
                        onChange={onChangeEdit}
                        addonBefore={before}
                        placeholder={placeholder}
                    />
                }
            </Modal>
        </>
    )
};

export default EditModal;
