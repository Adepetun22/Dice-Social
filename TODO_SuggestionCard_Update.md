# TODO: Update SuggestionCard.jsx with PostCard.jsx Functionality

## Task: Implement same functions of PostCard.jsx for SuggestionCard.jsx

### Status: ✅ Completed

---

## Changes to implement:

### 1. Add Imports
- [x] Add `FaPaperPlane` from react-icons/fa
- [x] Add `EmojiPicker` from "../EmojiPicker"
- [x] Add `ReactionsPicker` from "../ReactionsPicker"
- [x] Add `Comment` from "./Comment"

### 2. Add State Variables
- [x] `comments` - array to hold comments
- [x] `newComment` - string for comment input
- [x] `showCommentInput` - boolean to toggle comment input
- [x] `showEmojiPicker` - boolean to toggle emoji picker
- [x] `showReactionsPicker` - boolean to toggle reactions picker
- [x] `selectedReaction` - string to track selected emoji
- [x] `reactions` - object with emoji counts

### 3. Add Refs
- [x] `dropdownRef` - for dropdown click-outside detection
- [x] `likeButtonRef` - for reactions picker click-outside detection

### 4. Add useEffect
- [x] Click-outside detection for dropdown and reactions picker

### 5. Add Handler Functions
- [x] `handleCommentChange` - update newComment state
- [x] `handleCommentSubmit` - add comment to comments array
- [x] `handleEmojiClick` - add emoji to comment
- [x] `toggleEmojiPicker` - show/hide emoji picker
- [x] `toggleReactionsPicker` - show/hide reactions picker
- [x] `handleReactionSelect` - handle emoji reaction selection

### 6. Update UI Components
- [x] Keep "Connect" button as is (per user request)
- [x] Replace static reactions display with dynamic count-based display
- [x] Add comment input section with emoji picker
- [x] Replace static comment with dynamic comments mapping

---

## File edited:
- `src/components/DashboardCCC/NewsFeed/SuggestionCard.jsx`

---

## Testing checklist:
- [x] Comment functionality works
- [x] Emoji picker works in comment input
- [x] Reactions picker works
- [x] Reactions count updates correctly
- [x] Click-outside detection works for dropdown and reactions picker
- [x] No console errors

