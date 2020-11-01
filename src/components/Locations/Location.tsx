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
import { MOVE_ZOMBIE_TO_LOCATION, DELETE_LOCATION } from '../../utils/mutations';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const [deleteLocationGQL] = useMutation(DELETE_LOCATION);
    const setLocationsState = useSetRecoilState<LocationState>(locationStateAtom);
    const [isHovering, updateIsHovering] = React.useState(false);

    const [_, drop] = useDrop({
        accept: 'zombie',
        drop: async (zombie: { id: string, type: string }) => {
            await moveZombieToLocation({
                variables: {
                    locationID: props.locationID,
                    zombieID: zombie.id
                }   });

            props.zombiesData.refetch();
        },
        collect: (monitor) => {
            if (monitor.isOver()) {
                updateIsHovering(true);
            } else {
                updateIsHovering(false);
            }
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

    async function deleteLocation() {
        await deleteLocationGQL({
            variables: {
                locationID: props.locationID
        }   });

        props.zombiesData.refetch();
    }

    return (
        <Col xs={24} sm={24} md={12} lg={6} xl={6} className='location-col' style={isHovering ? { transform: 'scale(1.05)' } : {}}>
            <div className='location-name'>
                <h2>{props.keyName} {props.locationID !== '0' && <DeleteOutlined onClick={deleteLocation} />}</h2>
            </div>
            <div
                ref={drop}
                className='location-container'>
                {props.zombies ? <span>{props.zombies.length} Zombies</span> : <span>No Zombies In This Location Yet</span>}
                <Row style={{ paddingBottom: 70 }} gutter={16}>
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