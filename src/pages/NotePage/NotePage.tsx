import React, {useState} from "react"
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

    return (
        <>
            <Header>
                <Button>
                    <ArrowBack className='arrow-back'/>
                </Button>
                <div>
                    <Button>RENSA</Button>
                    <Button>SPARA</Button>
                </div>
            </Header>
            <div className='container'>
                <Title title='Skriv social dokumentation'/>

                <form className='form-body'>
                    <TextInput maxLength={200} label='Sammanfatta handelsen' value={note.title}/>
                    <TextInput
                        maxLength={1500}
                        label='Detaljer'
                        showCount={true}
                        infoLabel='Journal: Social dokumentation'
                        textareaMode={true}
                        height={300}
                        value={note.details}
                        enableEditor={true}
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
                    />
                    <SelectBox
                        label='Nyckelord'
                        values={NYCKELORD_DROPDOWN}
                        value={note.keyword}
                    />
                    <div className='form-field'>
                        <CheckBox label='Baktadera' checked={note.backdate}/>
                    </div>
                </form>
            </div>
        </>
    )
}
