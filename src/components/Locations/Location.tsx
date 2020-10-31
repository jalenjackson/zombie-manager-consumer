import React from 'react';
import LocationZombie from './LocationZombie';
import Col from 'antd/lib/col'
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import alterRecoilState from '../../utils/alterRecoilState';
import { useSetRecoilState } from 'recoil';
import { locationStateAtom, LocationState } from './atoms';
import { Zombie } from '../../utils/commonInterfaces';
import { useDrop } from 'react-dnd'
import { useMutation } from '@apollo/client';
import { MOVE_ZOMBIE_TO_LOCATION } from '../../utils/mutations';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
    keyName: string
    zombies: Array<Zombie>
    locations: {[key: string]: any}
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
    locationID: string
}

function Location(props: Props) {
    const [editing, updateEditing] = React.useState(false);
    const [moveZombieToLocation] = useMutation(MOVE_ZOMBIE_TO_LOCATION);
    const setLocationsState = useSetRecoilState<LocationState>(locationStateAtom);

    const [_, drop] = useDrop({
        accept: 'zombie',
        drop: async (zombie: { id: string, type: string }) => {
            await moveZombieToLocation({
                variables: {
                    locationID: props.locationID,
                    zombieID: zombie.id
                }   });

            props.zombiesData.refetch();
        }
    });

    function renderZombies() {
        if (props.zombies && props.zombies.length > 0) {
            return props.zombies.map((zombie: Zombie) => {
                return <LocationZombie
                    key={zombie.id}
                    zombiesData={props.zombiesData}
                    locations={props.locations}
                    editing={editing}
                    updateEditing={updateEditing}
                    zombie={zombie}/>
            });
        }
    }

    function addNewZombie() {
        return alterRecoilState(setLocationsState, {
            addNewZombieModalVisibility: true,
            addNewZombieLocationID: props.locationID
        });
    }

    return (
        <Col span={6}>
            <div className='location-name'>
                <h2>{props.keyName}</h2>
            </div>
            <div
                ref={drop}
                className='location-container'>
                <Row gutter={16}>
                    {renderZombies()}
                </Row>
                <div className='location-container-footer'>
                    <Button
                        onClick={addNewZombie}
                        icon={<PlusOutlined />}
                        type='primary'>Add New Zombie</Button>
                </div>
            </div>
        </Col>
    )
}

export default Location;