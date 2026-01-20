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
      <div className="bg-white rounded-full shadow-lg overflow-hidden flex items-center gap-1 px-3 py-2
        max-w-[280px] sm:max-w-[320px] md:max-w-[360px]
        min-w-[200px] sm:min-w-[240px]
        overflow-x-auto hide-scrollbar scroll-smooth">
        {reactions.map((reaction) => (
          <button
            key={reaction.label}
            onClick={() => onReactionSelect(reaction.emoji)}
            className="text-2xl sm:text-3xl hover:scale-125 sm:hover:scale-150 hover:z-10 transform transition-transform duration-150 cursor-pointer p-1.5 sm:p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
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

