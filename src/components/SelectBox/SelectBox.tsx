import React, {SelectHTMLAttributes, useEffect, useRef, useState} from 'react';
import './styles.scss';

type DropDownItem = {
    id?: number;
    value: string;
    children?: DropDownItem[];
}

type Props = {
    label: string;
    values: DropDownItem[];
    infoLabel?: string;
    showCount?: boolean;
}

export const SelectBox: React.FC<Props & SelectHTMLAttributes<any>> = (props) => {
    const [value, setValue] = useState(props.value);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value: string) => () => {
        setValue(value);
        setIsOpen(false);
    };

    const toggleNested = (e: any) => {
        const listClassList = e.target.nextElementSibling.classList;
        const className = 'visible';
        listClassList.contains(className) ? listClassList.remove(className) : listClassList.add(className);
    }

    const renderItem = (option: DropDownItem, idx: number) => (
        <li onClick={onOptionClicked(option.value)} key={option.id || idx}>
            {option.value}
        </li>
    )

    return (
        <div className='form-field'>
            <div className='input-container'>
                <label className='label-main'>{props.label}</label>
                <div className='select-box' ref={ref}>
                    <div className='selected' onClick={toggling}>{value}</div>
                    {isOpen && (
                        <div className='list'>
                            <ul>
                                {props.values.map((option, idx) => (
                                    option.children?.length ?
                                        <>
                                            <li onClick={e => toggleNested(e)}>
                                                {option.value}
                                            </li>
                                            <div className='list-nested'>
                                                {option.children.map((child, index) => (
                                                    renderItem(child, index)
                                                ))}
                                            </div>
                                        </>
                                        :
                                        renderItem(option, idx)
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='labels-info'>
                {props.infoLabel && <label className='label-info'>{props.infoLabel}</label>}
            </div>
        </div>
    )
}
