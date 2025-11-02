# WalkerAuth Integration - LangFight

## ✅ Integration Complete!

WalkerAuth OAuth authentication has been successfully integrated into LangFight!

## What Was Added

### 1. `walkerauth_client.py` - Authentication Client
- Handles decryption of user data from WalkerAuth
- Manages user sessions with secure tokens
- Session tokens valid for 7 days

### 2. OAuth Callback Endpoint - `/oauth/callback`
- Receives encrypted user data from WalkerAuth
- Decrypts using shared secret key
- Generates session token
- Returns token to WalkerAuth

### 3. Auth Success Page - `/auth/success`
- Receives session token from WalkerAuth
- Stores user data in localStorage
- Redirects to LangFight game

### 4. Modified Files
- `LangFight.py` - Added OAuth routes and WalkerAuth integration
- `requirements.txt` - Added pycryptodome dependency

## Installation

1. **Install Dependencies**:
   ```bash
   cd LangFighttrue
   pip install -r requirements.txt
   ```

2. **Verify Secret Key Match**:
   The secret key in `LangFight.py` must match `sites.json` in WalkerAuth:
   ```python
   # In LangFight.py (already set):
   WALKERAUTH_SECRET_KEY = "langfight_secret_key_12345"
   ```

   ```json
   // In WalkerAuth/sites.json (already set):
   {
     "LangFight": {
       "redirect_url": "https://langfight.walkerco.co/oauth/callback",
       "secret_key": "langfight_secret_key_12345"
     }
   }
   ```

## Testing Locally

### Option 1: Test Both Apps on Localhost

1. **Update WalkerAuth sites.json**:
   ```json
   {
     "LangFight": {
       "redirect_url": "http://localhost:4000/oauth/callback",
       "secret_key": "langfight_secret_key_12345"
     }
   }
   ```

2. **Check LangFight PORT in var.py**:
   ```python
   SERVER_PORT = 4000  # Or whatever port you're using
   ```

3. **Start WalkerAuth** (Terminal 1):
   ```bash
   cd WalkerAuth
   npm start
   # Runs on http://localhost:3012
   ```

4. **Start LangFight** (Terminal 2):
   ```bash
   cd LangFighttrue
   python3 LangFight.py
   # Runs on http://localhost:4000
   ```

5. **Test the Flow**:
   - Visit `http://localhost:3012?id=LangFight`
   - Click "Sign in with Google"
   - Complete Google OAuth
   - You'll be redirected back to LangFight
   - Check LangFight terminal - you should see:
     ```
     📝 Received OAuth callback from LangFight
     ✓ Authenticated user: Your Name (your@email.com)
     ✓ Session token generated: abc123...
     ```
   - Browser will redirect to LangFight with your authentication!

### Option 2: Test with Production

1. Deploy both apps to production
2. Use production URLs in sites.json
3. Test at `https://walkerauth.walkerco.co?id=LangFight`

## How It Works

### Authentication Flow

```
1. User visits WalkerAuth
   └─> https://walkerauth.walkerco.co?id=LangFight

2. User selects existing account OR signs in with Google
   └─> WalkerAuth authenticates via Google OAuth

3. WalkerAuth encrypts user data and sends to LangFight
   └─> POST https://langfight.walkerco.co/oauth/callback
   └─> Body: {encrypted: "...", iv: "...", siteId: "LangFight"}

4. LangFight decrypts user data
   └─> user = {postid, email, username, profilePictureUrl}

5. LangFight generates session token
   └─> token = "secure_random_token_123..."

6. LangFight returns success to WalkerAuth
   └─> {success: true, token: "..."}

7. WalkerAuth redirects user to LangFight success page
   └─> https://langfight.walkerco.co/auth/success?token=...

8. LangFight stores token in localStorage and redirects to game
   └─> User is now authenticated!
```

### User Data Stored in localStorage

After authentication, the following is stored in the browser:
```javascript
localStorage.getItem('walkerauth_token')    // Session token
localStorage.getItem('user_email')          // user@example.com
localStorage.getItem('user_name')           // User's Name
localStorage.getItem('user_avatar')         // Profile picture URL
```

## Using Authentication in Your Game

### Check if User is Logged In

```javascript
// In your LangFight frontend JavaScript
const token = localStorage.getItem('walkerauth_token');
const userEmail = localStorage.getItem('user_email');
const userName = localStorage.getItem('user_name');
const userAvatar = localStorage.getItem('user_avatar');

if (token) {
  console.log(`Welcome back, ${userName}!`);
  // User is authenticated
  showUserProfile(userName, userEmail, userAvatar);
} else {
  // User not authenticated, show login button
  showLoginButton();
}
```

### Add Login Button

```html
<!-- Add this to your game HTML -->
<button onclick="loginWithWalkerAuth()">Sign In</button>

<script>
function loginWithWalkerAuth() {
  window.location.href = 'https://walkerauth.walkerco.co?id=LangFight';
}
</script>
```

### Logout

```javascript
function logout() {
  // Clear localStorage
  localStorage.removeItem('walkerauth_token');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_avatar');

  // Redirect to home
  window.location.href = '/';
}
```

## Security Notes

1. **Secret Key**: The secret key (`langfight_secret_key_12345`) MUST be kept secure and match between both apps
2. **Session Tokens**: Stored in localStorage, valid for 7 days
3. **HTTPS**: Always use HTTPS in production to protect tokens
4. **Token Verification**: The session token is verified server-side by LangFight

## Troubleshooting

### "Error communicating with the application"

**Cause**: LangFight's `/oauth/callback` endpoint not accessible

**Fix**:
1. Make sure LangFight is running
2. Check the URL in sites.json matches LangFight's actual URL
3. Check LangFight terminal for error messages

### "Failed to decrypt user data"

**Cause**: Secret key mismatch

**Fix**:
1. Verify `WALKERAUTH_SECRET_KEY` in LangFight.py matches
2. Verify `secret_key` in WalkerAuth sites.json matches
3. Both must be exactly: `"langfight_secret_key_12345"`

### Module not found: pycryptodome

**Fix**:
```bash
pip install pycryptodome
```

### No session token in localStorage

**Cause**: Authentication flow didn't complete

**Fix**:
1. Check browser console for errors
2. Make sure you reached /auth/success page
3. Check that WalkerAuth redirected properly

## Success Indicators

You'll know it's working when:

1. ✅ LangFight terminal shows: "✓ Authenticated user: ..."
2. ✅ Browser shows success page: "✓ Authentication Successful!"
3. ✅ localStorage has walkerauth_token
4. ✅ User is redirected to LangFight game

Happy coding! 🚀
