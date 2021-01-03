import {Divider, Input} from "antd";
import {useInput} from "../lib/hooks/useInput";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUrl} from "../lib/actions/url";
import {addEmail} from "../lib/actions/email";

const EntryWindow = ({type}) => {
    const dispatch = useDispatch();
    const before = type === 'email' ? "" : "k-apt.go.kr/bid/bidList.do?";
    const placeholder = type === 'email' ? "이메일" : "url";

    const [email, onChangeEmail, setEmail] = useInput('');
    const [url, onChangeUrl, setUrl] = useInput('');

    const {isErrorUrl, selectId} = useSelector((state) => state.url);

    useEffect(() => {
        if (isErrorUrl) {
            alert(isErrorUrl);
        }
    }, [isErrorUrl]);

    const onAddUrl = useCallback(() => {
        dispatch(addUrl(url));
        setUrl('');
    }, [url, setUrl]);

    const onAddEmail = useCallback(() => {
        dispatch(addEmail({email, urlId: selectId}));
        setEmail('');
    }, [email, setEmail, selectId]);
    return (
        <div>
            <Divider orientation="left">추가</Divider>
            {type === 'email'
                ? <Input.Search
                    value={email}
                    onChange={onChangeEmail}
                    enterButton="추가"
                    onSearch={onAddEmail}
                    addonBefore={before}
                    placeholder={placeholder}/>
                : <Input.Search
                    enterButton="추가"
                    addonBefore={before}
                    value={url}
                    onChange={onChangeUrl}
                    placeholder={placeholder}
                    onSearch={onAddUrl}/>
            }
        </div>
    )
}

export default EntryWindow;
