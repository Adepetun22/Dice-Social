import PropTypes from 'prop-types';

const EmojiPicker = ({ onEmojiSelect, positionClass = "bottom-8 left-0", marginLeft = "-220px" }) => {
  // Common emojis for the picker
  const emojis = [
    '😀', '😂', '😍', '🥰', '😎', '🤩', '🥳', '😭', '😡', '🤯', 
    '🥶', '😱', '👍', '👎', '❤️', '🔥', '💯', '✨', '👏', '🙏'
  ];

  return (
    <div className={`absolute ${positionClass} bg-white rounded-lg shadow-lg p-2 w-64`} style={{ marginLeft: marginLeft }}>
      <div className="grid grid-cols-8 gap-1">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="text-xl p-1 hover:bg-gray-100 rounded"
            onClick={() => onEmojiSelect(emoji)}
            style={{ background: 'none', border: 'none' }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

EmojiPicker.propTypes = {
  onEmojiSelect: PropTypes.func.isRequired,
  positionClass: PropTypes.string,
  marginLeft: PropTypes.string
};

export default EmojiPicker;