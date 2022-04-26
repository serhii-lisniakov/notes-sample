import React from 'react';
import './styles.scss';

type Props = {
    children?: React.ReactNode;
}

export const Header: React.FC<Props> = ({children}) => {
    return (
        <header className='header'>
            <nav>
                {children}
            </nav>
        </header>
    )
}
