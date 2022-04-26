import React, {InputHTMLAttributes, useState} from 'react';
import './styles.scss';

type Props = {
    label: string;
}

export const CheckBox: React.FC<Props & InputHTMLAttributes<any>> = ({label, checked}) => {
    const [value, setValue] = useState(checked);

    const changeHandler = (event: any) => {
        setValue(event.target.checked)
    };

    return (
        <label className="checkbox-container">
            {label}
            <input
                type="checkbox"
                checked={value}
                onChange={changeHandler}
            />
            <span className="checkbox-label"/>
        </label>
    )
}
