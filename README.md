# LangFight - Kannada Learning Game

A **fully local**, interactive educational game to learn Kannada vocabulary through drag-and-drop gameplay.

## ✨ Key Features

- **🎮 100% Local** - No server required, runs entirely in your browser
- **🔒 Encrypted Storage** - Your data is encrypted with a unique key stored in your browser
- **📥 Portable Data** - Export/import your EMDATA.txt file
- **☁️ Optional Cloud Sync** - Manually sync your encrypted data via curl
- **🎵 Audio & Visual Feedback** - Immediate feedback for correct/wrong matches
- **📱 Offline First** - Works without internet connection

## Game Mechanics

### Visual & Audio Feedback
- **✅ Correct matches**: Green particle explosion + happy chime
- **❌ Wrong matches**: Red X indicator + error sound

### Progressive Difficulty
- **Levels 1-2**: Letters (ಅ, ಇ, ಉ, etc.)
- **Levels 3-5**: Words (Water, Food, House, etc.)
- **Levels 6+**: Sentences (How are you?, Thank you, etc.)

### Multiple Vehicle Types
- 🟢 **Green SUVs** (fast) - Letters
- 🟠 **Orange Tanks** (medium) - Words
- 🟣 **Purple Blimps** (slow) - Sentences

## Trial vs Full Version

### Trial Version (Default)
- **6 Free Levels** - Complete access to levels 1-6
- No data persistence
- When you complete level 6, you'll see a download prompt for the full version

### Full Version
- **Unlimited Levels** - Access to all levels including advanced sentences
- **Encrypted Data Storage** - Progress saved in browser with AES-like encryption
- **Auto-Save** - Saves every 30 seconds + on game over
- **Persistent Stats** - Track high scores, games played, and total score
- **Export/Import** - Backup and restore your encrypted data
- **Cloud Sync** - Optional remote backup via curl

## Installation & Running

### Requirements
- Python 3.7+ (for launcher only)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

**Option 1: Main Site (Recommended)**
```bash
cd mainsite
python3 server.py
# Opens http://localhost:9048 with landing page
```

**Option 2: Direct Game**
```bash
python3 LangFight.py
# Opens http://localhost:9048 directly to game
```

**Option 3: Browser Only**
- Double-click `src/index.html`
- Or drag `src/index.html` into browser

### Access Full Version

Add `?full=true` to the URL:
- **Trial**: `file:///path/to/LangFight/src/index.html`
- **Full**: `file:///path/to/LangFight/src/index.html?full=true`

## Data Storage & Encryption

### How It Works (Full Version)

1. **Encryption Key Generation**:
   - On first visit, a secure 64-character hex key is generated
   - Stored in browser's localStorage as `ENCRYPTION_KEY`
   - Used to encrypt all your game data

2. **Encrypted Data Storage**:
   - Game progress saved to browser's localStorage as `EMDATA`
   - Data encrypted using XOR encryption with your unique key
   - Stores: Level, Score, High Score, Games Played, Total Score, Last Played

3. **Auto-Save** (Full Version Only):
   - Game automatically saves every 30 seconds
   - Data saved on game over
   - No manual action required

### Data Management

Click the **💾 Data** button in the game to:

1. **📥 Export EMDATA.txt** - Download your encrypted data as a file
2. **📤 Import EMDATA.txt** - Upload a previously exported file
3. **🔑 Export .env Key** - Download your encryption key as `.env` file
4. **☁️ Copy Sync Command** - Get curl command to upload to your server

### Cloud Sync (Optional)

To backup your data to a remote server:

1. **Export your data**:
   - Click 💾 Data → 📥 Export EMDATA.txt

2. **Upload using the shell script**:
   ```bash
   chmod +x sync_data.sh
   ./sync_data.sh https://your-server.com/api/save
   ```

3. **Or use the curl command**:
   - Click 💾 Data → ☁️ Copy Sync Command
   - Paste and run in terminal

**Note**: Data is uploaded encrypted - your server only sees encrypted text!

## Game Controls

