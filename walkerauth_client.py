#!/usr/bin/env python3
"""
WalkerAuth Client for LangFight
Handles OAuth authentication and decryption of user data from WalkerAuth
"""

import hashlib
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import secrets
import time

class WalkerAuthClient:
    def __init__(self, secret_key):
        """
        Initialize WalkerAuth client

        Args:
            secret_key (str): The secret key from sites.json (must match WalkerAuth)
        """
        self.secret_key = secret_key
        self.sessions = {}  # Store active sessions {token: user_data}

    def decrypt_user_data(self, encrypted_hex, iv_hex):
        """
        Decrypt user data received from WalkerAuth

        Args:
            encrypted_hex (str): Hex-encoded encrypted data
            iv_hex (str): Hex-encoded initialization vector

        Returns:
            dict: Decrypted user data containing postid, email, username, profilePictureUrl
        """
        try:
            # Create key from secret (same as WalkerAuth)
            key = hashlib.sha256(self.secret_key.encode()).digest()

            # Convert hex to bytes
            encrypted = bytes.fromhex(encrypted_hex)
            iv = bytes.fromhex(iv_hex)

            # Decrypt
            cipher = AES.new(key, AES.MODE_CBC, iv)
            decrypted = unpad(cipher.decrypt(encrypted), AES.block_size)

            # Parse JSON
            user_data = json.loads(decrypted.decode('utf-8'))

            return user_data
        except Exception as e:
            print(f"Error decrypting user data: {e}")
            return None

    def generate_session_token(self, user_data):
        """
        Generate a session token for the authenticated user

        Args:
            user_data (dict): User data from WalkerAuth

        Returns:
            str: Session token
        """
        # Generate secure random token
        token = secrets.token_urlsafe(32)

        # Store session with expiration
        self.sessions[token] = {
            'user': user_data,
            'created_at': time.time(),
            'expires_at': time.time() + (7 * 24 * 60 * 60)  # 7 days
        }

        return token

    def verify_session(self, token):
        """
        Verify and get user data from session token

        Args:
            token (str): Session token

        Returns:
            dict: User data if valid, None if invalid/expired
        """
        if token not in self.sessions:
            return None

        session = self.sessions[token]

        # Check expiration
        if time.time() > session['expires_at']:
            del self.sessions[token]
            return None

        return session['user']

    def logout(self, token):
        """
        Logout user by removing session

        Args:
            token (str): Session token to remove
        """
        if token in self.sessions:
            del self.sessions[token]
