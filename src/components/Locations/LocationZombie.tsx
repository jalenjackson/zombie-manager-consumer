import React from 'react';
import { Zombie } from '../../utils/commonInterfaces';
import Select from 'antd/lib/select';

const { Option } = Select;

interface Props {
    zombie: Zombie
    editing: boolean
    updateEditing: (value: boolean) => void
}

function LocationZombie(props: Props) {
    function onSelectChange(e: string) {
        console.log(e)
    }

    function renderEdit() {
        return (
            <div>
                <label>Move Zombie To Another Location</label>
                <Select onChange={onSelectChange}>
                    <Option value='jack'>Jack</Option>
                </Select>
            </div>
        )
    }

    return (
        <div>
            <span>{props.zombie.name}</span>
            {props.editing && renderEdit()}
        </div>
    )
}

export default LocationZombie;