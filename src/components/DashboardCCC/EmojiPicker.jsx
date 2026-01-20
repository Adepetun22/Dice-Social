import PropTypes from 'prop-types';
import EmojiPickerReact from 'emoji-picker-react';

const EmojiPicker = ({ onEmojiSelect, positionClass = "bottom-8 left-0", marginLeft = "-220px" }) => {
  return (
    <div className={`absolute ${positionClass} z-50`} style={{ marginLeft: marginLeft }}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <EmojiPickerReact
          onEmojiClick={(emoji) => {
            onEmojiSelect(emoji.emoji);
          }}
          skinTonePickerLocation="permanent"
          height={400}
          width={320}
          previewConfig={{
            showPreview: false,
          }}
          searchPlaceHolder="Search emoji..."
        />
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

