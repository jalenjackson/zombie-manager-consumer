import React from 'react';
import appleZombie from '../../images/appleZombie.gif';
import Col from 'antd/lib/col';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import { DeleteOutlined } from '@ant-design/icons';
import { Zombie } from '../../utils/commonInterfaces';
import { useDrag } from 'react-dnd'
import { useMutation } from '@apollo/client';
import { DELETE_ZOMBIE } from '../../utils/mutations';

interface Props {
    zombie: Zombie
    editing: boolean
    updateEditing: (value: boolean) => void
    locations: { [key: string]: any }
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function LocationZombie(props: Props) {
    const [showDelete, updateShowDelete] = React.useState(false);
    const [deleteZombieGQL] = useMutation(DELETE_ZOMBIE);

    const [{ opacity }, dragRef] = useDrag({
        item: { type: 'zombie', id: props.zombie.id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    function handleClick() {
        updateShowDelete(true);
    }

    function handleVisibleChange(v: boolean) {
        updateShowDelete(v);
    }

    async function deleteZombie() {
        await deleteZombieGQL({ variables: {
            zombieID: props.zombie.id,
        } });

        updateShowDelete(false);

        props.zombiesData.refetch();
    }

    const content = (
        <Button onClick={deleteZombie} type='primary' danger icon={<DeleteOutlined />}>Delete {props.zombie.name}</Button>
    );

    return (
        <Popover
            content={content}
            trigger='click'
            visible={showDelete}
            onVisibleChange={handleVisibleChange}>
            <Col onClick={handleClick} ref={dragRef} style={{ opacity, marginTop: 10 }}>
                <div className='apple-zombie'>
                    <span>{props.zombie.name}</span>
                    <img alt='apple zombie' className='apple-zombie-image' src={appleZombie} />
                </div>
            </Col>
        </Popover>
    )
}

export default LocationZombie;