- **Drag and Drop**: Drag Kannada words from sidebar to matching vehicles
- **CPU Mode**: Auto-play feature (Password: `abc123`)
- **Speed Control**: Adjust game speed (minimum 1x)
- **Level Skip**: Jump to any level (limited to level 6 in trial mode)
- **Fullscreen**: Press `*` key to toggle fullscreen

## File Structure

```
LangFight/
├── mainsite/                 # Main website + server ⭐ START HERE
│   ├── server.py            # Main server with landing page
│   ├── index.html           # Landing page
│   └── style.css            # Landing page styles
├── src/                      # Game files
│   ├── index.html           # Game UI
│   ├── game.js              # Core game logic
│   ├── crypto.js            # Browser encryption
│   ├── vocabulary.js        # Kannada vocabulary
│   ├── style.css            # Game styles
│   └── Map.png              # Game path background
├── LangFight.py              # Direct game launcher
├── encryption_manager.py     # Server-side encryption
├── sync_data.sh              # Manual cloud sync script
├── .gitignore               # Protects sensitive files
└── README.md                # This file
```

## Browser Storage

The game uses browser's localStorage to store:

- `ENCRYPTION_KEY` - Your unique 64-char hex encryption key
- `EMDATA` - Your encrypted game data (encrypted with your key)
- `highScore` - Cached high score (unencrypted)
- `gamesPlayed` - Number of games played
- `totalScore` - Cumulative score across all games

**Note**: Data persists per browser. Use Export/Import to move between browsers or backup.

## Security Notes

- **Encryption key** is stored in browser's localStorage - keep it safe!
- **Export your .env key** regularly as backup (💾 Data → 🔑 Export .env Key)
- Data is encrypted before being uploaded to any remote server
- Even if someone gets your EMDATA.txt, they can't read it without your key
- If you clear browser data, you'll lose your encryption key (export it first!)
- Each browser has its own key - export/import to sync between browsers

## Customization

### Change Vocabulary
Edit `src/vocabulary.js` to add/modify:
- Letters
- Words
- Sentences

### Change Colors/Styles
Edit `src/style.css` for visual customization

## Troubleshooting

### Game won't open
- **Just open `src/index.html` in any browser** - no server needed!
- Or use Python launcher: `python3 LangFight.py`
- Make sure you're not trying to open the root folder

### Data not saving
- Check that you're using full version (`?full=true` in URL)
- Open browser console (F12) and check for errors
- Try exporting data manually (💾 Data → 📥 Export)

### Lost my encryption key
- If you exported your .env key file, you can restore it manually
- Open browser console (F12) and run:
  ```javascript
  localStorage.setItem('ENCRYPTION_KEY', 'your-64-char-key-here')
  ```
- Then import your EMDATA.txt file

### Can't import EMDATA.txt
- Make sure the file is valid (exported from the game)
- Check that your encryption key hasn't changed
- If you have a backup .env file, restore the key first (see above)

### Cloud sync not working
- Ensure `sync_data.sh` has execute permissions: `chmod +x sync_data.sh`
- Check `curl` is installed: `curl --version`
- Verify your server accepts POST requests with JSON payload
- Test with: `./sync_data.sh https://your-server.com/api/save`

## Development

### Architecture

This is a **fully client-side application**:
- **No backend server** - everything runs in the browser
- **No database** - uses browser's localStorage
- **No npm/build step** - pure HTML/CSS/JS
- **Optional Python launcher** - just for convenience (opens browser + fullscreen)

### Testing Locally

1. Open `src/index.html` in your browser
2. Open DevTools (F12) → Console
3. Monitor localStorage: `localStorage`
4. View encrypted data: `localStorage.getItem('EMDATA')`
5. View encryption key: `localStorage.getItem('ENCRYPTION_KEY')`

### Making Changes

- **Edit vocabulary**: `src/vocabulary.js`
- **Modify game logic**: `src/game.js`
- **Change encryption**: `src/crypto.js`
- **Update styles**: `src/style.css`
- **No build required** - just refresh the browser!

## License

Educational project - feel free to modify and distribute.

## Credits

Created with Claude Code
Kannada language learning game
