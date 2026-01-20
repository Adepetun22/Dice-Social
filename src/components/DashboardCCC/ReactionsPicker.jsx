import PropTypes from 'prop-types';

const ReactionsPicker = ({ onReactionSelect, positionClass = "bottom-8 left-0", marginLeft = "0px" }) => {
  // Common reaction emojis for quick reactions
  const reactions = [
    { emoji: '👍', label: 'thumbs up' },
    { emoji: '👎', label: 'thumbs down' },
    { emoji: '❤️', label: 'heart' },
    { emoji: '😂', label: 'laugh' },
    { emoji: '😮', label: 'wow' },
    { emoji: '😢', label: 'sad' },
    { emoji: '😡', label: 'angry' },
    { emoji: '🎉', label: 'party' },
    { emoji: '🔥', label: 'fire' },
    { emoji: '💯', label: 'hundred' },
  ];

  return (
    <div 
      className={`absolute ${positionClass} z-50`}
      style={{ marginLeft: marginLeft }}
    >
      <div className="bg-white rounded-full shadow-lg overflow-hidden flex items-center gap-1 px-3 py-2">
        {reactions.map((reaction) => (
          <button
            key={reaction.label}
            onClick={() => onReactionSelect(reaction.emoji)}
            className="text-2xl hover:scale-150 hover:z-10 transform transition-transform duration-150 cursor-pointer p-1 rounded-full hover:bg-gray-100"
            title={reaction.label}
          >
            {reaction.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

ReactionsPicker.propTypes = {
  onReactionSelect: PropTypes.func.isRequired,
  positionClass: PropTypes.string,
  marginLeft: PropTypes.string,
};

export default ReactionsPicker;

