import React from 'react';
import { useRecoilState } from 'recoil';
import { locationStateAtom, LocationState } from '../atoms';
import { useMutation } from '@apollo/client';
import { Zombie } from '../../../utils/commonInterfaces';
import { CREATE_NEW_LOCATION } from '../../../utils/mutations';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import alterRecoilState from '../../../utils/alterRecoilState';
import get from 'lodash/get';
import ZombieSelection from './ZombieSelection';

interface FieldData {
    name: string
    zombies: Array<Zombie>
}

interface Props {
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function AddNewLocation(props: Props) {
    const [locationState, setLocationState] = useRecoilState<LocationState>(locationStateAtom);
    const [form] = Form.useForm();
    const [createNewLocation] = useMutation(CREATE_NEW_LOCATION);

    if (!locationState.addNewLocationModalVisibility) return null;

    function handleCancel() {
        form.resetFields();

        return alterRecoilState(setLocationState, {
            addNewLocationModalVisibility: false,
            zombiesSelected: []
        });
    }

    function onSubmit() {
        form.submit();
    }

    async function onFormFinish(fieldData: FieldData) {
        await createNewLocation({ variables: {
            name: fieldData.name,
            zombies: locationState.zombiesSelected
        } });

        handleCancel();

        return props.zombiesData.refetch();
    }

    return (
        <div>
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
            </Form>
            <ZombieSelection zombiesData={get(props, 'zombiesData.data.zombies.response', null)} />
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
            </Button>
        </div>
    )
}

export default AddNewLocation;