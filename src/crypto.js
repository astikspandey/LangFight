// Browser-based encryption module
const CryptoManager = {
    key: null,

    // Generate a secure random encryption key
    generateKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    },

    // Load or create encryption key
    loadOrCreateKey() {
        let key = localStorage.getItem('ENCRYPTION_KEY');

        if (!key) {
            key = this.generateKey();
            localStorage.setItem('ENCRYPTION_KEY', key);
            console.log('Generated new encryption key');
        } else {
            console.log('Loaded existing encryption key');
        }

        this.key = key;
        return key;
    },

    // Get current key
    getKey() {
        if (!this.key) {
            this.loadOrCreateKey();
        }
        return this.key;
    },

    // XOR encrypt text
    xorEncrypt(text, key) {
        const result = [];
        const keyLen = key.length;

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const keyChar = key.charCodeAt(i % keyLen);
            const encrypted = charCode ^ keyChar;
            result.push(encrypted);
        }

        // Convert to hex for file-safe format
        return result.map(code => code.toString(16).padStart(4, '0')).join('');
    },

    // XOR decrypt text
    xorDecrypt(hexText, key) {
        try {
            // Convert from hex back to character codes
            const codes = [];
            for (let i = 0; i < hexText.length; i += 4) {
                codes.push(parseInt(hexText.substr(i, 4), 16));
            }

            const result = [];
            const keyLen = key.length;

            for (let i = 0; i < codes.length; i++) {
                const keyChar = key.charCodeAt(i % keyLen);
                const decrypted = codes[i] ^ keyChar;
                result.push(String.fromCharCode(decrypted));
            }

            return result.join('');
        } catch (e) {
            console.error('Decryption failed:', e);
            return '';
        }
    },

    // Save encrypted data
    saveEncryptedData(data) {
        const jsonData = JSON.stringify(data);
        const encrypted = this.xorEncrypt(jsonData, this.getKey());

        // Save to localStorage
        localStorage.setItem('EMDATA', encrypted);

        console.log('Encrypted data saved to localStorage');
        return encrypted;
    },

    // Load encrypted data
    loadEncryptedData() {
        const encrypted = localStorage.getItem('EMDATA');

        if (!encrypted) {
            return null;
        }

        const decrypted = this.xorDecrypt(encrypted, this.getKey());

        try {
            return JSON.parse(decrypted);
        } catch (e) {
            console.error('Failed to parse decrypted data:', e);
            return null;
        }
    },

    // Export encrypted data as downloadable file
    exportToFile() {
        const encrypted = localStorage.getItem('EMDATA');

        if (!encrypted) {
            alert('No data to export!');
            return;
        }

        // Create blob and download
        const blob = new Blob([encrypted], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'EMDATA.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Exported EMDATA.txt');
    },

    // Import encrypted data from file
    importFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const encrypted = e.target.result;
                localStorage.setItem('EMDATA', encrypted);
                console.log('Imported EMDATA.txt');
                resolve(this.loadEncryptedData());
            };

            reader.onerror = (e) => {
                reject(e);
            };

            reader.readAsText(file);
        });
    },

    // Export key to .env format
    exportKey() {
        const key = this.getKey();
        const envContent = `KEY=${key}\n`;

        const blob = new Blob([envContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '.env';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Exported .env file with encryption key');
    },

    // Get upload command for manual curl sync
    getUploadCommand(uploadUrl = 'https://example.com/api/save') {
        const encrypted = localStorage.getItem('EMDATA');

        if (!encrypted) {
            return 'No data to upload';
        }

        // Escape data for shell
        const payload = JSON.stringify({ data: encrypted }).replace(/"/g, '\\"');

        return `curl -X POST '${uploadUrl}' \\
  -H 'Content-Type: application/json' \\
  -d "${payload}"`;
    },

    // Copy upload command to clipboard
    copyUploadCommand(uploadUrl) {
        const command = this.getUploadCommand(uploadUrl);

        navigator.clipboard.writeText(command).then(() => {
            alert('Upload command copied to clipboard!\n\nPaste in terminal to sync your data.');
        }).catch(() => {
            // Fallback: show in alert
            alert('Upload command:\n\n' + command);
        });
    }
};

// Initialize encryption on load
CryptoManager.loadOrCreateKey();
