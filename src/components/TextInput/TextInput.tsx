import React, {InputHTMLAttributes} from 'react';
import './styles.scss';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
    label: string;
    infoLabel?: string;
    showCount?: boolean;
    textareaMode?: boolean;
    enableEditor?: boolean;
    editorChange?: (text: string) => void;
}

export const TextInput: React.FC<Props & InputHTMLAttributes<any>> = (props) => {
    const handleMaxLength = (event: any) => {
        if (props.maxLength && ((props.value as string).length >= props.maxLength)) {
            event.preventDefault();
        }
    }

    const handleChange = (text: string) => {
        props.editorChange && props.editorChange(text);
    }

    return (
        <div className='form-field'>
            <div className={'input-container ' + (props.enableEditor ? 'input-container-editor' : '')}>
                <label className='label-main'>{props.label}</label>
                {props.enableEditor
                    ? <ReactQuill
                        style={{height: props.height}}
                        className='editor'
                        value={props.value as string}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline', 'strike'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                            ],
                        }}
                        onKeyDown={handleMaxLength}
                        onChange={handleChange}
                    />
                    : props.textareaMode
                        ? <textarea
                            {...props}
                            rows={10}
                        />
                        : <input
                            type='text'
                            {...props}
                        />}
            </div>
            <div className='labels-info'>
                {props.infoLabel && <label className='label-info'>{props.infoLabel}</label>}
                {props.showCount && typeof props.value === 'string' &&
                <label className='label-info'>{props.value?.length}/{props.maxLength}</label>}
            </div>
        </div>
    )
}
