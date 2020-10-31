import React from 'react';
import appleZombie from '../../images/appleZombie.gif';
import Col from 'antd/lib/col';
import { Zombie } from '../../utils/commonInterfaces';
import { useDrag } from 'react-dnd'

interface Props {
    zombie: Zombie
    editing: boolean
    updateEditing: (value: boolean) => void
    locations: { [key: string]: any }
    zombiesData: { data: { zombies: Array<Zombie> }, refetch: () => void }
}

function LocationZombie(props: Props) {
    const [{ opacity }, dragRef] = useDrag({
        item: { type: 'zombie', id: props.zombie.id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <Col ref={dragRef} style={{ opacity }}>
            <div className='apple-zombie'>
                <span>{props.zombie.name}</span>
                <img alt='apple zombie' className='apple-zombie-image' src={appleZombie} />
            </div>
        </Col>
    )
}

export default LocationZombie;