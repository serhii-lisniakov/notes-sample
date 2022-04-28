import React, {ChangeEvent, useState} from "react"
import {Title} from "../../components/Title/Title";
import {Header} from "../../components/Header/Header";
import {ReactComponent as ArrowBack} from '../../assets/svg/left-arrow.svg';
import {Button} from "../../components/Button/Button";
import './styles.scss';
import {TextInput} from "../../components/TextInput/TextInput";
import {SelectBox} from "../../components/SelectBox/SelectBox";
import {CLIENT_DROPDOWN, NYCKELORD_DROPDOWN} from "../../data";
import {CheckBox} from "../../components/Checkbox/Checkbox";

type Note = {
    title: string;
    details: string;
    unit: 'verkstaden' | 'boendet' | null;
    client: string;
    keyword: string;
    backdate: boolean;
}

const initialState: Note = {
    title: '',
    details: '',
    unit: null,
    client: '',
    keyword: '',
    backdate: false,
}

export const NotePage: React.FC = () => {
    const [note, setNote] = useState<Note>(initialState);

    const buttonHandler = (e: any) => {
        setNote(prev => ({
            ...prev,
            unit: e.target.value
        }))
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNote(prevState => ({
            ...prevState,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        }))
    };

    const editorHandler = (text: string) => {
        setNote(prevState => ({
            ...prevState,
            details: text,
        }))
    };

    const reset = () => {
        setNote(initialState);
    }

    return (
        <>
            <Header>
                <Button>
                    <ArrowBack className='arrow-back'/>
                </Button>
                <div>
                    <Button onClick={reset}>RENSA</Button>
                    <Button>SPARA</Button>
                </div>
            </Header>
            <div className='container'>
                <Title
                    title='Skriv social dokumentation'
                />

                <form className='form-body'>
                    <TextInput
                        maxLength={200}
                        label='Sammanfatta handelsen'
                        value={note.title}
                        onChange={changeHandler}
                        name='title'
                    />
                    <TextInput
                        maxLength={1500}
                        label='Detaljer'
                        showCount={true}
                        infoLabel='Journal: Social dokumentation'
                        height={300}
                        value={note.details}
                        enableEditor={true}
                        name='details'
                        editorChange={editorHandler}
                    />
                    <div className='form-field'>
                        <div className='input-container input-container_disable-focus'>
                            <label className='label-main'>Enhet</label>
                            <div className='form-buttons-container'>
                                <Button
                                    onClick={buttonHandler}
                                    value='verkstaden'
                                    className={'form-button ' + (note.unit === 'verkstaden' ? 'active' : '')}
                                >VERSTANDEN
                                </Button>
                                <Button
                                    onClick={buttonHandler}
                                    value='boendet'
                                    className={'form-button ' + (note.unit === 'boendet' ? 'active' : '')}
                                >BOENDET
                                </Button>
                            </div>
                        </div>
                    </div>
                    <SelectBox
                        label='Klient'
                        values={CLIENT_DROPDOWN}
                        infoLabel='Valji forst enhet'
                        value={note.client}
                        onChange={changeHandler}
                        name='client'
                    />
                    <SelectBox
                        label='Nyckelord'
                        values={NYCKELORD_DROPDOWN}
                        value={note.keyword}
                        onChange={changeHandler}
                        name='keyword'
                    />
                    <div className='form-field'>
                        <CheckBox
                            label='Baktadera'
                            checked={note.backdate}
                            name='backdate'
                            onChange={changeHandler}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
