import React, {ButtonHTMLAttributes} from 'react';
import './styles.scss';

type Props = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const Button: React.FC<Props & ButtonHTMLAttributes<any>> = (props) => {
    return (
        <button
            type='button'
            className={'button ' + props.className || ''}
            style={props.style}
            onClick={props.onClick}
            value={props.value}
        >
            {props.children}
        </button>
    )
}
