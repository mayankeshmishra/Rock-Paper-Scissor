import React from 'react';

import './PlayerCard.scss';

interface PlayerCardProps {
    name: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({name}) => {
    return (
    <div  className="player-card">
        <h3 className="player-card__name">{name}</h3>
        <button className='player-card__action'>Invite</button>
    </div>
    );
}

export default PlayerCard;