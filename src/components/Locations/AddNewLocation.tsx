import React from 'react';
import { useRecoilState } from 'recoil';
import { locationStateAtom, LocationState } from './atoms';
import { useMutation } from '@apollo/client';
import { Zombie } from '../../utils/commonInterfaces';
import { CREATE_NEW_LOCATION } from '../../utils/mutations';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import alterRecoilState from '../../utils/alterRecoilState';

const { Option } = Select;

interface FieldData {
    name: string
    zombies: Array<Zombie>
}

interface Props {
    zombiesData: Array<Zombie>
}

function AddNewLocation(props: Props) {
    const [locationState, setLocationState] = useRecoilState<LocationState>(locationStateAtom);
    const [form] = Form.useForm();
    const [createNewLocation] = useMutation(CREATE_NEW_LOCATION);

    console.log('from modal', props);

    function handleCancel() {
        return alterRecoilState(setLocationState, { addNewLocationModalVisibility: false });
    }

    function onSubmit() {
        form.submit();
    }

    function onFormFinish(fieldData: FieldData) {
        /*
        {
  "name": "my location",
  "zombies": [
    "test"
  ]
}
         */
        /*
        {
  "name": "Jalen",
  "zombies": [{ "name": "Zombie", "location": "1", "id": "123" }]
}
         */
    }

    function renderZombieSelection() {
        return (
            <Option value='test'>
                Option
            </Option>
        );
    }

    return (
        <Modal
            title='Add New Location'
            visible={locationState.addNewLocationModalVisibility}
            onCancel={handleCancel}
            footer={[
                <Button
                    key='cancel'
                    onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key='submit'
                    type='primary'
                    onClick={onSubmit}>
                    Submit
                </Button>,
            ]}>

            <Form
                form={form}
                name='add-new-location-form'
                onFinish={onFormFinish}>
                <Form.Item
                    label='Name'
                    name="name"
                    rules={[{ required: true, message: 'Please enter a name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Add Zombies'
                    name='zombies'>
                    <Select
                        mode='tags'
                        placeholder='Select Zombies'>
                        {renderZombieSelection()}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNewLocation;