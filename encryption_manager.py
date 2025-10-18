#!/usr/bin/env python3
import os
import secrets
import json
from pathlib import Path

class EncryptionManager:
    def __init__(self, env_path=".env", data_path="EMDATA.txt"):
        self.env_path = env_path
        self.data_path = data_path
        self.key = None

    def generate_key(self):
        """Generate a secure random encryption key"""
        return secrets.token_hex(32)  # 64 character hex string

    def load_or_create_key(self):
        """Load existing key from .env or create a new one"""
        if os.path.exists(self.env_path):
            # Load existing key
            with open(self.env_path, 'r') as f:
                for line in f:
                    if line.startswith('KEY='):
                        self.key = line.strip().split('=', 1)[1]
                        print(f"Loaded encryption key from {self.env_path}")
                        return self.key

        # Generate new key if not found
        self.key = self.generate_key()
        self.save_key()
        print(f"Generated new encryption key and saved to {self.env_path}")
        return self.key

    def save_key(self):
        """Save the key to .env file"""
        # Read existing .env content
        env_content = []
        if os.path.exists(self.env_path):
            with open(self.env_path, 'r') as f:
                env_content = [line for line in f if not line.startswith('KEY=')]

        # Add new key
        env_content.append(f'KEY={self.key}\n')

        # Write back to .env
        with open(self.env_path, 'w') as f:
            f.writelines(env_content)

    def get_key(self):
        """Get the current encryption key"""
        if not self.key:
            self.load_or_create_key()
        return self.key

    def save_encrypted_data(self, data_dict):
        """Save encrypted data to EMDATA.txt"""
        # Convert dict to JSON string
        json_data = json.dumps(data_dict)

        # Simple XOR encryption with the key
        encrypted = self.xor_encrypt(json_data, self.key)

        # Save to file
        with open(self.data_path, 'w') as f:
            f.write(encrypted)

        print(f"Saved encrypted data to {self.data_path}")
        return encrypted

    def load_encrypted_data(self):
        """Load and decrypt data from EMDATA.txt"""
        if not os.path.exists(self.data_path):
            return {}

        with open(self.data_path, 'r') as f:
            encrypted = f.read()

        # Decrypt using XOR
        decrypted = self.xor_decrypt(encrypted, self.key)

        try:
            data = json.loads(decrypted)
            return data
        except json.JSONDecodeError:
            print("Failed to decode encrypted data")
            return {}

    def xor_encrypt(self, text, key):
        """Simple XOR encryption"""
        result = []
        key_len = len(key)
        for i, char in enumerate(text):
            key_char = key[i % key_len]
            encrypted_char = chr(ord(char) ^ ord(key_char))
            result.append(encrypted_char)

        # Convert to hex to make it file-safe
        hex_result = ''.join([format(ord(c), '04x') for c in result])
        return hex_result

    def xor_decrypt(self, hex_text, key):
        """Simple XOR decryption"""
        # Convert from hex back to characters
        try:
            chars = [chr(int(hex_text[i:i+4], 16)) for i in range(0, len(hex_text), 4)]
            encrypted_text = ''.join(chars)
        except (ValueError, IndexError):
            return ""

        result = []
        key_len = len(key)
        for i, char in enumerate(encrypted_text):
            key_char = key[i % key_len]
            decrypted_char = chr(ord(char) ^ ord(key_char))
            result.append(decrypted_char)

        return ''.join(result)

if __name__ == "__main__":
    # Test the encryption manager
    manager = EncryptionManager()
    manager.load_or_create_key()

    # Test data
    test_data = {
        "level": 5,
        "score": 1500,
        "highScore": 2000,
        "stats": {
            "gamesPlayed": 10,
            "accuracy": 0.85
        }
    }

    print("\nTest data:", test_data)
    manager.save_encrypted_data(test_data)

    loaded_data = manager.load_encrypted_data()
    print("Loaded data:", loaded_data)

    if test_data == loaded_data:
        print("\n✓ Encryption/Decryption working correctly!")
    else:
        print("\n✗ Encryption/Decryption failed!")
