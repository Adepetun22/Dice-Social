import PropTypes from 'prop-types';

const Comment = ({ avatar, name, userType, content }) => {
  return (
    <div className="flex gap-3 mt-3">
      <img
        alt="User"
        className="w-9 h-9 rounded-full object-cover"
        src={avatar}
      />
      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{userType}</p>
        <p className="text-gray-700 mt-1 text-sm">{content}</p>
        <div className="flex gap-4 mt-1 text-sm text-gray-500">
          <button className="hover:underline">Like</button>
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Comment;

