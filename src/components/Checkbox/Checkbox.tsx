import React, {InputHTMLAttributes} from 'react';
import './styles.scss';

type Props = {
    label: string;
}

export const CheckBox: React.FC<Props & InputHTMLAttributes<any>> = (props) => {
    return (
        <label className="checkbox-container">
            {props.label}
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
                name={props.name}
            />
            <span className="checkbox-label"/>
        </label>
    )
}
