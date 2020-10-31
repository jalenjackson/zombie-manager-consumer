import React from 'react';
import alterRecoilState from '../../utils/alterRecoilState';
import Button from 'antd/lib/button';
import { useRecoilState } from 'recoil';
import { locationStateAtom } from './atoms';
import { PlusOutlined } from '@ant-design/icons';

function NewLocationButton() {
    const [locationState, setLocationState] = useRecoilState(locationStateAtom);

    function onAddNewLocationButtonClick() {
        return alterRecoilState(setLocationState, { addNewLocationModalVisibility: !locationState.addNewLocationModalVisibility });
    }

    return (
        <div className='new-location-button-container'>
            <Button
                icon={<PlusOutlined />}
                className='new-location-button'
                type='primary'
                onClick={onAddNewLocationButtonClick}>Add New Location</Button>
        </div>
    )
}

export default NewLocationButton;