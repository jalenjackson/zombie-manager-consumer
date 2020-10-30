import React from 'react';
import LocationZombie from './LocationZombie';
import { Zombie } from '../../utils/commonInterfaces';

interface Props {
    keyName: string
    zombies: Array<Zombie>
}

function Location(props: Props) {
    const [editing, updateEditing] = React.useState(false);

    function renderZombies() {
        if (props.zombies && props.zombies.length > 0) {
            return props.zombies.map((zombie: Zombie) => {
                return <LocationZombie
                    editing={editing}
                    updateEditing={updateEditing}
                    zombie={zombie}/>
            });
        }
    }

    function handleEdit() {
        updateEditing(!editing);
    }

    return (
        <div>
            <h1>{props.keyName} <button onClick={handleEdit}>Edit</button></h1>
            {renderZombies()}
        </div>
    )
}

export default Location;