import React, {InputHTMLAttributes, useState} from 'react';
import './styles.scss';
import {Button} from "../Button/Button";
import IconBold from '../../assets/bold.png'
import IconItalic from '../../assets/italic-text.png'
import IconList from '../../assets/list.png'

type Props = {
    label: string;
    infoLabel?: string;
    showCount?: boolean;
    textareaMode?: boolean;
    enableEditor?: boolean;
}

export const TextInput: React.FC<Props & InputHTMLAttributes<any>> = (props) => {
    const [text, setText] = useState(props.value);

    const changeHandler = (event: any) => {
        setText(event.target.value)
    };

    return (
        <div className='form-field'>
            <div className={'input-container ' + (props.enableEditor ? 'input-container-editor' : '')}>
                <label className='label-main'>{props.label}</label>
                {props.enableEditor && <Editor/>}
                {props.textareaMode
                    ? <textarea
                        maxLength={props.maxLength}
                        onChange={changeHandler}
                        rows={10}
                    />
                    : <input
                        type='text'
                        maxLength={props.maxLength}
                        onChange={changeHandler}
                    />}
            </div>
            <div className='labels-info'>
                {props.infoLabel && <label className='label-info'>{props.infoLabel}</label>}
                {props.showCount && typeof text === 'string' &&
                <label className='label-info'>{text?.length}/{props.maxLength}</label>}
            </div>
        </div>
    )
}

const Editor: React.FC = () => {
    return (
        <div className='editor'>
            <Button>
                <img src={IconBold} alt=""/>
            </Button>
            <Button>
                <img src={IconItalic} alt=""/>
            </Button>
            <Button>
                <img src={IconList} alt=""/>
            </Button>
        </div>
    )
}
