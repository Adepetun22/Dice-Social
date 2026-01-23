# TODO - Refactor Project Structure with hooks, utils, and context

## Create Folder Structure
- [x] Create `src/utils/` directory
- [x] Create `src/hooks/` directory
- [x] Create `src/context/` directory

## Create Utility Functions
- [x] Create `src/utils/dateUtils.js` - formatTimestamp and date helpers
- [x] Create `src/utils/idUtils.js` - ID generation utilities
- [x] Create `src/utils/index.js` - export all utilities

## Create Custom Hooks
- [x] Create `src/hooks/useClickOutside.js` - refactor click outside detection
- [x] Create `src/hooks/useLocalStorage.js` - persistent storage hook
- [x] Create `src/hooks/useDebounce.js` - debounce and throttle hooks
- [x] Create `src/hooks/index.js` - export all hooks

## Create Context Providers
- [x] Create `src/context/UserContext.jsx` - user authentication state
- [x] Create `src/context/NotificationContext.jsx` - global notifications
- [x] Create `src/context/index.js` - export all contexts

## Refactor Components
- [x] Refactor `src/components/DashboardCCC/NewsFeed/PostCard.jsx`
  - Extract `formatTimestamp` to dateUtils
  - Extract click outside logic to useClickOutside hook
- [x] Refactor `src/components/DashboardCCC/NewsFeed/Comment.jsx`
  - Extract click outside logic to useClickOutside hook

## Next Steps (Optional)
- [ ] Fix ESLint errors in `ChatCenter.jsx` (Date.now issues)
- [ ] Add more context providers as needed (ThemeContext, ChatContext)
- [ ] Create additional utility functions for validation, string manipulation, etc.
- [ ] Wrap App with context providers in `App.jsx`


