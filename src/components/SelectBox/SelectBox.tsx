import React, {ChangeEvent, InputHTMLAttributes, RefObject, useEffect, useRef, useState} from 'react';
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

export const SelectBox: React.FC<Props & InputHTMLAttributes<any>> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<any>(null);
    const itemsRefs: { [key: string]: RefObject<HTMLLIElement> } = {};
    let inputRef: HTMLInputElement | null;

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const onOptionClicked = (value: string) => {
        inputRef && (inputRef.value = value);
        props.onChange && props.onChange({target: inputRef} as ChangeEvent<HTMLInputElement>)
        setIsOpen(false);
    };

    const toggleNested = (e: any) => {
        for (let key in itemsRefs) {
            itemsRefs[key].current?.classList.remove('opened');
            itemsRefs[key].current?.nextElementSibling?.classList.remove('visible');
        }
        e.target.classList.add('opened');
        e.target.nextElementSibling.classList.add('visible');
    }

    const getOrCreateRef = (value: string) => {
        if (!itemsRefs.hasOwnProperty(value)) {
            itemsRefs[value] = React.createRef();
        }
        return itemsRefs[value];
    }

    const renderItem = ({value}: DropDownItem, key: string) => (
        <li onClick={() => onOptionClicked(value)} value={value} key={key}>{value}</li>
    )

    return (
        <div className='form-field'>
            <div className='input-container'>
                <label className='label-main'>{props.label}</label>
                <div className='select-box' ref={ref}>
                    <input
                        className='selected'
                        value={props.value}
                        ref={(input) => {
                            inputRef = input
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        onChange={props.onChange}
                        readOnly
                        name={props.name}
                    />
                    {isOpen && (
                        <div className='list'>
                            <ul>
                                {props.values.map((option, idx) => (
                                    option.children?.length ?
                                        <React.Fragment key={idx}>
                                            <li
                                                onClick={e => toggleNested(e)}
                                                ref={getOrCreateRef(option.value)}
                                            >
                                                {option.value}
                                            </li>
                                            <div className='list-nested'>
                                                {option.children.map((child, index) => (
                                                    renderItem(child, 'nestedLi' + index)
                                                ))}
                                            </div>
                                        </React.Fragment>
                                        :
                                        renderItem(option, 'li' + idx)
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
