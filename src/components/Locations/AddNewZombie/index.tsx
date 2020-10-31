import React from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import alterRecoilState from '../../../utils/alterRecoilState';
import { useRecoilState } from 'recoil';
import { LocationState, locationStateAtom } from '../atoms';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_ZOMBIE } from '../../../utils/mutations';
import { Zombie } from '../../../utils/commonInterfaces';

interface Props {
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function AddNewZombie(props: Props) {
    const [locationState, setLocationState] = useRecoilState<LocationState>(locationStateAtom);
    const [inputValue, updateInputValue] = React.useState('');
    const [createNewZombie] = useMutation(CREATE_NEW_ZOMBIE);

    function handleCancel() {
        return alterRecoilState(setLocationState, {
            addNewZombieModalVisibility: false,
            addNewZombieLocationID: null
        });
    }

    async function onSubmit() {
        if (!inputValue || inputValue.trim() === '') return message.error('Please enter valid name');

        await createNewZombie({ variables: {
            name: inputValue,
            locationID: locationState.addNewZombieLocationID
        } });

        props.zombiesData.refetch();
        updateInputValue('');

        return handleCancel();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateInputValue(e.target.value)
    }

    return (
        <Modal
            title='Add New Zombie'
            visible={locationState.addNewZombieModalVisibility}
            onCancel={handleCancel}
            footer={[
                <Button key='Cancel' onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key='submit' type='primary' onClick={onSubmit}>
                    Submit
                </Button>,
            ]}>
            <label style={{ display: 'block', marginBottom: 5 }}>Name</label>
            <Input
                onPressEnter={onSubmit}
                value={inputValue}
                onChange={handleInputChange} type='text' placeholder='Enter name here...' />
        </Modal>
    )
}

export default AddNewZombie;